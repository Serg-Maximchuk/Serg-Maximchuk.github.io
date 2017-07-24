/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-bem-builder", ["jquery"], function ($) {
    var BemBuilder = function (options) {
        this.element = options.element;
        this.block = options.block;
    };

    function getOriginClass(attributesObj) {
        return attributesObj["class"] ? " " + attributesObj["class"] : "";
    }

    BemBuilder.prototype = {
        buildElement: function (tag, modifiersArr, attributesObj) {
            var modifiers = "";

            modifiersArr.forEach(function (modifier) {
                modifiers += " " + this.element.name + "--" + modifier;
            }.bind(this));

            attributesObj = attributesObj || {};
            attributesObj["class"] = this.element.name + modifiers + getOriginClass(attributesObj);

            return $(tag, attributesObj);
        },
        buildBlock: function (tag, attributesObj, elements) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = this.block + getOriginClass(attributesObj);

            elements = elements.map(function (element) {
                return element.addClass(this.block + "__" + this.element.block);
            }.bind(this));

            return $(tag, attributesObj).append(elements);
        }
    };

    return BemBuilder;
});
