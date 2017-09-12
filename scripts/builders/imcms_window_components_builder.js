/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-window-components-builder", ["imcms-bem-builder", "imcms-components-builder"], function (BEM, components) {
    return {
        buildHead: function (title, onCloseClick) {
            return new BEM({
                block: "imcms-head",
                elements: {
                    "title": components.texts.titleText("<div>", title),
                    "button": components.buttons.closeButton({click: onCloseClick})
                }
            }).buildBlockStructure("<div>");
        },
        buildFooter: function (buttons) {
            var elements = {};

            if (buttons) {
                elements.buttons = components.buttons.buttonsContainer("<div>", buttons);
            }

            return new BEM(
                {
                    block: "imcms-footer",
                    elements: elements
                }
            ).buildBlockStructure("<div>");
        }
    };
});
