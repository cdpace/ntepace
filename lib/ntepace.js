var TemplateService = require("./services/templateService");
var RouteService = require("./services/routeService");

module.exports = function (fs, app, config) {
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

    //Route handler middleware
    function routeHandler(req, res, next) {
        var isHandled = rService.handleRoute(req.originalUrl, req.method);
        if (!isHandled) {
            next();
        }
    }

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
    if (config.handleRoutes == true) {
        if (config.setRouteHandlerManually == true) {
            this.routeHandler = routeHandler();
        } else {
            app.use(routeHandler);
        }
    }

}