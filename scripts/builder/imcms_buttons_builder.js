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

    function buildButtonElement(tag, attributes, modifier) {
        return buttonsBEM.buildElement("button", tag, attributes, [modifier]);
    }

    return {
        negative: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "negative");
        },
        positive: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "positive");
        },
        neutral: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "neutral");
        },
        save: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "save");
        },
        close: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "close");
        },
        increment: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "increment");
        },
        decrement: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "decrement");
        },
        prev: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "prev");
        },
        next: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "next");
        },
        dropDown: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "drop-down");
        },
        search: function (tag, attributes) {
            return buildButtonElement(tag, attributes, "search");
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
        prevButton: function (attributes) {
            return this.prev("<button>", setAttributesTypeButton(attributes));
        },
        nextButton: function (attributes) {
            return this.next("<button>", setAttributesTypeButton(attributes));
        },
        dropDownButton: function (attributes) {
            return this.dropDown("<button>", setAttributesTypeButton(attributes));
        },
        searchButton: function (attributes) {
            return this.search("<button>", setAttributesTypeButton(attributes));
        },
        buttonsContainer: function (tag, elements, attributes) {
            return buttonsBEM.buildBlock(tag, elements, attributes, "button");
        }
    }
});
