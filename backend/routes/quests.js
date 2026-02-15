const express = require('express');
const router = express.Router();
const Quest = require('../models/Quest');
const { protect } = require('../middleware/auth');

// Get all quests
router.get('/', async (req, res) => {
    try {
        const quests = await Quest.find();
        res.json(quests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new quest (Admin or User generated)
router.post('/', protect, async (req, res) => {
    try {
        const newQuest = new Quest(req.body);
        await newQuest.save();
        res.status(201).json(newQuest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
