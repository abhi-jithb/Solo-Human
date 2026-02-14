const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quest = require('./models/Quest');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/solohuman';

const dummyQuests = [
    {
        title: "The Silent Reader",
        description: "Visit a library or quiet cafe and read for 1 hour.",
        xpReward: 150,
        category: "Culture",
        difficulty: "Easy",
        icon: "BookOpen"
    },
    {
        title: "Neon Night Walk",
        description: "Take a 30-minute walk in a brightly lit downtown area.",
        xpReward: 200,
        category: "Adventure",
        difficulty: "Easy",
        icon: "MapPin"
    },
    {
        title: "Solo Cinema",
        description: "Watch a movie at the theater alone.",
        xpReward: 500,
        category: "Culture",
        difficulty: "Hard",
        icon: "Star"
    },
    {
        title: "Coffee Explorer",
        description: "Try a new coffee shop you've never been to.",
        xpReward: 300,
        category: "Chill",
        difficulty: "Medium",
        icon: "Coffee"
    },
    {
        title: "Table for One",
        description: "Dine at a restaurant solo.",
        xpReward: 800,
        category: "Social",
        difficulty: "Hard",
        icon: "Utensils"
    }
];

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');
        await Quest.deleteMany({}); // Clear existing
        await Quest.insertMany(dummyQuests);
        console.log('🌱 Quests Seeded Successfully');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
