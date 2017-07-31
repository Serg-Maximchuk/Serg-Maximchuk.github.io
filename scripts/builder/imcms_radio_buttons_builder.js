/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 25.07.17.
 */
Imcms.define("imcms-radio-buttons-builder",
    ["imcms-bem-builder", "imcms-primitives-builder"],
    function (bemBuilder, primitives) {
        var radioBEM = new bemBuilder({
                block: "imcms-radio",
                elements: {}
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
                var $input = primitives.imcmsInputRadio({
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
                return radioBEM.buildBlock(tag, [
                    {"input": $input},
                    {"label": $label}
                ]);
            },
            container: function (tag, attributesObj, elements) {
                return containerBEM.buildBlock(tag, elements, attributesObj, "radio");
            }
        }
    }
);
