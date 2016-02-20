var Level = function (thinky) {
    const type = thinky.type;

    Level = thinky.createModel("Levels", {
        id: type.string(),
        name: type.string(),
        minScore: type.number().min(0).integer().default(0),
        logo: type.string(),
        createdAt: type.date()
    });

    Level.pre("save", function() {
        if (!this.createdAt) {
          this.createdAt = new Date();
        }
    });

    return Level;
};

module.exports = Level;
