function configure(app, socket, broadcast) {
    var Badge = app.model.Badge;

    Badge.changes().then(() => {
      Badge.orderBy(app.thinky.r.desc("earned")).getJoin().run().then((result) => {
          broadcast.emit('app.badges.recent', result);
      });
    });

    socket.on('app.badges.getall', (data) => {
      Badge.orderBy(app.thinky.r.desc("earned")).getJoin().run().then((result) => {
        socket.emit('app.badges.recent', result);
      });
    })

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
