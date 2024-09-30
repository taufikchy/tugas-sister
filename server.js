const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

// Middleware untuk mengatur folder statis
app.use(express.static('public'));

// Rute dasar
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Mengatur Socket.IO
io.on('connection', (socket) => {
    console.log('a user connected');

    // Menerima pesan dari klien
    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        // Mengirim pesan kembali ke semua klien
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Memulai server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
