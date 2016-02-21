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
            var badge;
            if (result.length != 0) {
                badge = result.pop();
                badge.count++;
            } else
                badge = new Badge({
                    user: user,
                    activity: activity.model
                });

            return badge.saveAll();
        });
};

module.exports = Award;