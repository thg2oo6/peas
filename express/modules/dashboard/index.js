function configure(app, socket, broadcast) {
    socket.on('app.dashboard.get', (data) => {
        broadcast.emit('app.dashboard.get.response', [
            { id: 1, name: "test" },
            { id: 1, name: "test" },
            { id: 1, name: "test" },
            { id: 1, name: "test" },
            { id: 1, name: "test" },
            { id: 1, name: "test" }
        ])
    });
}

module.exports = configure;