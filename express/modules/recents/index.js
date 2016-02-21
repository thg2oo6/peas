function configure(app, socket, broadcast) {
    socket.on('app.recents.get', (data) => {
        broadcast.emit('app.recents.get.response', {})
    });
}

module.exports = configure;
