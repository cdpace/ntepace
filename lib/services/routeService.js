var RouteService = function (app,templateService) {
    //Checks
    if(app == null){
        throw "RouteService: express app not passed";
    }
    
    if(templateService == null){
        throw "RouteService: TemplateService not passed";
    }


    //Public Members    

    this.handleRoute = function (route, method) {
        if (route != null) {
            var routeParams = parseRoute(route, method);
            
            switch(method.toUpperCase()){
                case "GET":
                {
                    
                    break;
                }
            }
            
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

            //Set Action
            routeParams.action = parts[1];
            if(routeParams.action == null){
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