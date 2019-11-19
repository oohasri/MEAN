const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');
app.use(flash());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.use(express.static(__dirname + "/static"));
mongoose.connect('mongodb://localhost/first_db', {useNewUrlParser: true});
const animalSchema = new mongoose.Schema({
    name : {type:String,required:true,minlength :2},
    age : {type:Number,required:true},
    color : {type:String, required:true} 
}, {timestamps: true });
const Animal = mongoose.model('Animal', animalSchema);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    Animal.find()
    .then(data => res.render("index", {animals:data}))
    .catch(err => res.jsoncopy(err));
});

app.get('/animal/new',(req, res) => {
    res.render('add');
});
app.post('/addanimal',(req, res) => {
    console.log(req.body);
    const animal = new Animal(req.body);
    animal.save()
    .then(() => res.redirect('/'))
    .catch(err => {
                    console.log("We have an error!", err);
                    // adjust the code below as needed to create a flash message with the tag and content you would like
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.redirect('/animal/new');
                });
});
app.get('/animal/:id',(req, res) => {
    Animal.findOne({_id:req.params.id})
    .then(data => res.render('view', {animal : data}))
    .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                         req.flash('registration', err.errors[key].message);
                    }
                    res.redirect('/');
    });
});
app.get('/animal/edit/:id',(req, res) => {
    console.log(req.params.id);
    Animal.findOne({_id:req.params.id})
    .then(data => res.render('edit', {animal : data}))
    .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                         req.flash('registration', err.errors[key].message);
                    }
                    res.redirect('/');
    });
});
app.post('/editanimal/:id',(req,res) => {
    Animal.update({_id:req.params.id}, req.body)
    .then(data => res.redirect('/'))
    .catch(err => {
        console.log("We have an error!", err);
        for (var key in err.errors) {
             req.flash('registration', err.errors[key].message);
        }
        res.redirect('/');
    });
});
app.get('/deleteanimal/:id',(req, res) => {
    Animal.findOneAndRemove({_id:req.params.id})
    .then(data => res.redirect('/'))
    .catch(err => {
        console.log("We have an error!", err);
        for (var key in err.errors) {
             req.flash('registration', err.errors[key].message);
        }
        res.redirect('/');
    });
});

app.listen(8000, () => console.log("Listening on port 8000"));
