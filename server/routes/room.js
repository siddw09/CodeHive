const router = require('express').Router();
const Room = require('../models/Room');

// List recent rooms
router.get('/', async (_req, res) => {
  try {
    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create room
router.post('/', async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update code
router.put('/:id/code', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { code: req.body.code },
      { new: true }
    );
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
