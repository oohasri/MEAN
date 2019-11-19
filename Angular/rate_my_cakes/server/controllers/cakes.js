const mongoose = require('mongoose');
      Comment = mongoose.model('Comment');
      Cake = mongoose.model('Cake');

module.exports = {
    retrive_all: function(req, res) {
    	Cake.find({})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    retrive_id :function(req, res){
        Cake.findOne({_id: req.params.id}).populate('comments').exec()
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    create :function(req, res){
        Cake.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    addComment : function(req, res){
        const comment = new Comment(req.body);
        comment.cake = req.params.id;
        comment.save();
        Cake.findOne({_id: req.params.id})      
        .then(data => {
            data.comments.push(comment);
            data.save();
            res.json(data)
        })
        .catch(err => res.json(err));
    },
}