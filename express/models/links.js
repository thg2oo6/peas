var Links = function (model) {
    const Level = model.Level;
    const Group = model.Group;
    const Activity = model.Activity;
    const User = model.User;
    const Badge = model.Badge;

    /* -- Activity <-> Group -- */
    Activity.belongsTo(Group, "group", "groupID", "id");
    Group.hasMany(Group, "activities", "id", "groupID");
    /* -- Group <-> Activities -- */

    /* -- User <-> Level -- */
    User.belongsTo(Level, "level", "levelID", "id");
    Level.hasMany(User, "users", "id", "levelID");
    /* -- Level <-> Users -- */

    /* -- User <-(Badge)-> Activity -- */
    User.hasMany(Badge, "badges", "id", "userID");
    Badge.belongsTo(User, "user", "userID", "id");
    Badge.belongsTo(Activity, "activity", "activityID", "id");
    Activity.hasMany(Badge, "badges", "id", "activityID");
    /* -- Activity <-(Badge)-> Users -- */

    User.pre("save", function (next) {
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
        Level.filter({
                minScore: 0
            })
            .run()
            .then((result)=> {
                if (result.length == 0)
                    return next();

                this.levelID = result.pop().id;
                next();
            });

    });
};

module.exports = Links;
