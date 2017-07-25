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
        // "imcms-buttons": [{
        //     "button": "imcms-button"
        // }]
        // element: {
        //     name: "imcms-button",
        //     block: "button"
        // }
    });

    function buttonBuilder(buttonType) {
        return function (tag, attributesObj) {
            return buttonsBEM.buildElement("button", tag, [buttonType], attributesObj);
        };
    }

    return {
        negative: buttonBuilder("negative"),
        positive: buttonBuilder("positive"),
        neutral: buttonBuilder("neutral"),
        save: buttonBuilder("save"),
        container: function (tag, attributesObj, elements) {
            elements = elements.map(function (element) {
                return {"button": element};
            });
            return buttonsBEM.buildBlock(tag, attributesObj, elements);
        }
    }
});
