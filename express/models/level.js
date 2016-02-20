var Level = function (thinky) {
    const type = thinky.type;

    Level = thinky.createModel("Levels", {
        id: type.string(),
        name: type.string(),
        minScore: type.number().min(0).integer().default(0),
        logo: type.string()
    });

    return Level;
};

module.exports = Level;