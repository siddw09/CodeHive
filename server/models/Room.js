const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, default: 'javascript' },
  code: { type: String, default: '// Start writing code here...' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);