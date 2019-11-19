const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    rating : {
        type: Number,
        required: [true, "Please rate the cake"]
    },
    comment : {
        type: String,
        required: [true, "Comment shouldn't be empty"]
    },
    cake : { type: Schema.Types.ObjectId, ref: 'Cake' }
}, {timestamp: true});
const CakeSchema = new mongoose.Schema({
    baker_name : {
        type: String,
        required: [true, "Enter baker's name"]
    },
    url : {
        type: String,
        required: [true, "URL can't be empty"]
    },
    comments :[{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {timestamp: true});

const Cake = mongoose.model("Cake", CakeSchema);
const Comment = mongoose.model("Comment", CommentSchema);
