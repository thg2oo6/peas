var Routes;

Routes = function (app, basePath) {
    var self = this;

    self.get = function (path, callback) {
        return app.get("/triggers/" + basePath + "/" + path, callback);
    };
    self.post = function (path, callback) {
        return app.post("/triggers/" + basePath + "/" + path, callback);
    };
    self.put = function (path, callback) {
        return app.put("/triggers/" + basePath + "/" + path, callback);
    };
    self.delete = function (path, callback) {
        return app.delete("/triggers/" + basePath + "/" + path, callback);
    };

    return self;
};

module.exports = Routes;