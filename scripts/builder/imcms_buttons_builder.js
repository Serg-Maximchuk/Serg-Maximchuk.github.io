/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-buttons-builder", ["imcms-bem-builder"], function (bemBuilder) {
    var buttonsBEM = new bemBuilder({
        block: "imcms-buttons",
        element: {
            name: "imcms-button",
            block: "button"
        }
    });

    function buttonBuilder(buttonType) {
        return function (tag, attributesObj) {
            return buttonsBEM.buildElement(tag, [buttonType], attributesObj);
        };
    }

    return {
        negative: buttonBuilder("negative"),
        positive: buttonBuilder("positive"),
        neutral: buttonBuilder("neutral"),
        save: buttonBuilder("save"),
        container: buttonsBEM.buildBlock.bind(buttonsBEM)
    }
});
