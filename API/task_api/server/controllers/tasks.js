const mongoose = require('mongoose');
      Task = mongoose.model('Task')
module.exports = {
    retrive_all: function(req, res) {
    	Task.find({})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    retrive_id :function(req, res){
        Task.find({_id: req.params.id})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    create :function(req, res){
        Task.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    update : function(req, res){
        Task.findOneAndUpdate({_id : req.params.id} , req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    delete : function(req, res){
        Task.remove({_id : req.params.id})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
};