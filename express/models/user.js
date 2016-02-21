var validator = require('validator');

var UserWrapper = function (thinky) {
    const type = thinky.type;

    var User = thinky.createModel("Users", {
        id: type.string(),
        username: type.string().min(4).required(),
        password: type.string().required(),
        email: type.string().validator(validator.isEmail),
        firstName: type.string().required(),
        lastName: type.string().required(),
        isAdmin: type.boolean().default(false),
        levelID: type.string().allowNull(true),
        score: type.number().min(0).integer().default(0),
        createdAt: type.date()
    });

    return User;
};

module.exports = UserWrapper;
