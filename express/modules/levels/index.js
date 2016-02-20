function configure(app, socket) {
    var Level = app.model.Level;
    var getLevels = function() {
      Level.orderBy("createdAt").run().then((result) => {
        socket.emit('settings.levels.get.response', result);
      });
    };

    Level.changes().then(() => getLevels());

    socket.on('settings.levels.getSingle', (data) => {
      Level.get(data.id).run().then((level) => {
        socket.emit('settings.levels.getSingle.response', level);
      });
    });

    socket.on('settings.levels.get', () => {
      getLevels();
    });

    socket.on('settings.levels.post', (data) => {
      Level.save(data).then((result) => {
        socket.emit('settings.levels.post.response', result);
        getLevels();
      });
    });

    socket.on('settings.levels.put', (data) => {
      Level.get(data.id).run().then((level) => {
          level.merge(data).save().then((result) => {
          socket.emit('settings.levels.put.response', result);
          getLevels();
        });
      })
    });

    socket.on('settings.levels.delete', (data) => {
      Level.get(data.id).then((level) => {
        level.delete().then((result) => {
          getLevels();
        });
      });
    });
}

module.exports = configure;
