function configure(app, socket, broadcast) {
    var User = app.model.User;
    var Level = app.model.Level;
    var userId = socket.request.user.id;

    var sendUserResponse = function () {
        User.get(userId).getJoin({
            level: true
        }).then(user => {
            socket.emit('profile.getCurrentUser.response', user);
        });
    };

    app.on("badge.earned." + userId, (data)=> {
        socket.emit("badge.earned", data);
    });
    
    app.on("level.check." + userId, (user)=> {
        Level.filter(function (level) {
                return level("minScore").le(user.score);
            })
            .orderBy('-minScore')
            .run()
            .then((result)=> {
                var level = result.shift();

                if (level.id != user.levelID) {
                    return User.get(user.id)
                        .update({levelID: level.id})
                        .run();
                }
            });
    });

    socket.on('profile.getCurrentUser', (data) => sendUserResponse());
    User.get(userId).changes().then(() => sendUserResponse())
}

module.exports = configure;
