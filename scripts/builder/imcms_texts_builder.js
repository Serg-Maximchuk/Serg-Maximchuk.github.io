/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 26.07.17.
 */
Imcms.define("imcms-texts-builder", ["imcms-bem-builder", "jquery"], function (BEM, $) {
    var textBEM = new BEM({
        block: "imcms-text-box",
        elements: {
            "label": "imcms-label",
            "input": "imcms-input"
        }
    });

    return {
        fixedSizeText: function (tag, attributes) {
            var $label = textBEM.buildElement("label", "<label>", {
                    "for": attributes.id,
                    text: attributes.text
                }),
                $input = textBEM.buildElement("input", "<input>", {
                    id: attributes.id,
                    type: "text",
                    name: attributes.name,
                    placeholder: attributes.placeholder
                })
            ;

            return textBEM.buildBlock("<div>", [
                {"label": $label},
                {"input": $input}
            ]);
        },
        text: function (tag, attributes) {
            return this.fixedSizeText.apply(this, arguments).addClass("imcms-field");
        }
    }
});
