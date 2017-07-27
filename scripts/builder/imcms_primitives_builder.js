/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 27.07.17.
 */
Imcms.define("imcms-primitives-builder", ["jquery"], function ($) {
    return {
        imcmsLabel: function (idFor, text, attributes) {
            attributes = attributes || {};
            attributes["for"] = idFor;
            attributes.text = text;

            return this.imcmsLabelFromObject(attributes);
        },
        imcmsLabelFromObject: function (attributes) {
            attributes = attributes || {};
            return $("<label>", attributes).addClass("imcms-label");
        }
    }
});
