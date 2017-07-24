/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-buttons-builder", ["jquery"], function ($) {
    var buttonsClass = "imcms-button",
        containerClass = "imcms-buttons";

    function buttonBuilder(buttonType) {
        return function (tag, attributesObj) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = buttonsClass + " " + buttonsClass + "--" + buttonType
                + (attributesObj["class"] ? " " + attributesObj["class"] : "");

            return $(tag, attributesObj);
        };
    }

    return {
        "class": buttonsClass,
        "container-class": containerClass,
        negative: buttonBuilder("negative"),
        positive: buttonBuilder("positive"),
        neutral: buttonBuilder("neutral"),
        save: buttonBuilder("save"),
        container: function (tag, attributesObj, elements) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = containerClass + (attributesObj["class"] ? " " + attributesObj["class"] : "");

            elements = elements.map(function (element) {
                return element.addClass(containerClass + "__button");
            });

            return $(tag, attributesObj).append(elements);
        }
    }
});
