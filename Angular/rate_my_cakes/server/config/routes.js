const mongoose = require('mongoose');
      Cake = mongoose.model('Cake');
      cakes = require('../controllers/cakes.js');

module.exports = function(app) {
    app.get('/cakes', (req, res) => {
        cakes.retrive_all(req, res);
    });
    app.post('/cake/new', (req, res) => {
        cakes.create(req, res);
    });
    app.post('/comment/:id', (req, res) => {
        cakes.addComment(req, res);
    });
    app.get('/cake/:id', (req, res) => {
        cakes.retrive_id(req, res);
    });
}