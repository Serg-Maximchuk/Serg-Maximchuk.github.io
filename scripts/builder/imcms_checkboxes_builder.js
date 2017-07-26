/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-checkboxes-builder", ["imcms-bem-builder", "jquery"], function (bemBuilder, $) {
    var checkboxBEM = new bemBuilder({
            block: "imcms-checkbox",
            elements: {
                "label": "imcms-label",
                "checkbox": ""
            }
        }),
        containerBEM = new bemBuilder({
            block: "imcms-checkboxes",
            elements: {
                "checkbox": "imcms-checkbox"
            }
        })
    ;

    return {
        checkbox: function (tag, attributes) {
            var $input = checkboxBEM.buildElement("checkbox", "<input>", {
                type: "checkbox",
                name: attributes.name,
                id: attributes.id,
                checked: attributes.checked
            });
            var $label = checkboxBEM.buildElement("label", "<label>", {
                "for": attributes.id,
                text: attributes.text,
                click: attributes.click
            });
            return checkboxBEM.buildBlock(tag, [
                {"checkbox": $input},
                {"label": $label}
            ]);
        },
        container: function (tag, attributesObj, elements) {
            return containerBEM.buildBlock(tag, elements, attributesObj, "checkbox");
        }
    }
});
