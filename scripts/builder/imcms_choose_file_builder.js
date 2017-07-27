/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 26.07.17.
 */
Imcms.define("imcms-choose-file-builder", ["imcms-bem-builder"], function (BEM) {
    var buttonBEM = new BEM({
        block: "imcms-button",
        elements: {
            "item": ""
        }
    });

    var chooseFileBEM = new BEM({
        block: "imcms-choose-file",
        elements: {
            "button": "imcms-button",
            "file-name": ""
        }
    });

    return {
        container: function (tag, attributes) {
            var $input = buttonBEM.buildElement("item", "<div>", {
                    id: attributes.id,
                    name: attributes.name,
                    type: "file"
                }, ["invisible"]),

                $label = buttonBEM.buildBlock("<label>", [{"item": $input}], {
                    "for": attributes.id
                }),

                $fileName = chooseFileBEM.buildElement("file-name", "<span>");

            return chooseFileBEM.buildBlock("<div>", [
                {"button": $label},
                {"file-name": $fileName}
            ]);
        }
    }
});
