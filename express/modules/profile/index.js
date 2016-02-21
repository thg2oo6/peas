function configure(app, socket, broadcast) {
    var User = app.model.User;
    var userId = socket.request.user.id;

    var sendUserResponse = function() {
      User.get(userId).getJoin({
          level: true
      }).then(user => {
        socket.emit('profile.getCurrentUser.response', user);
      });
    };

    app.on("badge.earned." + userId,(data)=>{
        socket.emit("badge.earned"); //TODO: Publish for user the event of earning
    });
    socket.on('profile.getCurrentUser', (data) => sendUserResponse());
    User.get(userId).changes().then(() => sendUserResponse())
}

module.exports = configure;
