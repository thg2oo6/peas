const Achievements = require('../../express/achievements');
const Router = Achievements.Routes;

var Routes;

module.exports = function (app, basePath) {
    Routes = Router(app, basePath);

    Routes.post('github', function (req, res) {
        app.emit("github", req);
        res.json({status: "ok"});
    });
};