var Modules = function (app) {
    return {
        helloWorld: require('./helloWorld')(app),
        sample: require('./sample')(app)
    }
};

module.exports = Modules;