const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Import Routes
const authRoutes = require('./routes/auth');
const questRoutes = require('./routes/quests');
const signalRoutes = require('./routes/signals');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/signals', signalRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/solohuman';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Solo Human API 🚀' });
});

// Socket.io for Real-time features
io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);

    socket.on('update-location', (data) => {
        socket.broadcast.emit('location-updated', data);
    });

    socket.on('send-signal', (data) => {
        socket.broadcast.emit('signal-received', data);
    });

    socket.on('disconnect', () => {
        console.log('👋 User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
});
