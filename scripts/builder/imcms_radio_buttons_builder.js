/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 25.07.17.
 */
Imcms.define("imcms-radio-buttons-builder", ["imcms-bem-builder", "jquery"], function (bemBuilder, $) {
    var radioBEM = new bemBuilder({
            block: "imcms-radio",
            elements: {
                "label": "imcms-label",
                "input": "imcms-input"
            }
        }),
        containerBEM = new bemBuilder({
            block: "imcms-radios",
            elements: {
                "radio": "imcms-radio"
            }
        })
    ;

    return {
        radio: function (tag, attributes) {
            var $input = radioBEM.buildElement("input", "<input>", [], {
                type: "radio",
                name: attributes.name,
                id: attributes.id,
                checked: attributes.checked
            });
            var $label = radioBEM.buildElement("label", "<label>", [], {
                "for": attributes.id,
                text: attributes.text,
                click: attributes.click
            });
            return radioBEM.buildBlock(tag, {}, [
                {"input": $input},
                {"label": $label}
            ]);
        },
        container: function (tag, attributesObj, elements) {
            return containerBEM.buildBlock(tag, attributesObj, elements, "radio");
        }
    }
});