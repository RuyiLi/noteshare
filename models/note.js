const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: { type: String, ref: 'user' }
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;