function configure(app, socket, broadcast) {
    var Level = app.model.Level;
    var getLevels = function () {
        Level.orderBy("createdAt").run().then((result) => {
            broadcast.emit('settings.levels.get.response', result);
        });
    };

    Level.changes().then(() => getLevels());

    socket.on('settings.levels.getSingle', (data) => {
        Level.get(data.id).run().then((level) => {
            broadcast.emit('settings.levels.getSingle.response', level);
        });
    });

    socket.on('settings.levels.get', () => {
        getLevels();
    });

    socket.on('settings.levels.post', (data) => {
        if (socket.request.user.isAdmin)
            Level.save(data).then((result) => {
                broadcast.emit('settings.levels.post.response', result);
                getLevels();
            }).catch((err) => {
                socket.emit('settings.levels.post.error', err);
            });
    });

    socket.on('settings.levels.put', (data) => {
        if (socket.request.user.isAdmin)
            Level.get(data.id).run().then((level) => {
                level.merge(data).save().then((result) => {
                    broadcast.emit('settings.levels.put.response', result);
                    getLevels();
                }).catch((err) => {
                    socket.emit('settings.levels.put.error', err);
                });;
            })
    });

    socket.on('settings.levels.delete', (data) => {
        if (socket.request.user.isAdmin)
            Level.get(data.id).then((level) => {
                level.delete().then((result) => {
                    getLevels();
                });
            });
    });
}

module.exports = configure;
