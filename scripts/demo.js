/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(
    [
        "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword", "imcms-tests",
        "imcms-components-builder", "jquery"
    ],
    function (imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword, tests, componentsBuilder, $) {
        console.info("%c Tests loaded.", "color: green");
        Imcms.tests = tests;

        // buttons

        var buttons = componentsBuilder.buttons,
            $negativeBtn = buttons.negative("<button>", {
                type: "button",
                text: "negative"
            }),
            $positiveBtn = buttons.positive("<button>", {
                type: "button",
                text: "positive"
            }),
            $neutralBtn = buttons.neutral("<button>", {
                type: "button",
                text: "neutral"
            }),
            $saveBtn = buttons.save("<button>", {
                type: "button",
                text: "save"
            }),
            $negativeBtn2 = buttons.negative("<button>", {
                type: "button",
                text: "negative"
            }),
            $positiveBtn2 = buttons.positive("<button>", {
                type: "button",
                text: "positive"
            }),
            $neutralBtn2 = buttons.neutral("<button>", {
                type: "button",
                text: "neutral"
            }),
            $saveBtn2 = buttons.save("<button>", {
                type: "button",
                text: "save"
            }),
            $buttonsRow2 = buttons.container("<div>", {
                id: "buttons-container-example"
            }, [
                $negativeBtn2,
                $positiveBtn2,
                $neutralBtn2,
                $saveBtn2
            ])
        ;

        $("#buttons-example").append($negativeBtn)
            .append($positiveBtn)
            .append($neutralBtn)
            .append($saveBtn)
            .append($buttonsRow2);

        // flags

        var flags = componentsBuilder.flags,
            $engFlag = flags.eng("<div>", true),
            $sweFlag = flags.swe("<div>"),
            $flagsRow = flags.container("<div>", {
                id: "flags-container-example"
            }, [
                flags.eng("<div>"),
                flags.swe("<div>", true)
            ])
        ;

        $("#flags-example").append($engFlag)
            .append($sweFlag)
            .append($flagsRow);

        // checkboxes

        var $checkbox1 = componentsBuilder.checkboxes.checkbox("<div>", {
            id: "checkbox01",
            name: "checkbox",
            text: "item 1",
            click: function () {
                setTimeout(function () {
                    console.log("checkbox 1 " + ($("#" + $(this).attr("for")).is(":checked") ? "checked" : "unchecked"));
                }.bind(this));
            }
        });
        var $checkbox2 = componentsBuilder.checkboxes.checkbox("<div>", {
            id: "checkbox02",
            name: "checkbox",
            text: "item 2",
            click: function () {
                setTimeout(function () {
                    console.log("checkbox 2 " + ($("#" + $(this).attr("for")).is(":checked") ? "checked" : "unchecked"));
                }.bind(this));
            }
        });

        var $checkboxes = componentsBuilder.checkboxes.container("<div>", {
            "class": "checkboxes-class-example"
        }, [
            $checkbox1,
            $checkbox2
        ]);

        $("#checkboxes-example").append($checkboxes);

        imcmsDatePicker.init();
        imcmsTimePicker.init();
        imcmsSelect.init();
        imcmsNumberbox.init();
        imcmsKeyword.init();

        console.timeEnd("imCMS JS loaded");
    }
);
