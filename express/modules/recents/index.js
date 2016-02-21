function configure(app, socket) {
    socket.on('app.recents.get', (data) => {
        socket.emit('app.recents.get.response', {})
    });
}

module.exports = configure;
