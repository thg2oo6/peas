function configure(app, socket, broadcast) {
    var Group = app.model.Group;
    var User = app.model.User;
    var getGroups = function () {
        Group.getJoin().run().then((result) => {
            broadcast.emit('app.activities.get.response', result);
        });
    };

    Group.changes().then(() => getGroups());

    socket.on('app.activities.getSingle', (data) => {
        var groupData = {};

        Group.get(data.id)
            .getJoin({
                activities: true
            })
            .run()
            .then((group) => {
                groupData = group;
                return User.get(socket.request.user.id)
                    .getJoin({
                        badges: true
                    })
                    .run();
            })
            .then((user)=> {
                broadcast.emit('app.activities.getSingle.response', {
                    group: groupData,
                    badges: user.badges
                });
            });
    });

    socket.on('app.activities.get', () => {
        getGroups();
    });
}

module.exports = configure;
