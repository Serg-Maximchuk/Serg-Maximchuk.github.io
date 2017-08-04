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

    function getElementClassWithModifiers(elementClass, modifiersArr) {
        return elementClass + getModifiersClass(elementClass, modifiersArr);
    }

    function getModifiersClass(baseClass, modifiersArr) {
        var modifiers = "";

        (modifiersArr || []).forEach(function (modifier) {
            modifiers += " " + baseClass + MODIFIER_SEPARATOR + modifier;
        });

        return modifiers;
    }

    BemBuilder.prototype = {
        makeBlockElement: function (elementName, $baseElement, modifiersArr) {
            var modifiersClass = getElementClassWithModifiers(this.elements[elementName], modifiersArr),
                blockClass = this.block + BLOCK_SEPARATOR + elementName
            ;

            return $baseElement.addClass(blockClass).addClass(modifiersClass);
        },
        buildBlockElement: function (elementName, tag, attributesObj, modifiersArr) {
            return this.buildElement.apply(this, arguments).addClass(this.block + BLOCK_SEPARATOR + elementName);
        },
        buildElement: function (elementName, tag, attributesObj, modifiersArr) {
            var modifiersClass = getElementClassWithModifiers(this.elements[elementName], modifiersArr);

            attributesObj = attributesObj || {};
            attributesObj["class"] = modifiersClass + getOriginClass(attributesObj);

            return $(tag, attributesObj);
        },
        buildBlock: function (tag, elements, attributesObj, blockNameForEach) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = this.block + getOriginClass(attributesObj);

            elements = elements.map(function (element) {
                var elementName, $element;

                if (blockNameForEach) {
                    elementName = blockNameForEach;
                    $element = element;
                } else {
                    var elementKeys = Object.keys(element);
                    elementName = elementKeys[0];
                    $element = element[elementName];
                }

                var blockClass = this.block + BLOCK_SEPARATOR + elementName;

                if (element.modifiers) {
                    var modifiersClass = getModifiersClass(blockClass, element.modifiers);
                    $element.addClass(modifiersClass);
                }

                return $element.addClass(blockClass);

            }.bind(this));

            return $(tag, attributesObj).append(elements);
        }
    };

    return BemBuilder;
});
