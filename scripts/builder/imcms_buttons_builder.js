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

    function setAttributesTypeButton(attributes) {
        attributes = attributes || {};
        attributes.type = "button";
        return attributes;
    }

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
        close: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["close"]);
        },
        increment: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["increment"]);
        },
        decrement: function (tag, attributes) {
            return buttonsBEM.buildElement("button", tag, attributes, ["decrement"]);
        },
        negativeButton: function (attributes) {
            return this.negative("<button>", setAttributesTypeButton(attributes));
        },
        positiveButton: function (attributes) {
            return this.positive("<button>", setAttributesTypeButton(attributes));
        },
        neutralButton: function (attributes) {
            return this.neutral("<button>", setAttributesTypeButton(attributes));
        },
        saveButton: function (attributes) {
            return this.save("<button>", setAttributesTypeButton(attributes));
        },
        closeButton: function (attributes) {
            return this.close("<button>", setAttributesTypeButton(attributes));
        },
        incrementButton: function (attributes) {
            return this.increment("<button>", setAttributesTypeButton(attributes));
        },
        decrementButton: function (attributes) {
            return this.decrement("<button>", setAttributesTypeButton(attributes));
        },
        container: function (tag, attributesObj, elements) {
            return buttonsBEM.buildBlock(tag, elements, attributesObj, "button");
        }
    }
});
