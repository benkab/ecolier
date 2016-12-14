var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var schema  = new Schema({
    content : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: false
    },
    created_at : {
        type: Date,
        default : Date.now()
    },
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    likes : [
        {
            type: Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
});

module.exports = mongoose.model('Post', schema);