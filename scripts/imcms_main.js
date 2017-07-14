(function () {
    Function.prototype.bindArgsArray = function (argsArray, context) {
        return function () {
            this.apply(context, argsArray);
        }.bind(this);
    };

    var modulesQueue = [],
        failsCounter = 0;

    /**
     * AMD interface function to catch only imcms-configured modules
     */
    function define() {
        var anonymousModuleId = undefined,
            depsForIndependentModule = [],
            unresolvedArgs = Array.prototype.slice.call(arguments),
            resolvedArgs;

        switch (arguments[0].constructor) {
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
                return;
        }

        Imcms.define.apply(Imcms, resolvedArgs);
    }

    define.amd = {};

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

    Imcms = {
        dependencies: {
            paths: {
                "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
                "jquery-mask": "./libs/jquery.mask.min.js"
            }
        },
        getScript: function (url, callback, async) {
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
        },
        /**
         * AMD define function.
         * Defines module by it's (optional) id with (optional) dependencies
         * by calling factory function after dependencies load.
         *
         * @param {string?} id defined module id
         * @param {[]?} dependencies as module ids
         * @param factory which return is this defined module in result
         */
        define: function (id, dependencies, factory) {
            var modules = dependencies.map(this.require.bind(this));

            if (modules.indexOf(undefined) === -1) {
                // means all modules are loaded or independent module
                var factoryResult;
                failsCounter = 0;

                if (Imcms.dependencies.paths[id]) {
                    var path = Imcms.dependencies.paths[id];
                    delete Imcms.dependencies.paths[id];
                    Imcms.getScript(path, factory.bindArgsArray(modules));

                } else {
                    factoryResult = factory.apply(null, modules);
                }

                if (id && factoryResult) {
                    // register only non-anonymous modules
                    Imcms.modules[id] = factoryResult;
                }

                var dependencyToDefineNext = modulesQueue.shift();
                dependencyToDefineNext && setTimeout(Imcms.define.bindArgsArray(dependencyToDefineNext, Imcms));

            } else if (failsCounter < 10) {
                // means not all dependencies are loaded yet, try to load next one
                modulesQueue.push(arguments);
                failsCounter++;
                var dependencyToDefine = modulesQueue.shift();
                setTimeout(Imcms.define.bindArgsArray(dependencyToDefine, Imcms), 50);

            } else {
                console.error("Error while loading modules and their dependencies!");
                console.error(modulesQueue);
            }
        },
        /**
         * AMD require function.
         * Call only if you are sure that required module loaded!
         *
         * @param {string} id required module id
         * @returns {*} required module
         */
        require: function (id) {
            return this.modules[id];
        }
    };
    Imcms.modules = {
        imcms: Imcms // default module
    };
})();
