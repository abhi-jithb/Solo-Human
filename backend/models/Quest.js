const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    xpReward: { type: Number, required: true },
    category: { type: String, enum: ['Adventure', 'Chill', 'Social', 'Culture'], required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    icon: { type: String }, // Icon name or URL
}, { timestamps: true });

module.exports = mongoose.model('Quest', questSchema);
