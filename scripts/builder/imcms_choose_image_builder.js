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
                "text-box": "imcms-text-box",
                "button": "imcms-button"
            }
        });

        return {
            container: function (tag, attributes) {
                var $textBox = texts.text("<div>", {
                        id: attributes.id,
                        name: attributes.name,
                        text: attributes["label-text"],
                        placeholder: attributes.placeholder
                    }),

                    $chooseImageButton = buttons.neutral("<button>", {
                        text: attributes["button-text"]
                    });

                return chooseImageBEM.buildBlock("<div>", [
                    {"text-box": $textBox},
                    {"button": $chooseImageButton}
                ]);
            }
        }
    }
);
