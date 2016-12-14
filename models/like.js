var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var schema  = new Schema({
    liked : {
        type: Boolean,
        required: true
    },
    created_at : {
        type: Date,
        required: true
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

module.exports = mongoose.model('Like', schema);