/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 27.07.17.
 */
Imcms.define("imcms-keywords-builder",
    ["imcms-bem-builder", "imcms-texts-builder", "imcms-buttons-builder", "jquery"],
    function (BEM, texts, buttons, $) {
        function createRemoveKeywordButton() {
            return buttons.close("<button>", {
                type: "button",
                click: removeKeyword
            });
        }

        function addKeyword() {
            var $btn = $(this),
                keywordInput = $btn.parent().find(".imcms-keyword__input"),
                keywordInputVal = keywordInput.val().trim(),
                keywords = $btn.parent().find(".imcms-keyword__keywords")
            ;

            keywordInput.val("");

            if (keywordInputVal !== "") {
                keywords.css({"display": "block"});

                keywordsBoxBEM.buildBlockElement("keyword", "<div>", {
                    text: keywordInputVal
                }).append(createRemoveKeywordButton()).appendTo(keywords);
            }
        }

        function removeKeyword() {
            var $btn = $(this),
                keyword = $btn.parents(".imcms-keyword__keyword"),
                keywords = keyword.parent()
            ;

            keyword.remove();
            if (keywords.children().length === 0) {
                keywords.css({"display": "none"})
            }
        }

        var keywordsContainerBEM = new BEM({
                block: "imcms-field",
                elements: {
                    "keywords-box": "imcms-keyword"
                }
            }),
            keywordsBoxBEM = new BEM({
                block: "imcms-keyword",
                elements: {
                    "label": "imcms-label",
                    "input": "imcms-input",
                    "button": "imcms-button",
                    "keywords": "",
                    "keyword": ""
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
                    }, ["wide"]),
                    $addKeywordButton = buttons.neutral("<button>", {
                        type: "button",
                        text: attributes["button-text"],
                        click: addKeyword
                    }),
                    $keywordsContainer = keywordsBoxBEM.buildElement("keywords", "<div>"),
                    $keywordsBox = keywordsBoxBEM.buildBlock("<div>", [
                        {"label": $label},
                        {"input": $input},
                        {"button": $addKeywordButton},
                        {"keywords": $keywordsContainer}
                    ])
                ;
                return keywordsContainerBEM.buildBlock("<div>", [{"keywords-box": $keywordsBox}])
            }
        };
    }
);
