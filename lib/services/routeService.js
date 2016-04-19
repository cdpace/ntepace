var RouteService = function (app, templateService, controllers) {
    //Checks
    if (app == null) {
        throw "RouteService: express app not passed";
    }

    if (templateService == null) {
        throw "RouteService: TemplateService not passed";
    }


    //Public Members    

    this.handleRoute = function (route, method) {
        debugger;
        if (route != null) {
            var routeParams = parseRoute(route, method);

            method = method.toUpperCase();
            var result = null;

            switch (method) {
                case "GET":
                    {
                        var getControllers = controllers[method];
                        controller = getControllers[routeParams.controller.toUpperCase()];
                        result = controller(routeParams.args);
                        break;
                    }
            }

            if (result instanceof Object) {
                 if(result.viewName != null && result.viewName.length > 0){
                     
                 }
            }

            return false;

        } else
            throw "RouteService: route is undefined";
    };

    //Private Members
    var parseRoute = function (route, method) {

        var routeParams = {};

        //Parse GET requests
        if (method.toUpperCase() == "GET") {
            var parts = route.split("/");

            //Set Controller
            routeParams.controller = parts[0];
            if (routeParams.controller == null || routeParams.controller.length <= 0) {
                routeParams.controller = "Home";
            }

            //Set Action
            routeParams.action = parts[1];
            if (routeParams.action == null || routeParams.action.length <= 0) {
                //Set Default
                routeParams.action = "index";
            }

            //Generate Arguments
            routeParams.args = [];
            if (parts.length > 2) {
                for (p = 2; p < parts.length; p++) {
                    routeParams.args.push(parts[p]);
                }
            }
        }

        return routeParams;
    };
};

module.exports = RouteService;