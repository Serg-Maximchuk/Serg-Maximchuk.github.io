Imcms.define("imcms-keyword", ["jquery"], function ($) {

    function addKeyword(event) {
        var $btn = $(this),
            keywordInput = $btn.parent().find(".imcms-text-box__input"),
            keywordInputVal = keywordInput.val(),
            keywords = $btn.parent().find(".imcms-keyword__filters")
        ;

        if (keywords.children().length === 0) {
            keywords.css({"display": "block"})
        }

        if (keywordInputVal === "" && keywords.children().length === 0) {
            event.preventDefault();
            keywords.css({"display": "none"})
        }

        if (keywordInputVal === "") {
            event.preventDefault();

        } else {
            $("<div>", {
                "class": "imcms-keyword__filter",
                html: $("<button>", {
                    type: "button",
                    "class": "imcms-button imcms-button--close",
                    click: removeKeyword
                })
            }).prepend(keywordInputVal).appendTo(keywords);
        }

        keywordInput.val("");
    }

    function removeKeyword() {
        var $btn = $(this),
            keyword = $btn.parents(".imcms-keyword__filter"),
            keywords = keyword.parent()
        ;

        keyword.remove();
        if (keywords.children().length === 0) {
            keywords.css({"display": "none"})
        }
    }

    return {
        init: function () {
            $(".imcms-keyword .imcms-keyword__button").click(addKeyword);
        }
    };
});
