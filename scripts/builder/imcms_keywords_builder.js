/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 27.07.17.
 */
Imcms.define("imcms-keywords-builder",
    ["imcms-bem-builder", "imcms-texts-builder", "imcms-buttons-builder"],
    function (BEM, texts, buttons) {
        var keywordsContainerBEM = new BEM({
                block: "imcms-field",
                elements: {
                    "keyword": "imcms-keyword"
                }
            }),
            keywordsBoxBEM = new BEM({
                block: "imcms-keyword",
                elements: {
                    "label": "imcms-label",
                    "input": "imcms-input",
                    "button": "imcms-button",
                    "filters": "",
                    "filter": ""
                }
            })
        ;

        return {
            keywordsBox: function (tag, attributes) {
                var $label = keywordsBoxBEM.buildElement("label", "<label>", {
                        "for": attributes["input-id"],
                        text: attributes.title
                    }),
                    $input = keywordsBoxBEM.buildElement("input", "<input>", {
                        type: "text",
                        id: attributes["input-id"], // todo: it would be great to generate unique id if not specified
                        placeholder: attributes.placeholder
                    }),
                    $addKeywordButton = buttons.neutral("<button>", {
                        type: "button",
                        text: attributes["button-text"]
                    }),
                    $filtersContainer = keywordsBoxBEM.buildElement("filters", "<div>"),
                    $keywordsBox = keywordsBoxBEM.buildBlock("<div>", [
                        {"label": $label},
                        {"input": $input},
                        {"button": $addKeywordButton},
                        {"filters": $filtersContainer}
                    ])
                ;
                return keywordsContainerBEM.buildBlock("<div>", [{"keyword": $keywordsBox}])
            }
        };
    }
);
