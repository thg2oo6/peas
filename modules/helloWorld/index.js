const _ = require("lodash");
const Achievements = require('../../express/achievements');
const DBSync = Achievements.DBSync;
const Award = Achievements.Award;

const achievements = require('./achievements');
const routes = require('./routes');

var HelloWorld;

HelloWorld = function (app) {
    var sync = new DBSync(app, achievements.group);
    const User = app.model.User;
    const Badge = app.model.Badge;

    sync.run();
    new routes(app, 'hello-world');

    app.on("github", function (req) {
        var msg = req.body,
            user = msg.head_commit.committer;

        User.filter({
                username: user.username
            })
            .run()
            .then((result)=> {
                if (result.length == 0) {
                    user = null;
                    return [];
                }

                user = result.pop();

                return Badge.getJoin()
                    .filter({
                        userID: user.id
                    })
                    .run();
            })
            .then((badges)=> {
                if (_.isNull(user))
                    return;

                var promise = Award(app, user, achievements.activities.FirstActivity);

                for (var i in badges) {
                    var badge = badges[i];
                    switch (badge.activity.name) {
                        case achievements.activities.FirstActivity.name:
                            promise.then(()=> {
                                return Award(app, user, achievements.activities.SecondActivity)
                            });
                            break;
                        case  achievements.activities.SecondActivity.name:
                            promise.then(()=> {
                                return Award(app, user, achievements.activities.ThirdActivity)
                            });
                            break;
                    }
                }

                return promise;
            })
            .catch((err)=> {
                throw err;
            });
    });
};

module.exports = HelloWorld;