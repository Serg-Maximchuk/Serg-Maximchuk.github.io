Imcms = {};
Imcms.modules = {
    imcms: Imcms // default module
};
Imcms.dependencies = {
    "jquery": {
        path: "//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",
        factory: function () {
            return $.noConflict(true);
        }
    },
    "jquery-mask": {
        dependencies: ["jquery"],
        path: "./libs/jquery.mask.min.js"
    }
};
Imcms.createXMLHttpRequest = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    // old browsers support
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};
Imcms.getScript = function (url, callback, async) {
    if (async === undefined) {
        async = true;
    }
    var ajaxRequest = this.createXMLHttpRequest();
    ajaxRequest.open("GET", url, async);
    ajaxRequest.overrideMimeType('application/javascript');
    ajaxRequest.onreadystatechange = function () {
        if (ajaxRequest.readyState === XMLHttpRequest.DONE) {
            if (ajaxRequest.status === 200) {
                callback(eval(ajaxRequest.responseText));

            } else {
                console.error('Script get request error: ' + ajaxRequest.status);
            }
        }
    };
    ajaxRequest.send(null);
};
Imcms.define = function (id, dependencies, factory) {
    console.log(id);
    //todo: handle anonymous (dependencies, factory) and independence (id, factory) modules, maybe
    var modules = dependencies.map(this.require.bind(this));
    this.modules[id] = factory.apply(null, modules);
};

Imcms.require = function (id) {
    return this.modules[id];
};

(function () {
    function loadDependency(dependencyName, dependency) {
        function define() {
            console.log("define");
            console.log(arguments);
        }

        define.amd = {};
        Imcms.getScript(dependency.path, function () {
            var dependencies = ["imcms"].concat(dependency.dependencies||[])
            ;
            Imcms.define(dependencyName, dependencies, function () {
                return dependency.factory && dependency.factory();
            });
        });
    }

    for (dependencyName in Imcms.dependencies) {
        if (Imcms.dependencies.hasOwnProperty(dependencyName)) {
            loadDependency(dependencyName, Imcms.dependencies[dependencyName]);
        }
    }
})();