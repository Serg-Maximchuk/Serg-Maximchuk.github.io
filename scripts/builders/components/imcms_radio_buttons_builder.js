/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 25.07.17.
 */
Imcms.define("imcms-radio-buttons-builder",
    ["imcms-bem-builder", "imcms-primitives-builder", "imcms-uuid-generator"],
    function (bemBuilder, primitives, uuidGenerator) {
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
            imcmsRadio: function (tag, attributes) {
                var id = attributes.id || uuidGenerator.generateUUID(),
                    $input = primitives.imcmsInputRadio({
                        name: attributes.name,
                        id: id,
                        value: attributes.value
                    });

                if (attributes.checked) {
                    $input.prop("checked", "checked");
                }

                var $label = primitives.imcmsLabelFromObject({
                    "for": id,
                    text: attributes.text,
                    click: attributes.click
                });
                var buildBlock = radioBEM.buildBlock(tag, [
                    {"input": $input},
                    {"label": $label}
                ]);

                buildBlock.setChecked = function (isChecked) {
                    isChecked ? $input.prop("checked", "checked") : $input.removeProp("checked");
                    return this;
                };

                return buildBlock;
            },
            group: function () {
                var args = arguments;

                return {
                    checkAmongGroup: function (value) {
                        Array.prototype.forEach.call(args, function (radioBlock) {
                            var $radio = radioBlock.find("input");
                            $radio.val() === value && $radio.prop("checked", "checked");
                        });
                    }
                };
            },
            radioContainer: function (tag, elements, attributes) {
                return containerBEM.buildBlock(tag, elements, attributes, "radio");
            }
        }
    }
);
