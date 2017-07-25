/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-bem-builder", ["jquery"], function ($) {
    var BemBuilder = function (options) {
        this.elements = options.elements;
        this.block = options.block;
    };

    function getOriginClass(attributesObj) {
        return attributesObj["class"] ? " " + attributesObj["class"] : "";
    }

    BemBuilder.prototype = {
        buildElement: function (elementName, tag, modifiersArr, attributesObj) {
            var modifiers = "";

            modifiersArr.forEach(function (modifier) {
                modifiers += " " + this.elements[elementName] + "--" + modifier;
            }.bind(this));

            attributesObj = attributesObj || {};
            attributesObj["class"] = this.elements[elementName] + modifiers + getOriginClass(attributesObj);

            return $(tag, attributesObj);
        },
        buildBlock: function (tag, attributesObj, elements, blockNameForEach) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = this.block + getOriginClass(attributesObj);

            elements = elements.map(function (element) {
                var elementName, $element;

                if (blockNameForEach) {
                    elementName = blockNameForEach;
                    $element = element;
                } else {
                    elementName = Object.keys(element)[0];
                    $element = element[elementName];
                }

                return $element.addClass(this.block + "__" + elementName);
            }.bind(this));

            return $(tag, attributesObj).append(elements);
        }
    };

    return BemBuilder;
});
