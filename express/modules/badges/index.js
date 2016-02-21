function configure(app, socket, broadcast) {
    var Badge = app.model.Badge;

    socket.on('app.badges.get', (data) => {
        Badge.filter({
                userID: socket.request.user.id
            })
            .getJoin()
            .run()
            .then((result) => {
                broadcast.emit('app.badges.get.response', result);
            });
    });
}

module.exports = configure;
