var RouteService = function (app, templateService, controllers) {
    //Checks
    if (app == null) {
        throw "RouteService: express app not passed";
    }

    if (templateService == null) {
        throw "RouteService: TemplateService not passed";
    }


    //Public Members    

    this.handleRoute = function (route, method, response) {
        debugger;
        if (route != null) {
            var routeParams = parseRoute(route, method);

            method = method.toUpperCase();
            var result = null;

            var controller = controllers[routeParams.controller.toUpperCase()];
            if (controller != null) {

                var actionSet = controller[method];

                if (actionSet != null) {

                    var action = actionSet[routeParams.action.toUpperCase()];

                    if (action != null) {
                        var result = action(routeParams.args);
                    } else {
                        handleRouteNotFound(response);
                    }

                } else {
                    handleRouteNotFound(response);
                }

            } else {
                handleRouteNotFound(response);
            }

            if (result instanceof Object) {
                if (result.viewName != null && result.viewName.length > 0) {
                    response.render(result.viewName, result.args);
                }
            }else if(result instanceof string){
                response.send(result);
                response.end();
            }

        } else
            throw "RouteService: route is undefined";
    };

    //Private Members
    function parseRoute(route, method) {

        var routeParams = {};
        
        if (route.length > 1) {
                if (route[0] == "/") {
                    route = route.substring(1, route.length);
                }
            }

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
        switch (method.toUpperCase()) {
            case "GET":
                 routeParams.args = [];
                if (parts.length > 2) {
                    for (p = 2; p < parts.length; p++) {
                        routeParams.args.push(parts[p]);
                    }
                }
                break;
        
            default:
                break;
        }
        
        return routeParams;
    };

    function handleRouteNotFound(response) {
        response.status(404);
        response.end();
    };

};

module.exports = RouteService;