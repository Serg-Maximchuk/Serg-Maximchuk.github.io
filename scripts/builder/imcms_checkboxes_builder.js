/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-checkboxes-builder", ["imcms-bem-builder", "imcms-primitives-builder"], function (BEM, primitives) {
    var checkboxBEM = new BEM({
            block: "imcms-checkbox",
            elements: {
                "checkbox": ""
            }
        }),
        containerBEM = new BEM({
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
                value: attributes.value
            });

            if (attributes.checked) {
                $input.prop("checked", "checked");
            }

            var $label = primitives.imcmsLabelFromObject({
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
