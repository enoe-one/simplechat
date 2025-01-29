const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Créer une application Express
const app = express();

// Créer un serveur HTTP avec Express
const server = http.createServer(app);

// Créer un serveur WebSocket sur le même serveur HTTP
const wss = new WebSocket.Server({ server });

// Servir les fichiers statiques (index.html, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Importer le fichier de gestion des WebSockets (index.js)
require('./index.js')(wss);

// Utiliser le port spécifié par l'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebSocket en ligne sur http://localhost:${PORT}`);
});
