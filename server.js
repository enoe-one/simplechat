const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Sert les fichiers statiques (index.html, etc.)
app.use(express.static(__dirname));

// Lorsque quelqu'un se connecte via WebSocket
wss.on('connection', socket => {
    console.log('Un utilisateur s\'est connecté.');

    // Lorsqu'un message est reçu d'un client
    socket.on('message', message => {
        console.log('Message reçu:', message);  // Affiche le message dans la console
        // Transmet le message à tous les autres clients connectés
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);  // Envoie le message à tous les clients
            }
        });
    });

    // Lorsque la connexion est fermée
    socket.on('close', () => {
        console.log('Un utilisateur s\'est déconnecté.');
    });
});

// Utilise le port spécifié par l'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebSocket en ligne sur http://localhost:${PORT}`);
});
