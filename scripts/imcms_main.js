console.time("imCMS JS loaded");
Imcms = {
    loadedDependencies: {},
    dependencyTree: {
        imcms: []
    },
    requiresQueue: [],
    config: {
        basePath: "scripts",
        dependencies: {
            "jquery": {
                path: "//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",
                init: function ($) {
                    return $.noConflict(true);
                }
            },
            "jquery-mask": {
                path: "./libs/jquery.mask.min.js",
                addon: "jquery-mask"
            },
            "jquery-ui": {
                path: "//ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/jquery-ui.min.js",
                addon: "jquery-ui"
            },
            // todo: support local modules without defining their paths directly!
            "imcms-flags": "imcms_flags.js",
            "imcms-date-picker": "imcms_date_picker.js",
            "imcms-calendar": "imcms_calendar.js",
            "imcms-time-picker": "imcms_time_picker.js",
            "imcms-tests": "imcms_tests.js",
            "imcms-initialize": "imcms_initialize.js",
            "imcms-select": "imcms_select.js",
            "imcms-numberbox": "imcms_numberbox.js",
            "imcms-keyword": "imcms_keyword.js",
            "imcms-rest": "imcms_rest.js",
            "imcms-modal-window": "modal_window/imcms_modal_window.js",
            "imcms-admin-panel": "admin/imcms_admin_panel.js",
            "imcms-pop-up": "admin/imcms_pop_up.js",
            "imcms-folders": "choose_img/imcms_folders.js",
            "imcms-choose-image": "choose_img/imcms_choose_img.js",
            "imcms-content-manager": "choose_img/imcms_content_manager.js",
            // editors
            "imcms-image-editor-crop": "image_editor/imcms_image_editor_crop.js",
            "imcms-image-editor-bottom-panel": "image_editor/imcms_image_editor_bottom_panel.js",
            "imcms-image-editor": "image_editor/imcms_image_editor.js",
            "imcms-menu-editor": "menu_editor/imcms_menu_editor.js",
            // builders
            "imcms-components-builder": "imcms_components_builder.js",
            "imcms-buttons-builder": "builder/imcms_buttons_builder.js",
            "imcms-flags-builder": "builder/imcms_flags_builder.js",
            "imcms-bem-builder": "builder/imcms_bem_builder.js",
            "imcms-checkboxes-builder": "builder/imcms_checkboxes_builder.js",
            "imcms-radio-buttons-builder": "builder/imcms_radio_buttons_builder.js",
            "imcms-selects-builder": "builder/imcms_selects_builder.js",
            "imcms-texts-builder": "builder/imcms_texts_builder.js",
            "imcms-choose-image-builder": "builder/imcms_choose_image_builder.js",
            "imcms-keywords-builder": "builder/imcms_keywords_builder.js",
            "imcms-primitives-builder": "builder/imcms_primitives_builder.js",
            "imcms-date-time-builder": "builder/imcms_date_time_builder.js"
        }
    }
};
Imcms.modules = {
    imcms: Imcms // default module
};
Function.prototype.bindArgs = function () {
    return this.bind.apply(this, [null].concat(Array.prototype.slice.call(arguments)));
};
Function.prototype.applyAsync = function (args, context) {
    setTimeout(this.apply.bind(this, context, args));
};
(function () {
    function registerModule(id, module) {
        console.log("Registering module " + id);
        if (Imcms.modules[id]) {
            console.error("Module already registered! " + id);
            return;
        }

        if (Imcms.config.dependencies[id] && Imcms.config.dependencies[id].init) {
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

    function loadModuleAsync(path) {
        setTimeout(appendScript.bindArgs(path));
    }

    function loadScriptAsync(dependency) {
        var onLoad;

        if (dependency.addon) {
            onLoad = registerModule.bindArgs(dependency.addon, true);
        }

        setTimeout(getScript.bindArgs(dependency.path, onLoad));
    }

    function loadDependencyById(id) {
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
                if (dependency.indexOf(".") !== 0) {
                    dependency = Imcms.config.basePath + "/" + dependency;
                }
                loader = loadModuleAsync;
                break;
            }
            case "object": {
                loader = loadScriptAsync;
            }
        }

        loader(dependency);
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
                var response = eval(ajaxRequest.responseText);
                callback && callback(response);

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
                    callback && callback.call();
                }
            };
        } else {  // Other normal browsers
            script.onload = function () {
                console.info('module ' + url + " loaded successfully.");
                callback && callback.call();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
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
            switch (resolvedArgs[1] && resolvedArgs[1].constructor) {
                case Array : // dependencies are presented, nothing to change
                    break;

                case Function : // independent module and dependencies are not presented
                    var factory = resolvedArgs[1];
                    resolvedArgs[1] = []; // empty dependencies array
                    resolvedArgs[2] = factory;
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

    /**
     * AMD define function.
     * Defines module by it's (optional) id with (optional) dependencies
     * by calling factory function after dependencies load.
     *
     * @param {string?} id defined module id
     * @param {[]?} dependencies array as module ids
     * @param {function} factory which return is this defined module in result
     */
    Imcms.define = function (id, dependencies, factory) {
        define.apply(null, arguments);
    };
    /**
     * AMD require function.
     *
     * @param {string|[string]} id required module id(s)
     * @param {function} onLoad function that will be called with loaded required modules
     */
    Imcms.require = function (id, onLoad) {
        registerRequires(id, onLoad);
        setTimeout(runModuleLoader);
    };

    function addToDependencyTree(id, dependencies) {
        if (Imcms.dependencyTree[id]) {
            console.error("Dependency " + id + " already registered! Redundant define function calling!");
        }
        Imcms.dependencyTree[id] = dependencies;
    }

    function defineModule(id, dependencies, factory) {
        if (id) {
            addToDependencyTree(id, dependencies);
        }

        Imcms.require(dependencies, function () {
            var module = factory.apply(null, arguments);
            if (id) { // register only not anonymous modules
                registerModule(id, module);
            }
        });
    }

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
                    undefinedRequires.forEach(loadDependencyById);
                    delayedAddToQueue(require);

                } else if (failsCount < 1000) {// dummy fail limit
                    failsCount++;
                    delayedAddToQueue(require);

                } else {
                    console.error("Failed to load dependency:");
                    console.error(require);
                }
            } else {
                failsCount = 0;
                var dependencies = require.requires.map(getModule);
                require.onLoad.applyAsync(dependencies);
            }
        }
    }

    function getMainScriptPath() {
        var imcmsMainScripts = Array.prototype.slice.apply(document.scripts).filter(function(script){
            return script.attributes["data-name"] && script.attributes["data-name"].value === "imcms";
        });

        if (!imcmsMainScripts || imcmsMainScripts.length === 0) {
            console.error("Not founded entry point for imCMS JS engine.\n" +
                "Should be script tag with attribute data-name=\"imcms\" and attribute data-main with path to script " +
                "to load as entry point.");
            return;
        }

        if (imcmsMainScripts.length !== 1) {
            console.error("Founded more than one entry points.");
            console.error(imcmsMainScripts);
            return;
        }

        var mainScriptPath = imcmsMainScripts[0].attributes["data-main"].value;
        console.info("Founded entry point " + mainScriptPath);
        return mainScriptPath;
    }

    var mainScriptPath = getMainScriptPath();
    loadModuleAsync(mainScriptPath);
})();
