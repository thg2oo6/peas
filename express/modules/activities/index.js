function configure(app, socket, broadcast) {
    var Group = app.model.Group;
    var User = app.model.User;
    var getGroups = function () {
        var groupData = {};
        Group.getJoin({
                activities: true
            })
            .run()
            .then((groups) => {
                groupData = groups;
                return User.get(socket.request.user.id)
                    .getJoin({
                        badges: true
                    })
                    .run();
            })
            .then((user)=> {
                broadcast.emit('app.activities.get.response', {
                    groups: groupData,
                    badges: user.badges
                });
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
