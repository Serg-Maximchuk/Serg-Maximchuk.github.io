/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-window-builder", ["imcms-window-components-builder"], function (windowComponents) {
    var WindowBuilder = function (opts) {
        this.factory = opts.factory;
        this.loadDataStrategy = opts.loadDataStrategy;
        this.clearDataStrategy = opts.clearDataStrategy;
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
            this.clearDataStrategy && this.clearDataStrategy.call();
        },
        buildHead: function (title) {
            return windowComponents.buildHead(title, this.closeWindow.bind(this));
        },
        buildFooter: function (buttons) {
            return windowComponents.apply(windowComponents, arguments);
        }
    };

    return WindowBuilder;
});
