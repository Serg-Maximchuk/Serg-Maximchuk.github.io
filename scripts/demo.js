/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(
    [
        "imcms-date-picker", "imcms-time-picker", "imcms-numberbox", "imcms-keyword", "imcms-tests",
        "imcms-components-builder", "jquery"
    ],
    function (imcmsDatePicker, imcmsTimePicker, imcmsNumberbox, imcmsKeyword, tests, componentsBuilder, $) {
        console.info("%c Tests loaded.", "color: green");
        Imcms.tests = tests;

        var buttons = componentsBuilder.buttons;

        // links as imcms-button--neutral

        var $homeEditLink = buttons.neutral("<a>", {
                href: "home_edit.html",
                text: "home + edit"
            }),
            $chooseImgLink = buttons.neutral("<a>", {
                href: "choose_img.html",
                text: "choose image"
            }),
            $imageEditorLink = buttons.neutral("<a>", {
                href: "image_editor.html",
                text: "image editor"
            }),
            $MenuEditorLink = buttons.neutral("<a>", {
                href: "menu_editor.html",
                text: "menu editor"
            })
        ;

        $("#links-as-buttons").append(
            $homeEditLink,
            $chooseImgLink,
            $imageEditorLink,
            $MenuEditorLink
        );

        // buttons

        var $negativeBtn = buttons.negative("<button>", {
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
            checked: "checked",
            text: "item 2 (checked by default)",
            click: function () {
                setTimeout(function () {
                    console.log("checkbox 2 " + ($("#" + $(this).attr("for")).is(":checked") ? "checked" : "unchecked"));
                }.bind(this));
            }
        });

        var $checkboxes = componentsBuilder.checkboxes.container("<div>", {"class": "checkboxes-class-example"}, [
            $checkbox1,
            $checkbox2
        ]);

        $("#checkboxes-example").append($checkboxes);

        // radio

        var $radio1 = componentsBuilder.radios.radio("<div>", {
            id: "radio1",
            name: "radio-name",
            checked: "checked",
            text: "item 1",
            click: function () {
                console.log("radio1 checked");
            }
        });

        var $radio2 = componentsBuilder.radios.radio("<div>", {
            id: "radio2",
            name: "radio-name",
            checked: "checked",
            text: "item 2 (checked by default)",
            click: function () {
                console.log("radio2 checked");
            }
        });

        var $radios = componentsBuilder.radios.container("<div>", {
            "class": "radios-class-example"
        }, [
            $radio1,
            $radio2
        ]);

        $("#radio-buttons-example").append($radios);

        // selects

        var $select = componentsBuilder.selects.select("<div>", {
            id: "select1",
            "class": "selects-example-class",
            text: "Select"
        }, [
            {
                text: "option 1",
                "data-value": 1
            }, {
                text: "option 2",
                "data-value": 2
            }, {
                text: "option 3",
                "data-value": 3
            }, {
                text: "option 4",
                "data-value": 4
            }
        ]);

        $("#select-example").append($select);

        var $selectContainer = componentsBuilder.selects.container("<div>", {
            id: "select2",
            "class": "selects-field-example-class",
            text: "Select in Field"
        }, [
            {
                text: "option 1",
                "data-value": 1
            }, {
                text: "option 2",
                "data-value": 2
            }, {
                text: "option 3",
                "data-value": 3
            }, {
                text: "option 4",
                "data-value": 4
            }
        ]);

        $("#select-field-example").append($selectContainer);

        imcmsDatePicker.init();
        imcmsTimePicker.init();
        imcmsNumberbox.init();
        imcmsKeyword.init();

        console.timeEnd("imCMS JS loaded");
    }
);
