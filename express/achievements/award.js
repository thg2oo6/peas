var Award;

Award = function (app, user, activity) {
    const User = app.model.User;
    const Badge = app.model.Badge;

    var user;

    return Badge.filter({
            userID: user.id,
            activityID: activity.model.id
        })
        .run()
        .then((result)=> {
            var badge, newElement = false;
            if (result.length != 0) {
                badge = result.pop();
                badge.count++;
            } else {
                newElement = true
                badge = new Badge({
                    user: user,
                    activity: activity.model
                });

                user.score += activity.score;
            }

            return badge.saveAll()
                .then((result)=> {
                    if (newElement) {
                        app.emit("badge.earned." + user.id, result);
                        app.emit("level.check." + user.id, user);
                        app.emit("badge.add");
                    }
                });
        });
};

module.exports = Award;
