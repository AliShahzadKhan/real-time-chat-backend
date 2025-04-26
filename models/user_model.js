const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    }

});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;