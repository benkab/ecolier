var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var schema  = new Schema({
    content : {
        type: String,
        required: true
    },
    created_at : {
        type: Date,
        required: true,
        default : Date.now
    },
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    post : {
        type: Schema.Types.ObjectId,
        ref : 'Post'
    }
});

module.exports = mongoose.model('Comment', schema);