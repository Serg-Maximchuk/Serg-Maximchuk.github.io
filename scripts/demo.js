/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(
    [
        "imcms-date-picker", "imcms-time-picker", "imcms-tests", "imcms-components-builder", "imcms-bem-builder",
        "jquery"
    ],
    function (DatePicker, TimePicker, tests, componentsBuilder, BEM, $) {
        console.info("%c Tests loaded.", "color: green");
        Imcms.tests = tests;

        /////////////////////////////////////////////////////////////////////
        // basic elements                                                  //
        /////////////////////////////////////////////////////////////////////

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

        var $negativeBtn = buttons.negativeButton({text: "negative"}),
            $positiveBtn = buttons.positiveButton({text: "positive"}),
            $neutralBtn = buttons.neutralButton({text: "neutral"}),
            $saveBtn = buttons.saveButton({text: "save"}),
            $negativeBtn2 = buttons.negativeButton({text: "negative"}),
            $positiveBtn2 = buttons.positiveButton({text: "positive"}),
            $neutralBtn2 = buttons.neutralButton({text: "neutral"}),
            $saveBtn2 = buttons.saveButton({text: "save"}),
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

        // text input

        var $textInputFixedSize = componentsBuilder.texts.fixedSizeText("<div>", {
                id: "text1",
                text: "Text 1",
                name: "text",
                placeholder: "Text 1 placeholder"
            }).addClass("text-example-fixed-size"),

            $textInput = componentsBuilder.texts.text("<div>", {
                id: "text2",
                text: "Text 2",
                name: "text",
                placeholder: "Text 2 placeholder"
            }).addClass("text-example-free-size")
        ;

        $("#text-input-example").append($textInputFixedSize);
        $("#text-input-field-example").append($textInput);

        // text area

        var $textAreaFixedSize = componentsBuilder.texts.fixedSizeTextArea("<div>", {
                id: "textArea1",
                text: "Text area 1",
                name: "textArea",
                placeholder: "Text area 1 placeholder"
            }).addClass("text-area-example-fixed-size"),

            $textArea = componentsBuilder.texts.textArea("<div>", {
                id: "textArea2",
                text: "Text area 2",
                name: "textArea",
                placeholder: "Text area 2 placeholder"
            }).addClass("text-area-example-free-size")
        ;

        $("#text-input-area-example").append($textAreaFixedSize);
        $("#text-input-area-field-example").append($textArea);

        // text number input

        var $textNumberFixedSize = componentsBuilder.texts.fixedSizeTextNumber("<div>", {
                id: "number1",
                text: "Number 1",
                name: "number",
                placeholder: "Number 1 placeholder",
                error: "Special info - Error"
            }).addClass("number-input-example-fixed-size"),

            $textNumber = componentsBuilder.texts.textNumber("<div>", {
                id: "number2",
                text: "Number 2",
                name: "number",
                placeholder: "Number 2 placeholder",
                error: "Special info - Error"
            }).addClass("number-input-example-free-size")
        ;

        // error in field, just an example
        $textNumber.find(".imcms-number__number-box.imcms-number-box").addClass("imcms-number-box--error");

        $("#text-number-example").append($textNumberFixedSize);
        $("#text-number-field-example").append($textNumber);

        // choose image

        var $chooseImage = componentsBuilder.chooseImage.container("<div>", {
            id: "path1",
            name: "path",
            placeholder: "Image path",
            "label-text": "Image Path",
            "button-text": "choose..."
        });

        $("#choose-image-example").append($chooseImage);

        // plural input

        var $pluralInputBox = componentsBuilder.texts.pluralInput("<div>", [
            {
                id: "input1",
                name: "top",
                placeholder: "top"
            }, {
                id: "input2",
                name: "right",
                placeholder: "right"
            }, {
                id: "input3",
                name: "bottom",
                placeholder: "bottom"
            }, {
                id: "input4",
                name: "left",
                placeholder: "left"
            }
        ], {text: "Plural columns input"});

        $("#space-around-input-example").append($pluralInputBox);

        // keywords

        var $keywordsBox = componentsBuilder.keywords.keywordsBox("<div>", {
            "input-id": "keyword",
            title: "Keywords",
            placeholder: "keyword",
            "button-text": "ADD+"
        });

        $("#keywords-example").append($keywordsBox);

        // typography

        var $errorText = componentsBuilder.texts.error("<span>", "Lorem ipsum dolor. "),
            $infoText = componentsBuilder.texts.info("<span>", "Lorem ipsum dolor. "),
            $titleText = componentsBuilder.texts.title("<span>", "Lorem ipsum dolor. ")
        ;

        $("#typography-example").append($errorText, $infoText, $titleText);

        // date picker and calendar

        var $date = componentsBuilder.dateTime.dateBoxReadOnly({
            title: "Current readonly date"
        });

        var $dateExample = $("#date-example");
        $dateExample.append($date);

        var $datePicker = componentsBuilder.dateTime.datePicker({
            title: "Editable date"
        });

        var $datePickerExample = $("#date-picker-example");
        $datePickerExample.append($datePicker);

        var $calendar = componentsBuilder.dateTime.datePickerCalendar({
            title: "Editable date with calendar"
        });

        var $datePickerCalendarExample = $("#date-picker-calendar-example");
        $datePickerCalendarExample.append($calendar);

        function getCurrentDate() {
            var currentDate = new Date(),
                year = currentDate.getFullYear(),
                month = currentDate.getMonth() + 1,
                date = currentDate.getDate()
            ;

            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }

            return year + "-" + month + "-" + date;
        }

        var mockDateReceivedFromServer = getCurrentDate();

        new DatePicker($dateExample).setDate(mockDateReceivedFromServer);
        new DatePicker($datePickerExample).setDate(mockDateReceivedFromServer);
        new DatePicker($datePickerCalendarExample).setDate(mockDateReceivedFromServer);

        // time picker

        function getCurrentTime() {
            var currentDate = new Date(),
                hour = currentDate.getHours(),
                minute = currentDate.getMinutes()
            ;

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }

            return hour + ":" + minute;
        }

        var mockTimeReceivedFromServer = getCurrentTime(),
            $time = componentsBuilder.dateTime.timePickerClock({
                title: "Time picker"
            }),
            $timePickerExample = $("#time-picker-example").append($time)
        ;

        new TimePicker($timePickerExample).setTime(mockTimeReceivedFromServer);

        // time and date

        var $dateTime = componentsBuilder.dateTime.dateTimePicker({
                title: "Date and time picker in one input"
            }),
            $dateTimeExample = $("#date-time-example").append($dateTime)
        ;
        new DatePicker($dateTimeExample).setDate(mockDateReceivedFromServer);
        new TimePicker($dateTimeExample).setTime(mockTimeReceivedFromServer);

        console.timeEnd("imCMS JS loaded");


        /////////////////////////////////////////////////////////////////////
        // page info window components                                     //
        /////////////////////////////////////////////////////////////////////

        // roles

        var rolesBEM = new BEM({
            block: "imcms-access-role",
            elements: {
                "head": "",
                "title": "imcms-title",
                "body": "",
                "row": "",
                "column-title": "imcms-title",
                "column": "imcms-radio",
                "button": "imcms-button"
            }
        });

        var $titleRole = rolesBEM.buildBlockElement("title", "<div>", {text: "role"}),
            $titleView = rolesBEM.buildBlockElement("title", "<div>", {text: "view"}),
            $titleEdit = rolesBEM.buildBlockElement("title", "<div>", {text: "edit"}),
            $titleRestricted1 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 1"}),
            $titleRestricted2 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 2"}),
            $rolesHead = rolesBEM.buildElement("head", "<div>").append([
                $titleRole,
                $titleView,
                $titleEdit,
                $titleRestricted1,
                $titleRestricted2
            ]),
            $userAdminTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: "Useradmin"}),
            userAdminRadioName = "useradmin0",
            $userAdminView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "view01",
                name: userAdminRadioName,
                checked: "checked"
            })),
            $userAdminEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "edit01",
                name: userAdminRadioName
            })),
            $userAdminRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "restricted011",
                name: userAdminRadioName
            })),
            $userAdminRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "restricted021",
                name: userAdminRadioName
            })),
            $userAdminDeleteRoleButton = rolesBEM.makeBlockElement("button", buttons.closeButton({
                click: function () {
                    console.log("%c Not implemented feature: delete role.", "color: red;")
                }
            })),
            $userAdminRow = rolesBEM.buildBlockElement("row", "<div>").append([
                $userAdminTitle,
                $userAdminView,
                $userAdminEdit,
                $userAdminRestricted1,
                $userAdminRestricted2,
                $userAdminDeleteRoleButton
            ]),
            $userTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: "Users"}),
            usersRadioName = "users0",
            $userView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "view02",
                name: usersRadioName,
                checked: "checked"
            })),
            $userEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "edit02",
                name: usersRadioName
            })),
            $userRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "restricted012",
                name: usersRadioName
            })),
            $userRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "restricted022",
                name: usersRadioName
            })),
            $userDeleteRoleButton = rolesBEM.makeBlockElement("button", buttons.closeButton({
                click: function () {
                    console.log("%c Not implemented feature: delete role.", "color: red;")
                }
            })),
            $userRow = rolesBEM.buildBlockElement("row", "<div>").append([
                $userTitle,
                $userView,
                $userEdit,
                $userRestricted1,
                $userRestricted2,
                $userDeleteRoleButton
            ]),
            $testRoleTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: "Test role"}),
            testRoleRadioName = "testrole0",
            $testRoleView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "view03",
                name: testRoleRadioName,
                checked: "checked"
            })),
            $testRoleEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "edit03",
                name: testRoleRadioName
            })),
            $testRoleRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "restricted013",
                name: testRoleRadioName
            })),
            $testRoleRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.radio("<div>", {
                id: "restricted023",
                name: testRoleRadioName
            })),
            $testRoleDeleteRoleButton = rolesBEM.makeBlockElement("button", buttons.closeButton({
                click: function () {
                    console.log("%c Not implemented feature: delete role.", "color: red;")
                }
            })),
            $testRoleRow = rolesBEM.buildBlockElement("row", "<div>").append([
                $testRoleTitle,
                $testRoleView,
                $testRoleEdit,
                $testRoleRestricted1,
                $testRoleRestricted2,
                $testRoleDeleteRoleButton
            ]),
            $rolesBody = rolesBEM.buildElement("body", "<div>").append([
                $userAdminRow,
                $userRow,
                $testRoleRow
            ]),
            $rolesTable = rolesBEM.buildBlock("<div>", [
                {"head": $rolesHead},
                {"body": $rolesBody}
            ])
        ;
        $("#imcms-roles").append($rolesTable);
    }
);
