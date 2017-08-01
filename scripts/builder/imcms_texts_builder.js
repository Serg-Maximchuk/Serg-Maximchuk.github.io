/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 26.07.17.
 */
Imcms.define("imcms-texts-builder",
    ["imcms-bem-builder", "imcms-primitives-builder", "imcms-buttons-builder", "jquery"],
    function (BEM, primitives, buttons, $) {
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
            elements: {}
        });

        var textAreaBEM = new BEM({
            block: "imcms-text-area",
            elements: {}
        });

        var numberBoxBEM = new BEM({
            block: "imcms-number-box",
            elements: {
                "button": "imcms-button"
            }
        });

        var numberBEM = new BEM({
            block: "imcms-number",
            elements: {
                "number-box": "imcms-number-box",
                "error-msg": "imcms-error-msg"
            }
        });

        var pluralInputBEM = new BEM({
            block: "imcms-space-around",
            elements: {
                "input-box": ""
            }
        });

        return {
            textBox: function (tag, attributes) {
                var $label = primitives.imcmsLabel(attributes.id, attributes.text),
                    $input = primitives.imcmsInputText({
                        id: attributes.id,
                        name: attributes.name,
                        placeholder: attributes.placeholder
                    })
                ;

                return textBEM.buildBlock("<div>", [
                    {"label": $label},
                    {"input": $input}
                ]);
            },
            textField: function (tag, attributes) {
                return this.textBox.apply(this, arguments).addClass("imcms-field");
            },
            textArea: function (tag, attributes) {
                var $label = primitives.imcmsLabel(attributes.id, attributes.text),
                    $textArea = primitives.imcmsInputTextArea({
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
            textAreaField: function (tag, attributes) {
                return this.textArea.apply(this, arguments).addClass("imcms-field");
            },
            textNumber: function (tag, attributes) {
                var $input = primitives.imcmsInputText({
                        id: attributes.id,
                        name: attributes.name,
                        placeholder: attributes.placeholder,
                        click: activateNumberBox
                    }).on('change keyup input click', validation),

                    $buttonIncrement = buttons.incrementButton({click: incrementNumberBoxValue}),
                    $buttonDecrement = buttons.decrementButton({click: decrementNumberBoxValue}),

                    $numberInputBox = numberBoxBEM.buildBlock("<div>", [
                        {"input": $input},
                        {"button": $buttonIncrement},
                        {"button": $buttonDecrement}
                    ]),
                    $label = primitives.imcmsLabel(attributes.id, attributes.text),
                    $error = numberBEM.buildElement("error-msg", "<div>", {text: attributes.error})
                ;
                return numberBEM.buildBlock("<div>", [
                    {"label": $label},
                    {"number-box": $numberInputBox},
                    {"error-msg": $error}
                ]);
            },
            textNumberField: function (tag, attributes) {
                return this.textNumber.apply(this, arguments).addClass("imcms-field");
            },
            pluralInput: function (tag, columns, attributes) {
                var $label = primitives.imcmsLabel(columns[0].id, attributes.text),
                    inputs = columns.map(function (column) {
                        return pluralInputBEM.buildBlockElement("input", "<input>", {
                            type: "text",
                            id: column.id,
                            placeholder: column.placeholder,
                            name: column.name
                        });
                    }),
                    $inputBox = pluralInputBEM.buildElement("input-box", "<div>").append(inputs)
                ;
                return pluralInputBEM.buildBlock("<div>", [
                    {"label": $label},
                    {"input-box": $inputBox}
                ]);
            },
            error: function (tag, text, attributes) {
                return $(tag, (attributes || {})).addClass("imcms-error-msg").text(text);
            },
            info: function (tag, text, attributes) {
                return $(tag, (attributes || {})).addClass("imcms-info-msg").text(text);
            },
            title: function (tag, text, attributes) {
                return $(tag, (attributes || {})).addClass("imcms-title").text(text);
            }
        }
    }
);
