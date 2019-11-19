const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.use(express.static(__dirname + "/static"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first_db', {useNewUrlParser: true});
const QuoteSchema = new mongoose.Schema({
    name : {type:String,required:true},
    quote : {type:String,required:true}
})
const Quote = mongoose.model('Quote', QuoteSchema);

 // set up other middleware, such as sessioncopy
const flash = require('express-flash');
app.use(flash());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    Quote.find()
    .then(data => res.render("index", {quotes: data}))
    .catch(err => res.jsoncopy(err));
});
app.post('/quotes', (req, res) => {
    const quote = new Quote(req.body);
    quote.save()
        .then(() => res.redirect('/quotes'))
        .catch(err => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});
app.get('/quotes', (req, res) => {
    console.log(Quote.find());
    Quote.find()
    .then(data => res.render("quotes", {quotes : data}))
    .catch(err => res.jsoncopy(err));
});
app.listen(8000, () => console.log("Listening on port 8000"));


