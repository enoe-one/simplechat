module.exports = function(wss) {
    // Lorsque un client se connecte via WebSocket
    wss.on('connection', socket => {
        console.log('Un utilisateur s\'est connecté.');

        // Lorsque le serveur reçoit un message d'un client
        socket.on('message', message => {
            console.log('Message reçu:', message);  // Affiche le message dans la console

            // Transmettre le message à tous les autres clients connectés
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
};
