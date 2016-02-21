var GroupWrapper = function (thinky) {
    const type = thinky.type;

    var Group = thinky.createModel("Groups", {
        id: type.string(),
        name: type.string().required(),
        logo: type.string().required(),
        description: type.string().required(),
        score: type.number().min(0).integer().default(0)
    });

    return Group;
};

module.exports = GroupWrapper;