const express = require('express');
const app = express();
const flash = require('express-flash');
const mongoose = require('mongoose');
const session = require('express-session');
app.use(express.static(__dirname + "/static"));
app.use(flash());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
mongoose.connect('mongodb://localhost/first_db', {useUnifiedTopology: true, useNewUrlParser: true});
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));

const commentSchema = new mongoose.Schema({
    name : {type:String,
        required:[true, "message must have a name"],
        minlength :2},
    comment : {type:String,
        required:[true, "comment must have a message"],
        minlength :2}
}, {timestamps: true });

const messageSchema = new mongoose.Schema({
    name : {type:String,
        required:[true, "message must have a name"],
        minlength :2},
    message : {type:String,
        required:[true, "message must have a message"],
        minlength :2},
    comments : [commentSchema]
}, {timestamps: true });
const Message = mongoose.model('Message', messageSchema);
const Comment = mongoose.model('Comment', commentSchema);

app.get('/', (req, res) => {
    Message.find()
    .then(data => res.render('index', {messages : data}))
    .catch(err => {
                    console.log("We have an error!", err);
                    // adjust the code below as needed to create a flash message with the tag and content you would like
                    for (var key in err.errors) {
                        req.flash('message', err.errors[key].message);
                    }
                    res.redirect('/error');
                });
});

app.post('/post_message', (req, res) => {
    console.log(req.body);
    Message.create(req.body)
    .then(data => res.redirect('/'))
    .catch(err => {
                    console.log("We have an error!", err);
                    // adjust the code below as needed to create a flash message with the tag and content you would like
                    for (var key in err.errors) {
                        req.flash('message', err.errors[key].message);
                    }
                    res.redirect('/error');
                });
});

app.post("/post_comment/:id", (req, res) => {
    console.log(req.body);
    Comment.create(req.body, function(err, data){
        if(err){
             // handle the error from creating a blog
        }
        else {
             Message.findOneAndUpdate({_id: req.params.id}, {$push: {comments: data}}, function(err, data){
                  if(err){
                       // handle the error from trying to update the user
                       console.log("We have an error!", err);
                        // adjust the code below as needed to create a flash message with the tag and content you would like
                        for (var key in err.errors) {
                            req.flash('message', err.errors[key].message);
                        }
                        res.redirect('/error');
                  }
                  else {
                       res.redirect('/');
                  }
             })
         }
   })
});

app.listen(8000, () => console.log("Listening on port 8000"));