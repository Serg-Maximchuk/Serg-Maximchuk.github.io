/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-checkboxes-builder",
    ["imcms-bem-builder", "imcms-primitives-builder", "imcms-uuid-generator"],
    function (BEM, primitives, uuidGenerator) {
        var checkboxBEM = new BEM({
                block: "imcms-checkbox",
                elements: {
                    "checkbox": ""
                }
            }),
            containerBEM = new BEM({
                block: "imcms-checkboxes",
                elements: {
                    "checkbox": "imcms-checkbox",
                    "title": "imcms-title"
                }
            })
        ;

        return {
            imcmsCheckbox: function (tag, attributes) {
                var id = attributes.id || uuidGenerator.generateUUID();
                var $input = checkboxBEM.buildElement("checkbox", "<input>", {
                    type: "checkbox",
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
                return checkboxBEM.buildBlock(tag, [
                    {"checkbox": $input},
                    {"label": $label}
                ]);
            },
            checkboxContainer: function (tag, elements, attributes) {
                elements = elements.map(function (element) {
                    return {"checkbox": element};
                });

                if (attributes && attributes.title) {
                    var $title = containerBEM.buildElement("title", "<div>", {text: attributes.title});
                    elements.unshift({"title": $title});
                }

                return containerBEM.buildBlock(tag, elements, attributes);
            },
            checkboxContainerField: function (tag, elements, attributes) {
                var checkboxesFieldBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "checkboxes": "imcms-checkboxes"
                    }
                });

                var $checkboxContainer = this.checkboxContainer("<div>", elements, attributes);
                return checkboxesFieldBEM.buildBlock(tag, [{"checkboxes": $checkboxContainer}]);
            }
        }
    }
);
