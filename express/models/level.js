var LevelWrapper = function (thinky) {
    const type = thinky.type;

    var Level = thinky.createModel("Levels", {
        id: type.string(),
        name: type.string().required(),
        minScore: type.number().min(0).integer().default(0),
        logo: type.string().required()
    });

    return Level;
};

module.exports = LevelWrapper;