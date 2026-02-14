const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activity: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 2 * 60 * 60 * 1000) }, // Expires in 2 hours
    status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Signal', signalSchema);
