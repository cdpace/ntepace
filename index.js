var templateManager = function(fs) {

    //Private members
    var _fs = fs;
    var templatePath = "";
    var viewsPath = "";
    var templateContent = null;
    var templatePlaceholders = [];
    var fileEncoding = "utf-8";

    //Loads template html content from cache or fom file
    function loadTemplate() {
        var templatePattern = /@[[a-zA-Z0-9]+]/g;
        
        templateContent = _fs.readFileSync(templatePath, fileEncoding);
        templatePlaceholders = templateContent.match(templatePattern);
        
    }

    function loadView(viewName, callback) {
        _fs.readFile(viewsPath + viewName, fileEncoding, function(err, content) {
            if (err) throw err;
            callback(content);
        });
    }

    //public members
    this.init = function(template, viewsFolder) {
        templatePath = template;
        viewsPath = viewsFolder;
        loadTemplate();
    }

    this.processView = function(viewName, params) {

        if (templatePath.length <= 0) {
            throw "template not specified";
        }

        if (viewsPath.length <= 0) {
            throw "view directory not specified";
        }

        loadView(viewName, function(viewContent) {
            debugger;
            var viewPattern = />>[A-Za-z0-9]+:(\r\n){1}(.+\r\n)*<</g;
            var viewTags = viewContent.match(viewPattern);
        });

    }


};

var fs = require("fs");

var man = new templateManager(fs);
man.init("./test/template/masterLayout.html", "./test/views/");

man.processView("index.html", null);