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

    return {
        negative: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["negative"]);
        },
        positive: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["positive"]);
        },
        neutral: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["neutral"]);
        },
        save: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["save"]);
        },
        container: function (tag, attributesObj, elements) {
            return buttonsBEM.buildBlock(tag, elements, attributesObj, "button");
        }
    }
});
