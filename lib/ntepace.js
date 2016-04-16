var templateManager = require("./templateManager");


module.exports = function (fs, app, config) {
    var tm = new templateManager(fs);

    tm.init(config.template, config.viewDir);

    app.engine("ntepace", function (filePath, options, callback) {
        tm.processView(filePath, options, callback);
    });
    
    //Set express view engine settings
    app.set("views",config.viewDir);
    app.set("view engine","ntepace");

}