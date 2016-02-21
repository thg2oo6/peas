function configure(app, socket) {
    var Group = app.model.Group;
    var getGroups = function () {
        Group.run().then((result) => {
            socket.emit('app.activities.get.response', result);
        });
    };

    Group.changes().then(() => getGroups());

    socket.on('app.activities.getSingle', (data) => {
        Group.get(data.id)
            .getJoin({
                activities: true
            })
            .run()
            .then((group) => {
                socket.emit('app.activities.getSingle.response', group);
            });
    });

    socket.on('app.activities.get', () => {
        getGroups();
    });
}

module.exports = configure;
