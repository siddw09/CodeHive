const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  lineNumber: { type: Number, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);