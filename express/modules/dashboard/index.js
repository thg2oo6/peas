function configure(app, socket) {
    socket.on('dashboard.get', (data) => {
        socket.emit('dashboard.get.response', [
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