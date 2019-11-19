const mongoose = require('mongoose');
      Task = mongoose.model('Task');
      tasks = require('../controllers/tasks.js');
module.exports = function(app){
    app.get('/', (req, res) => {
        tasks.retrive_all(req, res);
    });
    app.get('/task/:id', (req, res) => {
        tasks.retrive_id(req, res);
    });
    app.post('/task/new', (req, res) => {
        tasks.create(req, res);
    });
    app.put('/task/:id', (req, res) => {
        tasks.update(req, res);
    });
    app.delete('/task/:id', (req, res) => {
        tasks.delete(req, res);
    });
}