const Promise = require("bluebird");

var promiseFor;
promiseFor = Promise.method(function (condition, action, value) {
    if (!condition(value)) return value;
    return action(value).then(promiseFor.bind(null, condition, action));
});

module.exports = promiseFor;