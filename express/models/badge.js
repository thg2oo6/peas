var BadgeWrapper = function (thinky) {
    const type = thinky.type;
    const r = thinky.r;

    var Badge = thinky.createModel("Badges", {
        id: type.string(),
        userID: type.string(),
        activityID: type.string(),
        earned: type.date().default(r.now())
    });

    return Badge;
};

module.exports = BadgeWrapper;