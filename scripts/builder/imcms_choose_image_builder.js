/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 26.07.17.
 */
Imcms.define("imcms-choose-image-builder",
    ["imcms-bem-builder", "imcms-texts-builder", "imcms-buttons-builder"],
    function (BEM, texts, buttons) {
        var chooseImageBEM = new BEM({
            block: "imcms-choose-image",
            elements: {
                "text-box": "imcms-text-box"
            }
        });

        return {
            container: function (tag, attributes) {
                var $textBox = texts.textField("<div>", {
                        id: attributes.id,
                        name: attributes.name,
                        text: attributes["label-text"],
                        placeholder: attributes.placeholder
                    }),

                    $chooseImageButton = buttons.neutral("<button>", {
                        text: attributes["button-text"],
                        click: attributes.click || function () {
                            console.info("%c Not implemented feature: open image choose window.", "color: red;");
                        }
                    });

                return chooseImageBEM.buildBlock("<div>", [
                    {"text-box": $textBox},
                    {"button": $chooseImageButton}
                ]);
            }
        }
    }
);
