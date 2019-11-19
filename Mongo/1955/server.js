const express = require('express');
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first_db', {useUnifiedTopology: true, useNewUrlParser: true});

const StarSchema= new mongoose.Schema({
    name : {type: String,
            required : [true, "must have a name"],
            minlength:2}    
}, {timestamps: true });

const Stars = mongoose.model('Stars', StarSchema);

app.get('/', (req, res) => {
    Stars.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.get('/new/:name', (req, res) => {
    Stars.create(req.params)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.get('/remove/:name', (req, res) => {
    console.log(req.params.name);
    Stars.find({name : req.params.name})
    .then(data => Stars.findOneAndRemove({name: req.params.name})
                .then(data => res.json(data))
                .catch(err => res.json(err)))
    .catch(err => res.json(err));
});

app.get('/:name', (req, res) => {
    Stars.find({name: req.params.name})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.listen(8000, () => console.log("listening on port 8000"));