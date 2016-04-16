var TemplateService = function (fs) {

    //Private members
    var _fs = fs;
    var templatePath = "";
    var templateContent = null;
    var templatePlaceholders = [];
    var fileEncoding = "utf-8";

    //Loads template html content from file and extracts the placeholders
    function loadTemplate() {
        var templatePattern = /@[[a-zA-Z0-9]+]/g;

        templateContent = _fs.readFileSync(templatePath, fileEncoding);
        templatePlaceholders = templateContent.match(templatePattern);

    }

    //Load the content of the specified view
    function loadView(viewpath, callback) {
        _fs.readFile(viewpath, fileEncoding, function (err, content) {
            if (err) throw err;
            callback(content);
        });
    }

    //Public members

    //Initialize the template manager
    this.init = function (template) {

        if (template == null || template <= 0) {
            throw "template not specified";
        }

        templatePath = template;
        loadTemplate();
    }

    //Process a view and return the html with the template injected
    this.processView = function (viewpath, params, callback) {
        try {
            loadView(viewpath, function (viewContent) {
                var viewPattern = /(##[A-Za-z0-9]+:)([\s\S]+?)(##)/igm;
                var viewTags = viewContent.match(viewPattern);
                var output = templateContent;

                templatePlaceholders.forEach(function (tag) {

                    var tagName = tag.replace("@[", "").replace(']', "");

                    viewTags.forEach(function (viewTag) {
                        if (viewTag.indexOf("##" + tagName + ":") != -1) {
                            var viewPart = viewTag.replace("##" + tagName + ":", "");
                            viewPart = viewPart.replace("##", "");

                            output = output.replace(tag, viewPart);
                        }
                    }, this);
                    
                }, this);
                
                //Send the generated view
                callback(null, output);
                
            });

        } catch (ex) {
            callback(ex, null);
        }
    }

};


module.exports = TemplateService;