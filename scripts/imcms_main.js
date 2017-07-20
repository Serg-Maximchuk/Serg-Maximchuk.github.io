Imcms = {};
Imcms.modules = {
    imcms: Imcms // default module
};
Imcms.config = {
    // todo: support basePath!!!
    basePath: "scripts",
    dependencies: {
        "jquery": {
            path: "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
            init: function ($) {
                return $.noConflict(true);
            }
        },
        "jquery-mask": {
            path: "./libs/jquery.mask.min.js",
            deps: ["jquery"],
            init: function () {
                // renew jquery to have new functions from plugin
                // Imcms.modules.jquery = Imcms.modules.jquery.fn.init();
            }
        },
        "imcms-buttons": "imcms_button.js",
        "imcms-date-picker": "imcms_date_picker.js",
        "imcms-calendar": "imcms_calendar.js",
        "imcms-time-picker": "imcms_time_picker.js",
        "imcms-tests": "scripts/imcms_tests.js",
        "imcms-start": "imcms_initialize.js"
    }
};

(function () {
    Array.prototype.remove = function (element) {
        var index = this.indexOf(element);
        return (index === -1) ? this : this.slice(0, index).concat(this.slice(index + 1));
    };

    function registerModule(id, module) {
        console.log("Registering module " + id);
        if (Imcms.modules[id]) {
            console.error("Module already registered! " + id);
            return;
        }

        if (!Imcms.config.dependencies[id]) {
            console.error("Not found dependency: " + id);
            return;
        }

        if (Imcms.config.dependencies[id].init) {
            module = Imcms.config.dependencies[id].init.call(null, module);
        }

        Imcms.modules[id] = module;
    }

    function getModule(id) {
        return Imcms.modules[id];
    }

    function getDependency(id) {
        return Imcms.config.dependencies[id];
    }

    function loadModuleAsync(path, onLoad) {
        setTimeout(appendScript.bind(null, path, onLoad));
    }

    function loadScriptAsync(dependency, onLoad) {
        setTimeout(getScript.bind(null, dependency.path, onLoad));
    }

    function resolveDefineArgs() {
        var anonymousModuleId = undefined,
            depsForIndependentModule = [],
            unresolvedArgs = Array.prototype.slice.call(arguments),
            resolvedArgs;

        try {
            switch (arguments[0] && arguments[0].constructor) {
                case undefined : // anonymous module with undefined id, nothing to modify
                case String : // means first arg is id
                    resolvedArgs = unresolvedArgs;
                    break;

                case Array : // in this case we have an anonymous module with dependencies array
                    resolvedArgs = [anonymousModuleId].concat(unresolvedArgs);
                    break;

                case Function : // anonymous independent module
                    resolvedArgs = [anonymousModuleId, depsForIndependentModule].concat(unresolvedArgs);
                    break;

                default :
                    console.error("Something wrong!");
                    console.error(arguments);
            }
        } catch (e) {
            console.error(e);
            console.error(arguments);
        }

        return resolvedArgs;
    }

    /**
     * AMD interface function to catch only imcms-configured modules
     */
    function define() {
        var resolvedArgs = resolveDefineArgs.apply(null, arguments);
        defineModule.apply(null, resolvedArgs);
    }

    define.amd = {};

    Imcms.loadedDependencies = {};

    function loadDependencyById(id, onLoad) {
        var dependency = getDependency(id);

        if (!dependency) {
            console.error("No dependency found with id " + id);
            return;
        }

        if (Imcms.loadedDependencies[id]) {
            console.error("Dependency is already loaded!!!! " + id);
            return;
        }

        Imcms.loadedDependencies[id] = true;

        var loader;

        switch (typeof dependency) {
            case "string": {
                loader = loadModuleAsync;
                break;
            }
            case "object": {
                loader = loadScriptAsync;
            }
        }

        loader.call(null, dependency, onLoad);
    }

    function createXMLHttpRequest() {
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
    }

    function getScript(url, callback, async) {
        if (async === undefined) {
            async = true;
        }
        var ajaxRequest = createXMLHttpRequest();
        ajaxRequest.open("GET", url, async);
        ajaxRequest.overrideMimeType('application/javascript');
        ajaxRequest.onreadystatechange = function () {
            if (ajaxRequest.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            if (ajaxRequest.status === 200) {
                console.info('script ' + url + " loaded successfully.");
                callback && callback(eval(ajaxRequest.responseText));

            } else {
                console.error('Script get request error: ' + ajaxRequest.status + ' for url: ' + url);
            }
        };
        ajaxRequest.send(null);
    }

    function appendScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;

        if (script.readyState) {  // IE support
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                    script.onreadystatechange = null;
                    console.info('script ' + url + " appended successfully.");
                    callback.call();
                }
            };
        } else {  // Other normal browsers
            script.onload = function () {
                console.info('module ' + url + " loaded successfully.");
                callback.call();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    /**
     * AMD define function.
     * Defines module by it's (optional) id with (optional) dependencies
     * by calling factory function after dependencies load.
     *
     * @param {string?} id defined module id
     * @param {[]?} dependencies as module ids
     * @param factory which return is this defined module in result
     */
    Imcms.define = function (id, dependencies, factory) {
        define.apply(null, arguments);
    };
    /**
     * AMD require function.
     *
     * @param {string|[string]} id required module id
     * @param {function} onLoad function that will be called with loaded required modules
     */
    // todo: support not only but also array of ids!!!
    Imcms.require = function (id, onLoad) {
        registerRequires(id, onLoad);
        setTimeout(runModuleLoader);
    };

    function defineModule(id, dependencies, factory) {
        Imcms.require(dependencies, function () {
            var module = factory.apply(null, arguments);
            if (id) {
                // register only not anonymous modules
                registerModule(id, module);
            }
        });
    }

    Imcms.requiresQueue = [];

    function registerRequires(id, onLoad) {
        var requires;

        switch (id.constructor) {
            case String : {
                requires = [id];
                break;
            }
            case Array : {
                requires = id;
                break;
            }
            default : {
                console.error("Wrong type: ");
                console.error(id);
            }
        }

        Imcms.requiresQueue.push({
            requires: requires,
            onLoad: onLoad
        });
    }

    function delayedAddToQueue(require) {
        setTimeout(function () {
            Imcms.requiresQueue.push(require);
            setTimeout(runModuleLoader);
        });
    }

    var failsCount = 0;

    function runModuleLoader() {
        while (Imcms.requiresQueue.length) {
            var require = Imcms.requiresQueue.shift();
            var undefinedRequires = require.requires.filter(function (dependency) {
                return !Imcms.modules[dependency];
            });

            if (undefinedRequires.length) {
                undefinedRequires = undefinedRequires.filter(function (dependency) {
                    return !Imcms.loadedDependencies[dependency];
                });

                if (undefinedRequires.length) {
                    undefinedRequires.forEach(loadDependencyAndCheck(require));

                } else if (failsCount < 100) {// dummy fail limit
                    failsCount++;
                    delayedAddToQueue(require);

                } else {
                    console.error("Failed to load dependency:");
                    console.error(require);
                }
            } else {
                failsCount = 0;
                var dependencies = require.requires.map(getModule);
                require.onLoad.apply(null, dependencies);
            }
        }
    }

    function loadDependencyAndCheck(require) {
        return function (id) {
            setTimeout(loadDependencyById.bind(null, id, checkOnLoad.bind(null, require)));
        }
    }

    function checkOnLoad(require) {
        setTimeout(function () {
            var undefinedRequires = require.requires.filter(function (dependency) {
                return !Imcms.modules[dependency];
            });

            if (undefinedRequires.length) {
                Imcms.requiresQueue.push(require);
                setTimeout(runModuleLoader);
                return;
            }

            Imcms.requiresQueue = Imcms.requiresQueue.remove(require);

            var requires = require.requires.map(function (require2) {
                return Imcms.modules[require2];
            });

            require.onLoad.apply(null, requires);
        });
    }

    Imcms.require("imcms-tests", function (tests) {
        console.info("%c Tests loaded.", "color: green");
        Imcms.tests = tests;
    });

    // Imcms.require("imcms-start").init();
})();
