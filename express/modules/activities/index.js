function configure(app, socket, broadcast) {
    var Group = app.model.Group;
    var getGroups = function () {
        Group.getJoin().run().then((result) => {
            broadcast.emit('app.activities.get.response', result);
        });
    };

    Group.changes().then(() => getGroups());

    socket.on('app.activities.getSingle', (data) => {
        Group.get(data.id)
            .getJoin()
            .run()
            .then((group) => {
                broadcast.emit('app.activities.getSingle.response', group);
            });
    });

    socket.on('app.activities.get', () => {
        getGroups();
    });
}

module.exports = configure;
