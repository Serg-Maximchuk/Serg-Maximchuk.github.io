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
