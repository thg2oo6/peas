var ActivityWrapper = function (thinky) {
    const type = thinky.type;

    var Activity = thinky.createModel("Activities", {
        id: type.string(),
        groupID: type.string(),
        name: type.string().required(),
        badge: type.string().required(),
        description: type.string().required(),
        score: type.number().min(0).integer().default(0)
    });

    return Activity;
};

module.exports = ActivityWrapper;