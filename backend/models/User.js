const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'default_avatar.png' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    questsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
    currentLocation: {
        lat: { type: Number },
        lng: { type: Number }
    },
    isOnline: { type: Boolean, default: false },
    bio: { type: String, default: 'Exploring life solo!' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
