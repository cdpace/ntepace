var TemplateService = require("./services/templateService");
var RouteService = require("./services/routeService");

module.exports = function (fs, app, config) {
    //Services
    var tService = new TemplateService(fs);
    var rService = new RouteService(app, tService);

    //Register Template Directory
    tService.init(config.template);

    //Register the view engine
    app.engine("ntepace", function (filePath, options, callback) {
        tService.processView(filePath, options, callback);
    });

    //Set express view engine settings
    app.set("views", config.viewDir);
    app.set("view engine", "ntepace");


    //Create Middle ware to handle incoming routes


}