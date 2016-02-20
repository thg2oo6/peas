module.exports = function(thinky) {
  const model = {
    Level: require('./level')(thinky),
    Group: require('./group')(thinky),
    Activity: require('./activity')(thinky),
    User: require('./user')(thinky),
    Badge: require('./badge')(thinky)
  };

  require("./links")(model);

  return model;
};
