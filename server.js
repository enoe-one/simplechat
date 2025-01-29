const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname)); // Sert les fichiers HTML/CSS/JS

wss.on('connection', socket => {
    console.log('Un utilisateur s\'est connecté.');

    socket.on('message', message => {
        console.log('Message reçu:', message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => console.log('Un utilisateur s\'est déconnecté.'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur WebSocket en ligne sur http://localhost:${PORT}`));
