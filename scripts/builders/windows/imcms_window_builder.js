/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-window-builder", ["imcms-window-components-builder", "jquery"], function (windowComponents, $) {

    function setBodyScrollingRule(overflowValue) {
        $("body").css("overflow", overflowValue);
    }

    var scrollTop = 0;

    function disableBackgroundPageScrolling() {
        scrollTop = $(window).scrollTop();
        setBodyScrollingRule("hidden");
        $(window).scrollTop(0);
    }

    function enableBackgroundPageScrolling() {
        setBodyScrollingRule("auto");
        $(window).scrollTop(scrollTop);
        scrollTop = 0;
    }

    var WindowBuilder = function (opts) {
        this.factory = opts.factory;
        this.loadDataStrategy = opts.loadDataStrategy;
        this.clearDataStrategy = opts.clearDataStrategy;
        this.$editor = undefined;
    };

    WindowBuilder.prototype = {
        buildWindow: function (windowInitData) {
            disableBackgroundPageScrolling();

            if (!this.$editor) {
                this.$editor = this.factory(windowInitData).appendTo("body");
            }

            this.loadDataStrategy && this.loadDataStrategy.applyAsync(arguments);
            this.$editor.css("display", "block");
        },
        closeWindow: function () {
            enableBackgroundPageScrolling();
            this.$editor.css("display", "none");
            this.clearDataStrategy && this.clearDataStrategy.call();
        },
        buildHead: function (title) {
            return windowComponents.buildHead(title, this.closeWindow.bind(this));
        },
        buildFooter: function (buttons) {
            return windowComponents.buildFooter.apply(windowComponents, arguments);
        }
    };

    return WindowBuilder;
});
