const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Message', messageSchema);