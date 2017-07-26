Imcms.define("imcms-numberbox", ["jquery"], function ($) {
    function activateNumberBox() {
        var $this = $(this),
            numberBox = $this.closest(".imcms-number-box"),
            numberBoxInput = numberBox.find(".imcms-number-box__input")
        ;
        numberBox.addClass("imcms-number-box--active");

        if (numberBoxInput.val() === "") {
            numberBoxInput.val(0)
        }
    }

    function deactivateNumberBox(e) {
        if (!$(e.target).closest(".imcms-number-box__input").length &&
            e.target.classList[0] !== "imcms-number-box__button") {

            $(".imcms-number-box__input").closest(".imcms-number-box")
                .removeClass("imcms-number-box--active");
            e.stopPropagation();
        }
    }

    function validation() {
        var $this = $(this),
            value = $this.val(),
            len = value.length
        ;

        if (value.match(/[^0-9,-]/g)) {
            $this.val(value.replace(/[^0-9,-]/g, ''));
        }
        if (len > 10) {
            $this.val(value.substring(0, 10))
        }
    }

    function changeValue() {
        var $this = $(this),
            numberBox = $this.closest(".imcms-number-box"),
            numberBoxInput = numberBox.find(".imcms-number-box__input"),
            value = parseInt(numberBoxInput.val())
        ;

        if ($this.hasClass("imcms-button--increment")) {
            value += 1;
        }
        else if ($this.hasClass("imcms-button--decrement")) {
            value -= 1;
        }

        return numberBoxInput.val(value);
    }

    return {
        init: function () {
            $(".imcms-number-box__input").click(activateNumberBox)
                .on('change keyup input click', validation);
            $(".imcms-number-box__button").click(changeValue);
            $(document).click(deactivateNumberBox);
        }
    }
});

//todo: add logic for number box according to their specifics
