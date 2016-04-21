var TemplateService = require("./services/templateService");
var RouteService = require("./services/routeService");

module.exports = function (fs, app, config) {
    var exportObj = {};
    
    //Set config defaults
    if (config.handleRoutes == null) {
        config.handleRoutes = true;
    }

    if (config.setRouteHandlerManually == null) {
        config.setRouteHandlerManually = false;
    }

    if (config.controllers == null) {
        config.controllers = {};
    }

    //Services
    var tService = new TemplateService(fs);
    var rService = new RouteService(app, tService, config.controllers);

    //Register Template Directory
    tService.init(config.template);

    //Register the view engine
    app.engine("html", function (filePath, options, callback) {
        tService.processView(filePath, options, callback);
    });

    //Set express view engine settings
    app.set("views", config.viewDir);
    app.set("view engine", "html");

    //Create Middle ware to handle incoming routes
    if (config.handleRoutes == true) {
        if (config.setRouteHandlerManually == true) {
            exportObj.routeHandler = rService.handleRoute;
        } else {
            app.use(rService.handleRoute);
        }
    }
    
    return exportObj;

}