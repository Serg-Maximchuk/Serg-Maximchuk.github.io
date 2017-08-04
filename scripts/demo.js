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
            $buttonsRow2 = buttons.buttonsContainer("<div>", [
                    $negativeBtn2,
                    $positiveBtn2,
                    $neutralBtn2,
                    $saveBtn2
                ], {id: "buttons-container-example"}
            )
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
            $flagsRow = flags.flagsContainer("<div>", [
                flags.eng("<div>"),
                flags.swe("<div>", true)
            ], {
                id: "flags-container-example"
            })
        ;

        $("#flags-example").append($engFlag)
            .append($sweFlag)
            .append($flagsRow);

        // checkboxes

        var $checkbox1 = componentsBuilder.checkboxes.checkbox("<div>", {
            id: "checkbox01",
            name: "checkbox1",
            text: "item 1",
            click: function () {
                setTimeout(function () {
                    console.log("checkbox 1 " + ($("#" + $(this).attr("for")).is(":checked") ? "checked" : "unchecked"));
                }.bind(this));
            }
        });
        var $checkbox2 = componentsBuilder.checkboxes.checkbox("<div>", {
            id: "checkbox02",
            name: "checkbox2",
            checked: "checked",
            text: "item 2 (checked by default)",
            click: function () {
                setTimeout(function () {
                    console.log("checkbox 2 " + ($("#" + $(this).attr("for")).is(":checked") ? "checked" : "unchecked"));
                }.bind(this));
            }
        });

        var $checkboxes = componentsBuilder.checkboxes.checkboxContainer("<div>", [
                $checkbox1,
                $checkbox2
            ], {"class": "checkboxes-class-example"}
        );

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

        var $radios = componentsBuilder.radios.radioContainer("<div>", [
                $radio1,
                $radio2
            ], {"class": "radios-class-example"}
        );

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

        var $selectContainer = componentsBuilder.selects.selectContainer("<div>", {
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

        var $textInputFixedSize = componentsBuilder.texts.textBox("<div>", {
                id: "text1",
                text: "Text 1",
                name: "text",
                placeholder: "Text 1 placeholder"
            }).addClass("text-example-fixed-size"),

            $textInput = componentsBuilder.texts.textField("<div>", {
                id: "text2",
                text: "Text 2",
                name: "text",
                placeholder: "Text 2 placeholder"
            }).addClass("text-example-free-size")
        ;

        $("#text-input-example").append($textInputFixedSize);
        $("#text-input-field-example").append($textInput);

        // text area

        var $textAreaFixedSize = componentsBuilder.texts.textArea("<div>", {
                id: "textArea1",
                text: "Text area 1",
                name: "textArea",
                placeholder: "Text area 1 placeholder"
            }).addClass("text-area-example-fixed-size"),

            $textArea = componentsBuilder.texts.textAreaField("<div>", {
                id: "textArea2",
                text: "Text area 2",
                name: "textArea",
                placeholder: "Text area 2 placeholder"
            }).addClass("text-area-example-free-size")
        ;

        $("#text-input-area-example").append($textAreaFixedSize);
        $("#text-input-area-field-example").append($textArea);

        // text number input

        var $textNumberFixedSize = componentsBuilder.texts.textNumber("<div>", {
                id: "number1",
                text: "Number 1",
                name: "number",
                placeholder: "Number 1 placeholder",
                error: "Special info - Error"
            }).addClass("number-input-example-fixed-size"),

            $textNumber = componentsBuilder.texts.textNumberField("<div>", {
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

        // add role

        var addRoleContainerBEM = new BEM({
                block: "imcms-field",
                elements: {
                    "access-role": "imcms-access-addrole"
                }
            }),
            addRoleInnerBEM = new BEM({
                block: "imcms-access-addrole",
                elements: {
                    "select": "imcms-select",
                    "button": "imcms-button"
                }
            })
        ;

        var $addRoleSelect = componentsBuilder.selects.select("<div>", {
                id: "select3"
            }, [{
                text: "role1",
                "data-value": 1
            }, {
                text: "role2",
                "data-value": 2
            }, {
                text: "role3",
                "data-value": 3
            }, {
                text: "role4",
                "data-value": 4
            }]),
            $addRoleButton = buttons.neutralButton({
                text: "Add role",
                click: function () {
                    console.log("%c Not implemented feature: add role.", "color: red;")
                }
            }),
            $addRoleInnerBlock = addRoleInnerBEM.buildBlock("<div>", [
                {"select": $addRoleSelect},
                {"button": $addRoleButton}
            ]),
            $addRoleContainer = addRoleContainerBEM.buildBlock("<div>", [{"access-role": $addRoleInnerBlock}])
        ;
        $("#add-role-example").append($addRoleContainer);

        // page info appearance tab

        var pageInfoContainerBEM = new BEM({
                block: "imcms-form",
                elements: {
                    "field": "imcms-field"
                }
            }),
            pageInfoInnerStructureBEM = new BEM({
                block: "imcms-field",
                elements: {
                    "flags": "imcms-flags",
                    "checkboxes": "imcms-checkboxes",
                    "text-box": "imcms-text-box",
                    "text-area": "imcms-text-area",
                    "choose-image": "imcms-choose-image",
                    "select": "imcms-select"
                }
            })
        ;

        var $pageInfoFlags = componentsBuilder.flags.flagsContainer("<div>", [
                componentsBuilder.flags.eng("<div>", true),
                componentsBuilder.flags.swe("<div>")
            ]),
            $pageInfoFlagsContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"flags": $pageInfoFlags}]),
            $engCheckbox = componentsBuilder.checkboxes.checkbox("<div>", {
                name: "english",
                text: "English",
                checked: "checked"
            }),
            $engCheckboxWrapper = componentsBuilder.checkboxes.checkboxContainer("<div>", [$engCheckbox]),
            $engCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"checkboxes": $engCheckboxWrapper}]),
            $pageTitle = componentsBuilder.texts.textBox("<div>", {
                name: "title",
                text: "Title",
                placeholder: "Start page"
            }),
            $pageTitleContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"text-box": $pageTitle}]),
            $menuText = componentsBuilder.texts.textArea("<div>", {
                text: "Menu text",
                name: "menu-text"
            }),
            $menuTextContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"text-area": $menuText}]),
            $linkToImage = componentsBuilder.chooseImage.container("<div>", {
                id: "path-to-image",
                name: "image",
                placeholder: "Image path",
                "label-text": "Link to image",
                "button-text": "choose..."
            }),
            $linkToImageContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"choose-image": $linkToImage}]),
            $showIn = componentsBuilder.selects.select("<div>", {
                id: "show-in",
                text: "Show in",
                name: "show-in"
            }, [{
                text: "Same frame",
                "data-value": "_self"
            }, {
                text: "New window",
                "data-value": "_blank"
            }, {
                text: "Replace all",
                "data-value": "_top"
            }]),
            $showInContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"select": $showIn}]),
            $documentAlias = componentsBuilder.texts.textBox("<div>", {
                name: "alias",
                text: "Document Alias",
                placeholder: "alias-example"
            }),
            $documentAliasContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"text-box": $documentAlias}]),
            $pageInfoContainer = pageInfoContainerBEM.buildBlock("<div>", [
                    {"field": $pageInfoFlagsContainer},
                    {"field": $engCheckboxContainer},
                    {"field": $pageTitleContainer},
                    {"field": $menuTextContainer},
                    {"field": $linkToImageContainer},
                    {"field": $showInContainer},
                    {"field": $documentAliasContainer}
                ],
                {"data-window-id": "1"}
            )
        ;
        $("#page-info-appearance-example").append($pageInfoContainer);

        // page info - life cycle tab

        var lifeCycleContainerBEM = new BEM({
                block: "imcms-form",
                elements: {
                    "field": "imcms-field"
                }
            }),
            lifeCycleInnerStructureBEM = new BEM({
                block: "imcms-field",
                elements: {
                    "select": "imcms-select",
                    "title": "imcms-title",
                    "item": ""
                }
            }),
            itemModifiers = ["float-l"]
        ;

        function onTimeNowButtonClick() {
            console.log("%c Not implemented feature: set time.", "color: red;")
        }

        function onTimeClearButtonClick() {
            console.log("%c Not implemented feature: clear time.", "color: red;")
        }

        var $docStatusSelect = componentsBuilder.selects.select("<div>", {
                id: "doc-status",
                text: "Status",
                name: "status"
            }, [{
                text: "In Process",
                "data-value": "0"
            }, {
                text: "Disapproved",
                "data-value": "1"
            }, {
                text: "Approved",
                "data-value": "2"
            }]),
            $docStatusSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [{"select": $docStatusSelect}]),

            // published date-time row

            $publishedTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Published"}),
            $publishDate = componentsBuilder.dateTime.datePickerCalendar({title: "Set published date"}),
            $publishTime = componentsBuilder.dateTime.timePickerClock({title: "Set published time"}),

            $setPublishTimeNowBtn = componentsBuilder.buttons.neutralButton({
                text: "Now",
                click: onTimeNowButtonClick
            }),
            $setPublishTimeNowContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$setPublishTimeNowBtn]),

            $setPublishDateTime = componentsBuilder.dateTime.dateTimeReadOnly({title: "Saved publish date-time"}),

            $clearPublishTimeBtn = componentsBuilder.buttons.neutralButton({
                text: "Clear",
                click: onTimeClearButtonClick
            }),
            $clearPublishTimeContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$clearPublishTimeBtn]),

            $publishedDateTimeContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"title": $publishedTitle},
                {
                    "item": $publishDate,
                    modifiers: itemModifiers
                },
                {
                    "item": $publishTime,
                    modifiers: itemModifiers
                },
                {
                    "item": $setPublishTimeNowContainer,
                    modifiers: itemModifiers
                },
                {
                    "item": $setPublishDateTime,
                    modifiers: itemModifiers
                },
                {
                    "item": $clearPublishTimeContainer,
                    modifiers: itemModifiers
                }
            ]),

            // archived date-time row

            $archivedTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Archived"}),
            $archivedDate = componentsBuilder.dateTime.datePickerCalendar({title: "Set archived date"}),
            $archivedTime = componentsBuilder.dateTime.timePickerClock({title: "Set archived time"}),

            $setArchivedTimeNowBtn = componentsBuilder.buttons.neutralButton({
                text: "Now",
                click: onTimeNowButtonClick
            }),
            $setArchivedTimeNowContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$setArchivedTimeNowBtn]),

            $setArchivedDateTime = componentsBuilder.dateTime.dateTimeReadOnly({title: "Saved archived date-time"}),

            $clearArchivedTimeBtn = componentsBuilder.buttons.neutralButton({
                text: "Clear",
                click: onTimeClearButtonClick
            }),
            $clearArchivedTimeContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$clearArchivedTimeBtn]),

            $archivedDateTimeContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"title": $archivedTitle},
                {
                    "item": $archivedDate,
                    modifiers: itemModifiers
                },
                {
                    "item": $archivedTime,
                    modifiers: itemModifiers
                },
                {
                    "item": $setArchivedTimeNowContainer,
                    modifiers: itemModifiers
                },
                {
                    "item": $setArchivedDateTime,
                    modifiers: itemModifiers
                },
                {
                    "item": $clearArchivedTimeContainer,
                    modifiers: itemModifiers
                }
            ]),

            // publication date-time row

            $publishEndTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Publication end"}),
            $publishEndDate = componentsBuilder.dateTime.datePickerCalendar({title: "Set publication end date"}),
            $publishEndTime = componentsBuilder.dateTime.timePickerClock({title: "Set publication end time"}),

            $setPublishEndTimeNowBtn = componentsBuilder.buttons.neutralButton({
                text: "Now",
                click: onTimeNowButtonClick
            }),
            $setPublishEndTimeNowContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$setPublishEndTimeNowBtn]),

            $setPublishEndDateTime = componentsBuilder.dateTime.dateTimeReadOnly({
                title: "Saved publication end date-time"
            }),

            $clearPublishEndTimeBtn = componentsBuilder.buttons.neutralButton({
                text: "Clear",
                click: onTimeClearButtonClick
            }),
            $clearPublishEndTimeContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$clearPublishEndTimeBtn]),

            $publishEndDateTimeContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"title": $publishEndTitle},
                {
                    "item": $publishEndDate,
                    modifiers: itemModifiers
                },
                {
                    "item": $publishEndTime,
                    modifiers: itemModifiers
                },
                {
                    "item": $setPublishEndTimeNowContainer,
                    modifiers: itemModifiers
                },
                {
                    "item": $setPublishEndDateTime,
                    modifiers: itemModifiers
                },
                {
                    "item": $clearPublishEndTimeContainer,
                    modifiers: itemModifiers
                }
            ]),

            // publisher select row

            $publisherSelect = componentsBuilder.selects.select("<div>", {
                id: "doc-publisher",
                text: "Publisher",
                name: "publisher"
            }, [{
                text: "Admin",
                "data-value": "0"
            }, {
                text: "User1",
                "data-value": "1"
            }, {
                text: "User2",
                "data-value": "2"
            }]),
            $publisherSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [{"select": $publisherSelect}]),

            // languages row

            $languagesTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                text: "If requested language is missing:"
            }),
            $showDefaultLang = componentsBuilder.radios.radio("<div>", {
                text: "Show in default language if enabled",
                name: "langSetting",
                value: "SHOW_DEFAULT",
                checked: "checked"
            }),
            $doNotShow = componentsBuilder.radios.radio("<div>", {
                text: "Don't show at all",
                name: "langSetting",
                value: "DO_NOT_SHOW"
            }),
            $languagesContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"item": $languagesTitle},
                {"item": $showDefaultLang},
                {"item": $doNotShow}
            ]),

            // current version row

            $currentVersionRowTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                text: "Current version:"
            }),
            $currentVersionNumber = componentsBuilder.texts.textInput({
                id: "document-version",
                readonly: "readonly",
                value: "31"
            }),
            $docVersionSaveDateTime = componentsBuilder.dateTime.dateTimeReadOnly(),
            $docVersionContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"title": $currentVersionRowTitle},
                {
                    "item": $currentVersionNumber,
                    modifiers: itemModifiers
                },
                {
                    "item": $docVersionSaveDateTime,
                    modifiers: itemModifiers
                }
            ]),

            // doc versions info row

            $offlineVersionInfo = componentsBuilder.texts.info("<div>", "This offline version has changes."),
            $savingVersionInfo = componentsBuilder.texts.info("<div>",
                "Please press \"Save and publish this version\" to publish as: version 32.", {
                    id: "save-as-new-version-message"
                }),
            $docVersionsInfoContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"item": $offlineVersionInfo},
                {"item": $savingVersionInfo}
            ]),

            $lifeCycleContainer = lifeCycleContainerBEM.buildBlock("<div>", [
                    {"field": $docStatusSelectContainer},
                    {"field": $publishedDateTimeContainer},
                    {"field": $archivedDateTimeContainer},
                    {"field": $publishEndDateTimeContainer},
                    {"field": $publisherSelectContainer},
                    {"field": $languagesContainer},
                    {"field": $docVersionContainer},
                    {"field": $docVersionsInfoContainer}
                ],
                {"data-window-id": "2"}
            )
        ;
        new DatePicker($publishDate).setDate(mockDateReceivedFromServer);
        new TimePicker($publishTime).setTime(mockTimeReceivedFromServer);

        new DatePicker($setPublishDateTime).setDate(mockDateReceivedFromServer);
        new TimePicker($setPublishDateTime).setTime(mockTimeReceivedFromServer);

        new DatePicker($archivedDate).setDate(mockDateReceivedFromServer);
        new TimePicker($archivedTime).setTime(mockTimeReceivedFromServer);

        new DatePicker($setArchivedDateTime).setDate(mockDateReceivedFromServer);
        new TimePicker($setArchivedDateTime).setTime(mockTimeReceivedFromServer);

        new DatePicker($publishEndDate).setDate(mockDateReceivedFromServer);
        new TimePicker($publishEndTime).setTime(mockTimeReceivedFromServer);

        new DatePicker($setPublishEndDateTime).setDate(mockDateReceivedFromServer);
        new TimePicker($setPublishEndDateTime).setTime(mockTimeReceivedFromServer);

        new DatePicker($docVersionSaveDateTime).setDate(mockDateReceivedFromServer);
        new TimePicker($docVersionSaveDateTime).setTime(mockTimeReceivedFromServer);

        $("#page-info-life-cycle-example").append($lifeCycleContainer);

        console.timeEnd("imCMS JS loaded");
    }
);
