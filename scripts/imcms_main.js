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
