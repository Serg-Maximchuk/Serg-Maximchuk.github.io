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

    var hexValues = [
        '0', '1', '2', '3',
        '4', '5', '6', '7',
        '8', '9', 'a', 'b',
        'c', 'd', 'e', 'f'
    ];

    function getRandomHex() {
        return hexValues[Math.round(Math.random() * 15)];
    }

    function getRandomHexes(howMany) {
        var hexes = [];
        for (var i = 0; i < howMany; i++) {
            hexes.push(getRandomHex());
        }
        return hexes;
    }

    function generateUUID() {
        var first8 = getRandomHexes(8),
            second4 = getRandomHexes(4),
            third4 = getRandomHexes(4),
            fourth4 = getRandomHexes(4),
            last12 = getRandomHexes(12)
        ;
        // result is something like 550e8400-e29b-41d4-a716-446655440f00
        return [].concat(first8, "-", second4, "-", third4, "-", fourth4, "-", last12)
            .reduce(function (str, hex) {
                return str + hex;
            }, "");
    }

    return {
        checkbox: function (tag, attributes) {
            var id = attributes.id || generateUUID();
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
        container: function (tag, elements, attributes) {
            return containerBEM.buildBlock(tag, elements, attributes, "checkbox");
        }
    }
});
