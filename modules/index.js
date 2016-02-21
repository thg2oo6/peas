var Modules = function (app) {
    return {
        helloWorld: require('./helloWorld')(app)
    }
};

module.exports = Modules;