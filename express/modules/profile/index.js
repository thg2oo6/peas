function configure(app, socket, broadcast) {
    socket.on('profile.getCurrentUser', (data) => {
        var userId = socket.request.user.id;
        app.model.User.get(userId).then(user => {
          socket.emit('profile.getCurrentUser.response', user);
        });
    });
}

module.exports = configure;
