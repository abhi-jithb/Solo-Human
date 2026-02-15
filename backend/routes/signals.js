const express = require('express');
const router = express.Router();
const Signal = require('../models/Signal');
const { protect } = require('../middleware/auth');

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
router.post('/', protect, async (req, res) => {
    try {
        const { activity, location } = req.body;
        const newSignal = new Signal({
            userId: req.user._id,
            activity,
            location: {
                type: 'Point',
                coordinates: [location.lng, location.lat] // GeoJSON: [longitude, latitude]
            }
        });
        await newSignal.save();
        res.status(201).json(newSignal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
