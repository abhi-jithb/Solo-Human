const express = require('express');
const router = express.Router();
const Signal = require('../models/Signal');

// Get active signals nearby (Mock nearby for now)
router.get('/', async (req, res) => {
    try {
        // In real app, filter by lat/lng
        const signals = await Signal.find({ status: 'Active' }).populate('userId', 'username avatar');
        res.json(signals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Broadcast a signal
router.post('/', async (req, res) => {
    try {
        const newSignal = new Signal(req.body);
        await newSignal.save();
        res.status(201).json(newSignal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
