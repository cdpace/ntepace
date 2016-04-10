var templateManager = function(fs) {
    
    //Private members
    var _fs = fs;
    var templatePath = "";
    var viewsPath = "";
    var templateContentCache = null;
    
    //Loads template html content from cache or fom file
    function loadTemplate(callback) {
        if (templateContentCache != null)
            callback(templateContentCache);
        else {
            _fs.readFile(templatePath,"utf-8", function(err, content) {
                if (err) throw err;

                callback(content);
            });
        }
    }

    //public members
    this.init = function(template,viewsFolder){
        templatePath = template;
        viewsPath = viewsFolder;
    }
    
    this.processView = function(viewName, params) {

        if (templatePath.length <= 0) {
            throw "template not specified";
        }

        if (viewsPath.length <= 0) {
            throw "view directory not specified";
        }

        //Load Template
        loadTemplate(function(template) {
            var pattern = /@[[a-zA-z0-9]+]/g;
            var templatePlaceholders = template.match(pattern);
            
            
            
        });
    }

    
};

var fs = require("fs");

var man = new templateManager(fs);
man.init("./test/template/masterLayout.html","./test/views/");

man.processView("index.html", null);