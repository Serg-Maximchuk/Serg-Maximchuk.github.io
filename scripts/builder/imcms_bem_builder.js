/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-bem-builder", ["jquery"], function ($) {
    var MODIFIER_SEPARATOR = "--",
        BLOCK_SEPARATOR = "__",
        BemBuilder = function (options) {
            this.elements = options.elements;
            this.block = options.block;
        }
    ;

    function getOriginClass(attributesObj) {
        return attributesObj["class"] ? " " + attributesObj["class"] : "";
    }

    BemBuilder.prototype = {
        buildBlockElement: function (elementName, tag, attributesObj, modifiersArr) {
            return this.buildElement.apply(this, arguments).addClass(this.block + BLOCK_SEPARATOR + elementName);
        },
        buildElement: function (elementName, tag, attributesObj, modifiersArr) {
            var modifiers = "";

            (modifiersArr || []).forEach(function (modifier) {
                modifiers += " " + this.elements[elementName] + MODIFIER_SEPARATOR + modifier;
            }.bind(this));

            attributesObj = attributesObj || {};
            attributesObj["class"] = this.elements[elementName] + modifiers + getOriginClass(attributesObj);

            return $(tag, attributesObj);
        },
        buildBlock: function (tag, elements, attributesObj, blockNameForEach) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = this.block + getOriginClass(attributesObj);

            elements = elements.map(function (element) {
                var elementName, $element, modifier = undefined;

                if (blockNameForEach) {
                    elementName = blockNameForEach;
                    $element = element;
                } else {
                    var elementKeys = Object.keys(element);
                    elementName = elementKeys[0];
                    modifier = elementKeys[1];
                    $element = element[elementName];
                }

                var blockClass = this.block + BLOCK_SEPARATOR + elementName,
                    modifierClass = (modifier ? " " + blockClass + MODIFIER_SEPARATOR + modifier : "")
                ;

                return $element.addClass(blockClass).addClass(modifierClass);
            }.bind(this));

            return $(tag, attributesObj).append(elements);
        }
    };

    return BemBuilder;
});
