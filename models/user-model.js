const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    isActivated: {type: Boolean, default: false},
    verificationCode: {type: String},
    codeCreatedAt: {type: Date, default: Date.now}
});

module.exports = model('User', UserSchema);
