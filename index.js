var tm = require("./lib/templateManager");


module.exports = function (fs, app, config) {
    var tm = new templateManager(fs);

    tm.init(config.template, config.viewDir);

    app.engine("ntl", function (filePath, options, callback) {
        tm.processView(filePath, options, callback);
    });

}