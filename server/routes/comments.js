const router = require('express').Router();
const Comment = require('../models/Comment');

// Get comments for a room
router.get('/:roomId', async (req, res) => {
  try {
    const comments = await Comment.find({ roomId: req.params.roomId })
      .sort({ lineNumber: 1, createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reply to a comment
router.post('/:id/reply', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: req.body } },
      { new: true }
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;