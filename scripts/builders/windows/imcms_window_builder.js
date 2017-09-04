/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-window-builder", [], function () {
    var WindowBuilder = function (opts) {
        this.factory = opts.factory;
        this.loadDataStrategy = opts.loadDataStrategy;
        this.$editor = undefined;
    };

    WindowBuilder.prototype = {
        buildWindow: function (windowInitData) {
            if (!this.$editor) {
                this.$editor = this.factory(windowInitData).appendTo("body");
            }

            this.loadDataStrategy.applyAsync(arguments);
            this.$editor.css("display", "block");
        },
        closeWindow: function () {
            this.$editor.css("display", "none");
        }
    };

    return WindowBuilder;
});
