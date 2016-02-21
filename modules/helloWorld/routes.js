var Router = require('../../express/achievements').Routes;

var Routes;

module.exports = function (app, basePath) {
    Routes = Router(app, basePath);

    Routes.get('github', function (req, res) {
        console.log(req);
        res.json({status: "ok"});
    });
    Routes.post('github', function (req, res) {
        console.log(req);
        res.json({status: "ok"});
    });
};