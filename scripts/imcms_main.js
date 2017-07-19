Imcms = {};
Imcms.modules = {
    imcms: Imcms // default module
};
Imcms.config = {
    // todo: support basePath!!!
    basePath: "scripts"
};
Imcms.dependencies = {
    "jquery": {
        path: "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
        init: function ($) {
            return $.noConflict(true);
        }
    },
    "jquery-mask": {
        path: "./libs/jquery.mask.min.js",
        deps: ["jquery"]
    },
    "imcms-buttons": "imcms_button.js",
    "imcms-date-picker": "imcms_date_picker.js",
    "imcms-calendar": "imcms_calendar.js",
    "imcms-time-picker": "imcms_time_picker.js",
    "imcms-tests": "scripts/imcms_tests.js",
    "imcms-start": "imcms_initialize.js"
};

(function () {
    Function.prototype.bindArgsArray = function (argsArray, context) {
        return function () {
            this.apply(context, argsArray);
        }.bind(this);
    };

    var modulesThatLoadsRightNow = {};
    var modulesWaitingForDependencies = {};

    var modulesQueue = [],
        failsCounter = 0;

    function registerModule(id, module) {
        console.log("Registering module " + id);
        if (Imcms.modules[id]) {
            console.error("Module already registered! " + id);
            return;
        }

        if (Imcms.dependencies[id].init) {
            module = Imcms.dependencies[id].init.call(null, module);
        }

        Imcms.modules[id] = module;
    }

    function getModule(id) {
        return Imcms.modules[id];
    }

    function getDependency(id) {
        return Imcms.dependencies[id];
    }

    function loadModuleAsync(id, path) {
        setTimeout(loadModule.bind(null, id, path));
    }

    function loadScriptAsync(id, dependency) {
        setTimeout(loadScript.bind(null, id, dependency));
    }

    function loadModule(id, path) {
        Imcms.appendScript(path, Imcms.loadedDependencies[id]);
    }

    function loadScript(id, dependency) {
        Imcms.getScript(dependency.path, Imcms.loadedDependencies[id]);
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
        defineModule2.apply(null, resolvedArgs);
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

        modulesThatLoadsRightNow[id] = true;
        Imcms.loadedDependencies[id] = onLoad;

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

        loader.call(null, id, dependency);
    }

    function defineModule(id, dependencies, factory) {
        if (Imcms.modules[id]) {
            // skip already registered modules
            console.info("Trying to load already loaded module " + id);
            return;
        }

        var modules = dependencies.map(getModule);

        if (modules.indexOf(undefined) === -1) {
            // means all modules are loaded or independent module
            failsCounter = 0;

            if (id) {
                // register only non-anonymous modules
                registerModule(id, factory.apply(null, modules));
            }

            delete modulesWaitingForDependencies[id];
            var dependencyToDefineNext = modulesQueue.shift();
            dependencyToDefineNext && setTimeout(Imcms.define.bindArgsArray(dependencyToDefineNext, Imcms));

        } else {
            if (modulesWaitingForDependencies[id]) {
                console.log("Trying to load module that is already waiting for dependencies!");
                return;
            }

            dependencies = dependencies.filter(function (dependency) {
                return !Imcms.modules[dependency];
            });

            modulesWaitingForDependencies[id] = dependencies;
            dependencies.map(loadDependencyById);

            if (failsCounter < 100) { // dummy fail limit value
                // means not all dependencies are loaded yet, try to load next one
                modulesQueue.push(arguments);
                failsCounter++;
                return;
            }

            console.error("Error while loading modules and their dependencies!");
            console.error(modulesQueue);
            console.error(dependencies);
        }
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

    Imcms.getScript = function (url, callback, async) {
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
    };

    Imcms.appendScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;

        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                    script.onreadystatechange = null;
                    console.info('script ' + url + " appended successfully.");
                    callback.call();
                }
            };
        } else {  //Others
            script.onload = function () {
                console.info('module ' + url + " loaded successfully.");
                callback.call();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

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

        // if (this.modules[id]) {
        //     setTimeout(onLoad.bind(null, this.modules[id]));
        //     return;
        // }
        //
        // loadDependencyById(id, onLoad);
    };

    function defineModule2(id, dependencies, factory) {
        Imcms.require(dependencies, function () {
            registerModule(id, factory.apply(null, arguments));
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

        console.log("Pushing requires: ");
        console.log(requires);

        Imcms.requiresQueue.push({
            requires: requires,
            onLoad: onLoad
        });
    }

    function runModuleLoader() {
        var secondLoadingCycle = [];

        while (Imcms.requiresQueue.length) {
            var require = Imcms.requiresQueue.shift();
            var undefinedRequires = require.requires.filter(function (dependency) {
                return !Imcms.modules[dependency];
            });

            if (undefinedRequires.length) {
                undefinedRequires.forEach(function (id) {
                    setTimeout(loadDependencyById.bind(null, id, checkOnLoad.bind(null, require)));
                });

                secondLoadingCycle.push(require);
            } else {
                var dependencies = require.requires.map(getModule);
                require.onLoad.apply(null, dependencies);
            }
        }

        Imcms.requiresQueue.concat(secondLoadingCycle);
    }

    function checkOnLoad(require) {
        setTimeout(function () {
            console.log("Imcms.modules: ");
            console.log(Imcms.modules);
            console.log("requires: ");
            console.log(require.requires);

            var undefinedRequires = require.requires.filter(function (dependency) {
                return !Imcms.modules[dependency];
            });

            if (undefinedRequires.length) {
                console.log("Still not all deps are loaded:");
                console.log(undefinedRequires);
                return;
            }

            var requires = require.requires.map(function (require2) {
                return Imcms.modules[require2];
            });

            console.log("Resolved deps:");
            console.log(requires);

            require.onLoad.apply(null, requires);
        });
    }

    Imcms.tests = {
        checkRequired: function () {
            Imcms.require("imcms-tests", function (tests) {
                console.log("%c Testing module require", "color: blue;");
                console.assert(tests, "Tests are empty! " + tests);
                return true;
            });
        },
        requireJquery: function () {
            Imcms.require("jquery", function ($) {
                console.log("%c Testing jQuery", "color: blue;");
                console.assert($, "jQuery not loaded!" + $);
                return true;
            });
        },
        requireTwoJqueries: function () {
            Imcms.require(["jquery", "jquery"], function ($1, $2) {
                console.log("%c Testing two dependencies", "color: blue;");
                console.assert($1 === $2, "Two deps not loaded!");
                return true;
            });
        }
    };

    // Imcms.require("imcms-start").init();
})();
