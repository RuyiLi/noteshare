const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    id: String,
    profilePic: String,
    createdAt: { type: Date, default: Date.now },
    notes: [{ type: Schema.Types.ObjectId, ref: 'note' }]
})

const User = mongoose.model('user', UserSchema); 

module.exports = User;