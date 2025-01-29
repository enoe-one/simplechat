const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Sert les fichiers HTML, CSS, JS
app.use(express.static(__dirname));

wss.on('connection', socket => {
    console.log('Un utilisateur s\'est connecté.');

    socket.on('message', message => {
        console.log('Message reçu:', message);
        // Transmet le message à tous les clients connectés
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Envoie une chaîne de caractères
            }
        });
    });

    socket.on('close', () => {
        console.log('Un utilisateur s\'est déconnecté.');
    });
});

// Utilise le port spécifié par l'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebSocket en ligne sur http://localhost:${PORT}`);
});
