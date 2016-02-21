function configure(app, socket, broadcast) {
    var User = app.model.User;
    var getUsers = function () {
        User.orderBy("createdAt").getJoin().run().then((result) => {
            broadcast.emit('settings.users.get.response', result.map((user) => {
              delete user.password;
              return user;
            }));
        });
    };

    User.changes().then(() => getUsers());

    socket.on('settings.users.getSingle', (data) => {
        User.get(data.id).getJoin().run().then((user) => {
            socket.emit('settings.users.getSingle.response', user);
        });
    });

    socket.on('settings.users.get', () => {
      getUsers()
    });

    socket.on('settings.users.post', (data) => {
        User.save(data).then((result) => {
            socket.emit('settings.users.post.response', result);
            getUsers();
        });
    });

    socket.on('settings.users.put', (data) => {
        User.get(data.id).run().then((user) => {
            user.merge(data).save().then((result) => {
                socket.emit('settings.users.put.response', result);
                getUsers();
            });
        })
    });

    socket.on('settings.users.delete', (data) => {
        User.get(data.id).then((user) => {
            user.delete().then((result) => {
                getUsers();
            });
        });
    });
}

module.exports = configure;
