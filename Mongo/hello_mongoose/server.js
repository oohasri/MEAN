const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first_db', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
// create an object to that contains methods for mongoose to interface with MongoDB
const User = mongoose.model('User', UserSchema);

const app = express();
app.use(express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));

app.get("/", (request, response) =>{
    User.find()
    .then(data => response.render("index", {users: data}))
    .catch(err => response.jsoncopy(err));
});
app.post("/users", (request, response) => {
    console.log(request.body);
    const user = new User();
    user.name = request.body.name;
    user.age = request.body.age;
    user.save()
    .then(newUserData => console.log('user created: ', newUserData))
    .catch(err => console.log(err));
    
    response.redirect('/');
});
app.listen(8000, () => console.log("Listening on port 8000"));