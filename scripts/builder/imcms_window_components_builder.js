/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-window-components-builder", ["imcms-bem-builder", "imcms-components-builder"], function (BEM, components) {
    return {
        buildHead: function (title, onCloseClick) {
            var headBEM = new BEM({
                block: "imcms-head",
                elements: {
                    "title": "imcms-title",
                    "button": ""
                }
            });

            var $title = headBEM.buildElement("title", "<div>", {text: title});
            var $closeBtn = components.buttons.closeButton({click: onCloseClick});

            return headBEM.buildBlock("<div>", [
                {"title": $title},
                {"button": $closeBtn}
            ]);
        }
    };
});
