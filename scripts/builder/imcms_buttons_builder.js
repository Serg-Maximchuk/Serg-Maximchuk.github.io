/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-buttons-builder", ["imcms-bem-builder"], function (bemBuilder) {
    var buttonsBEM = new bemBuilder({
        block: "imcms-buttons",
        elements: {
            "button": "imcms-button"
        }
    });

    function buttonBuilder(buttonType) {
        return function (tag, attributesObj) {
            return buttonsBEM.buildElement("button", tag, attributesObj, [buttonType]);
        };
    }

    return {
        negative: buttonBuilder("negative"),
        positive: buttonBuilder("positive"),
        neutral: buttonBuilder("neutral"),
        save: buttonBuilder("save"),
        container: function (tag, attributesObj, elements) {
            return buttonsBEM.buildBlock(tag, elements, attributesObj, "button");
        }
    }
});
