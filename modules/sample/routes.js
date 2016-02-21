const _ = require("lodash");
const Achievements = require('../../express/achievements');
const Router = Achievements.Routes;
const Award = Achievements.Award;

var Routes;

module.exports = function (app, basePath, achievements) {
    const User = app.model.User;
    const Badge = app.model.Badge;

    Routes = Router(app, basePath);

    Routes.get('first', function (req, res) {
        var user = req.user;
        User.filter({
                username: req.user.username
            })
            .run()
            .then((result)=> {
                if (result.length == 0) {
                    user = null;
                    return [];
                }

                user = result.pop();

                return Badge.filter({
                        activityID: achievements.activities.FirstBadge.model.id,
                        userID: user.id
                    })
                    .getJoin({
                        activity: true,
                        user: true
                    })
                    .run();
            })
            .then((badges)=> {
                if (_.isNull(user))
                    return;

                var badge = badges.pop();
                Award(app, user, achievements.activities.FirstBadge).then(()=> {
                        if (badge && badge.count == 4)
                            return Award(app, user, achievements.activities.Spammer);
                    })
                    .then(()=> {
                        if (badge && badge.count == 4)
                            res.json({message: "Good job! You're a spammer!!!"});
                        else
                            res.json({message: "Good job!"});
                    });
            })
            .catch((err)=> {
                res.status(500);
                res.json({error: err.message});
            });
    });

    Routes.get('second', function (req, res) {
        var user = req.user;
        User.filter({
                username: req.user.username
            })
            .run()
            .then((result)=> {
                if (result.length == 0) {
                    user = null;
                    return [];
                }

                user = result.pop();

                return Badge.filter({
                        activityID: achievements.activities.FirstBadge.model.id,
                        userID: user.id
                    })
                    .getJoin({
                        activity: true,
                        user: true
                    })
                    .run();
            })
            .then((badges)=> {
                if (_.isNull(user))
                    return;

                console.log(badges);
                if (badges.length == 0) {
                    res.status(500);
                    res.json({error: "You must have the first badge!"});
                    return;
                }

                var badge = badges.pop();
                Award(app, user, achievements.activities.SecondBadge)
                    .then(()=> {
                        res.json({message: "Good job!"});
                    });
            })
            .catch((err)=> {
                res.status(500);
                res.json({error: err.message});
            });
    });

};