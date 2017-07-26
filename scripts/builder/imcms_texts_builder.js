/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 26.07.17.
 */
Imcms.define("imcms-texts-builder", ["imcms-bem-builder", "jquery"], function (BEM, $) {
    function activateNumberBox() {
        var numberBox = $(this).closest(".imcms-number-box"),
            numberBoxInput = numberBox.find(".imcms-number-box__input")
        ;
        numberBox.addClass("imcms-number-box--active");

        if (numberBoxInput.val() === "") {
            numberBoxInput.val(0)
        }
    }

    function validation() {
        var $this = $(this),
            value = $this.val()
        ;

        if (value.match(/[^0-9,-]/g)) {
            $this.val(value.replace(/[^0-9,-]/g, ''));
        }
        if (value.length > 10) {
            $this.val(value.substring(0, 10))
        }
    }

    function incrementNumberBoxValue() {
        changeValue.call(this, 1);
    }

    function decrementNumberBoxValue() {
        changeValue.call(this, -1);
    }

    function changeValue(delta) {
        var numberBoxInput = $(this).closest(".imcms-number-box").find(".imcms-number-box__input"),
            value = (parseInt(numberBoxInput.val()) || 0) + delta
        ;
        return numberBoxInput.val(value);
    }

    function deactivateNumberBox(e) {
        var $target = $(e.target);
        if (
            !$target.parent().children(".imcms-number-box__input").length
            && !$target.hasClass("imcms-number-box__button")
        ) {
            e.stopPropagation();
            $(".imcms-number-box__input").closest(".imcms-number-box")
                .removeClass("imcms-number-box--active");
        }
    }

    $(document).click(deactivateNumberBox);

    var textBEM = new BEM({
        block: "imcms-text-box",
        elements: {
            "label": "imcms-label",
            "input": "imcms-input"
        }
    });

    var textAreaBEM = new BEM({
        block: "imcms-text-area",
        elements: {
            "label": "imcms-label",
            "input": "imcms-input"
        }
    });

    var numberBoxBEM = new BEM({
        block: "imcms-number-box",
        elements: {
            "input": "imcms-input",
            "button": "imcms-button"
        }
    });

    var numberBEM = new BEM({
        block: "imcms-number",
        elements: {
            "label": "imcms-label",
            "number-box": "imcms-number-box",
            "error-msg": "imcms-error-msg"
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
        },
        fixedSizeTextArea: function (tag, attributes) {
            var $label = textAreaBEM.buildElement("label", "<label>", {
                    "for": attributes.id,
                    text: attributes.text
                }),
                $textArea = textAreaBEM.buildElement("input", "<textarea>", {
                    id: attributes.id,
                    name: attributes.name,
                    placeholder: attributes.placeholder
                })
            ;

            return textAreaBEM.buildBlock("<div>", [
                {"label": $label},
                {"input": $textArea}
            ]);
        },
        textArea: function (tag, attributes) {
            return this.fixedSizeTextArea.apply(this, arguments).addClass("imcms-field");
        },
        fixedSizeTextNumber: function (tag, attributes) {
            var $input = numberBoxBEM.buildElement("input", "<input>", {
                    id: attributes.id,
                    type: "text",
                    name: attributes.name,
                    placeholder: attributes.placeholder,
                    click: activateNumberBox
                }).on('change keyup input click', validation),

                $buttonIncrement = numberBoxBEM.buildElement("button", "<button>", {
                    type: "button",
                    click: incrementNumberBoxValue
                }, ["increment"]),

                $buttonDecrement = numberBoxBEM.buildElement("button", "<button>", {
                    type: "button",
                    click: decrementNumberBoxValue
                }, ["decrement"]),

                $numberInputBox = numberBoxBEM.buildBlock("<div>", [
                    {"input": $input},
                    {"button": $buttonIncrement},
                    {"button": $buttonDecrement}
                ]),
                $label = numberBEM.buildElement("label", "<label>", {
                    "for": attributes.id,
                    text: attributes.text
                }),
                $error = numberBEM.buildElement("error-msg", "<div>", {text: attributes.error})
            ;
            return numberBEM.buildBlock("<div>", [
                {"label": $label},
                {"number-box": $numberInputBox},
                {"error-msg": $error}
            ])
        },
        textNumber: function (tag, attributes) {
            return this.fixedSizeTextNumber.apply(this, arguments).addClass("imcms-field");
        }
    }
});
