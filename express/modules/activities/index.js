function configure(app, socket) {
    socket.on('activities.get', (data) => {
        socket.emit('activities.get.response', {})
    });
}

module.exports = configure;
