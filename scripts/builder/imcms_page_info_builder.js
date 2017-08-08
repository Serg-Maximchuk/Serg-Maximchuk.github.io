/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    ["imcms-date-picker", "imcms-time-picker", "imcms-bem-builder", "imcms-components-builder", "jquery"],
    function (DatePicker, TimePicker, BEM, componentsBuilder, $) {
        var pageInfoBEM = new BEM({
            block: "imcms-pop-up-modal",
            elements: {
                "head": "imcms-head",
                "left-side": "imcms-left-side",
                "right-side": "imcms-right-side",
                "footer": "imcms-footer"
            }
        });

        function buildPageInfoHead() {
            var pageInfoHeadBEM = new BEM({
                block: "imcms-head",
                elements: {
                    "title": "imcms-title"
                }
            });

            var $title = pageInfoHeadBEM.buildElement("title", "<div>", {
                text: "document 1001" // todo: receive correct doc id
            });

            return pageInfoHeadBEM.buildBlock("<div>", [
                {"title": $title}
            ]);
        }

        function showPanel(index) {
            $(".imcms-form[data-window-id=" + index + "]").css({"display": "block"});
        }

        var formsBEM = new BEM({
            block: "imcms-form",
            elements: {
                "field": "imcms-field"
            }
        });

        function buildFormBlock(elements, index) {
            return formsBEM.buildBlock("<div>", elements, {"data-window-id": index}, "field");
        }

        var tabsData = [{
            name: "appearance",
            build: function (index) {
                var pageInfoInnerStructureBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "flags": "imcms-flags",
                        "checkboxes": "imcms-checkboxes",
                        "text-box": "imcms-text-box",
                        "text-area": "imcms-text-area",
                        "choose-image": "imcms-choose-image",
                        "select": "imcms-select"
                    }
                });

                var $pageInfoFlags = componentsBuilder.flags.flagsContainer("<div>", [
                        componentsBuilder.flags.eng("<div>", true),
                        componentsBuilder.flags.swe("<div>")
                    ]),
                    $pageInfoFlagsContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"flags": $pageInfoFlags}]),
                    $engCheckbox = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
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
                    $showIn = componentsBuilder.selects.imcmsSelect("<div>", {
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
                    $documentAliasContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"text-box": $documentAlias}])
                ;

                var tabElements = [
                    $pageInfoFlagsContainer,
                    $engCheckboxContainer,
                    $pageTitleContainer,
                    $menuTextContainer,
                    $linkToImageContainer,
                    $showInContainer,
                    $documentAliasContainer
                ];

                return buildFormBlock(tabElements, index);
            }
        }, {
            name: "life cycle",
            build: function (index) {
                var lifeCycleInnerStructureBEM = new BEM({
                        block: "imcms-field",
                        elements: {
                            "select": "imcms-select",
                            "title": "imcms-title",
                            "item": ""
                        }
                    }),
                    itemModifiers = ["float-l"];

                function onTimeNowButtonClick() {
                    console.log("%c Not implemented feature: set time.", "color: red;")
                }

                function onTimeClearButtonClick() {
                    console.log("%c Not implemented feature: clear time.", "color: red;")
                }

                var $docStatusSelect = componentsBuilder.selects.imcmsSelect("<div>", {
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
                        }, {
                            "item": $publishTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $setPublishTimeNowContainer,
                            modifiers: itemModifiers
                        }, {
                            "item": $setPublishDateTime,
                            modifiers: itemModifiers
                        }, {
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
                        }, {
                            "item": $archivedTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $setArchivedTimeNowContainer,
                            modifiers: itemModifiers
                        }, {
                            "item": $setArchivedDateTime,
                            modifiers: itemModifiers
                        }, {
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
                        }, {
                            "item": $publishEndTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $setPublishEndTimeNowContainer,
                            modifiers: itemModifiers
                        }, {
                            "item": $setPublishEndDateTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $clearPublishEndTimeContainer,
                            modifiers: itemModifiers
                        }
                    ]),

                    // publisher select row

                    $publisherSelect = componentsBuilder.selects.imcmsSelect("<div>", {
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
                    $showDefaultLang = componentsBuilder.radios.imcmsRadio("<div>", {
                        text: "Show in default language if enabled",
                        name: "langSetting",
                        value: "SHOW_DEFAULT",
                        checked: "checked"
                    }),
                    $doNotShow = componentsBuilder.radios.imcmsRadio("<div>", {
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
                    $currentVersionNumber = componentsBuilder.texts.textBox("<div>", {
                        id: "document-version",
                        readonly: "readonly",
                        value: "31"
                    }),
                    $docVersionSaveDateTime = componentsBuilder.dateTime.dateTimeReadOnly(),
                    $docVersionContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"title": $currentVersionRowTitle},
                        {
                            "item": $currentVersionNumber,
                            modifiers: itemModifiers.concat("short")
                        }, {
                            "item": $docVersionSaveDateTime,
                            modifiers: itemModifiers
                        }
                    ]),

                    // doc versions info row

                    $offlineVersionInfo = componentsBuilder.texts.infoText("<div>", "This offline version has changes."),
                    $savingVersionInfo = componentsBuilder.texts.infoText("<div>",
                        "Please press \"Save and publish this version\" to publish as: version 32.", {
                            id: "save-as-new-version-message"
                        }),
                    $docVersionsInfoContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"item": $offlineVersionInfo},
                        {"item": $savingVersionInfo}
                    ])
                ;

                // todo: receive date and time from server

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

                var mockTimeReceivedFromServer = getCurrentTime();

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

                var formElements = [
                    $docStatusSelectContainer,
                    $publishedDateTimeContainer,
                    $archivedDateTimeContainer,
                    $publishEndDateTimeContainer,
                    $publisherSelectContainer,
                    $languagesContainer,
                    $docVersionContainer,
                    $docVersionsInfoContainer
                ];

                return buildFormBlock(formElements, index);
            }
        }, {
            name: "keywords",
            build: function (index) {
                var $keywordsBox = componentsBuilder.keywords.keywordsBox("<div>", {
                    "input-id": "keyword",
                    title: "Keywords",
                    placeholder: "keyword",
                    "button-text": "ADD+"
                });
                var $searchDisableCheckbox = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                    id: "isSearchDisabled",
                    name: "isSearchDisabled",
                    text: "Disable search"
                });
                var $checkboxField = componentsBuilder.checkboxes.checkboxContainerField("<div>", [$searchDisableCheckbox]);

                return buildFormBlock([$keywordsBox, $checkboxField], index);
            }
        }, {
            name: "categories",
            build: function (index) {
                var $testCategoryType1 = componentsBuilder.selects.selectContainer("<div>", {
                    name: "categoryTest1",
                    text: "Test category type 1"
                }, [{
                    text: "Test1",
                    value: "0"
                }, {
                    text: "Test2",
                    value: "1"
                }]);

                var $testCategoryType2 = componentsBuilder.selects.selectContainer("<div>", {
                    name: "categoryTest2",
                    text: "Test category type 2"
                }, [{
                    text: "Test1",
                    value: "0"
                }, {
                    text: "Test2",
                    value: "1"
                }]);

                var $checkbox1 = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                    id: "checkbox01",
                    name: "checkbox1",
                    text: "Blue"
                });
                var $checkbox2 = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                    id: "checkbox02",
                    name: "checkbox2",
                    checked: "checked",
                    text: "Red"
                });
                var $checkbox3 = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                    id: "checkbox03",
                    name: "checkbox3",
                    text: "White"
                });
                var $testCategoryType3 = componentsBuilder.checkboxes.checkboxContainerField("<div>", [
                        $checkbox1,
                        $checkbox2,
                        $checkbox3
                    ],
                    {title: "Car"}
                );

                var blockElements = [
                    $testCategoryType1,
                    $testCategoryType2,
                    $testCategoryType3
                ];

                return buildFormBlock(blockElements, index);
            }
        }, {
            name: "access",
            build: function (index) {
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
                    }),
                    rolesContainerBEM = new BEM({
                        block: "imcms-field",
                        elements: {
                            "access-role": "imcms-access-role"
                        }
                    })
                ;

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
                    $userAdminView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "view01",
                        name: userAdminRadioName,
                        checked: "checked"
                    })),
                    $userAdminEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "edit01",
                        name: userAdminRadioName
                    })),
                    $userAdminRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "restricted011",
                        name: userAdminRadioName
                    })),
                    $userAdminRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "restricted021",
                        name: userAdminRadioName
                    })),
                    $userAdminDeleteRoleButton = rolesBEM.makeBlockElement("button", componentsBuilder.buttons.closeButton({
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
                    $userView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "view02",
                        name: usersRadioName,
                        checked: "checked"
                    })),
                    $userEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "edit02",
                        name: usersRadioName
                    })),
                    $userRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "restricted012",
                        name: usersRadioName
                    })),
                    $userRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "restricted022",
                        name: usersRadioName
                    })),
                    $userDeleteRoleButton = rolesBEM.makeBlockElement("button", componentsBuilder.buttons.closeButton({
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
                    $testRoleView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "view03",
                        name: testRoleRadioName,
                        checked: "checked"
                    })),
                    $testRoleEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "edit03",
                        name: testRoleRadioName
                    })),
                    $testRoleRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "restricted013",
                        name: testRoleRadioName
                    })),
                    $testRoleRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                        id: "restricted023",
                        name: testRoleRadioName
                    })),
                    $testRoleDeleteRoleButton = rolesBEM.makeBlockElement("button", componentsBuilder.buttons.closeButton({
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
                    ]),
                    $rolesField = rolesContainerBEM.buildBlock("<div>", [{"access-role": $rolesTable}])
                ;
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
                var $addRoleSelect = componentsBuilder.selects.imcmsSelect("<div>", {
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
                    $addRoleButton = componentsBuilder.buttons.neutralButton({
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

                return buildFormBlock([$rolesField, $addRoleContainer], index);
            }
        }, {
            name: "permissions",
            build: function (index) {
                function buildTestCheckboxes(attributesArr) {
                    return attributesArr.map(function (attributes) {
                        return componentsBuilder.checkboxes.imcmsCheckbox("<div>", attributes);
                    });
                }

                var fieldItemBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "item": "imcms-col-3"
                    }
                });

                var $checkboxes1 = buildTestCheckboxes([{
                    name: "editText1",
                    text: "Edit text"
                }, {
                    name: "editMenu1",
                    text: "Edit menu"
                }, {
                    name: "editImage1",
                    text: "Edit image"
                }, {
                    name: "editLoop1",
                    text: "Edit loop"
                }, {
                    name: "editDocInfo1",
                    text: "Edit doc info"
                }]);
                var $restrictedRole1Rights = componentsBuilder.checkboxes
                    .checkboxContainer("<div>", $checkboxes1, {title: "Restricted 1"});

                var $checkboxes2 = buildTestCheckboxes([{
                    name: "editText2",
                    text: "Edit text"
                }, {
                    name: "editMenu2",
                    text: "Edit menu"
                }, {
                    name: "editImage2",
                    text: "Edit image"
                }, {
                    name: "editLoop2",
                    text: "Edit loop"
                }, {
                    name: "editDocInfo2",
                    text: "Edit doc info"
                }]);
                var $restrictedRole2Rights = componentsBuilder.checkboxes
                    .checkboxContainer("<div>", $checkboxes2, {title: "Restricted 2"});

                var $permissionsWrapper = fieldItemBEM.buildBlock("<div>", [{
                    "item": $restrictedRole1Rights,
                    modifiers: ["float-l", "col-3"]
                }, {
                    "item": $restrictedRole2Rights,
                    modifiers: ["float-l", "col-3"]
                }]);

                return buildFormBlock([$permissionsWrapper], index);
            }
        }, {
            name: "templates",
            build: function (index) {
                var templates = [{
                    text: "demo",
                    value: "demo"
                }, {
                    text: "test",
                    value: "test"
                }, {
                    text: "imageArchive",
                    value: "imageArchive"
                }, {
                    text: "demoold",
                    value: "demoold"
                }];
                var $template = componentsBuilder.selects.selectContainer("<div>", {
                    name: "template",
                    text: "Template"
                }, templates);

                var $defaultChildTemplate = componentsBuilder.selects.selectContainer("<div>", {
                    name: "categoryTest2",
                    text: "Test category type 2"
                }, templates);

                return buildFormBlock([$template, $defaultChildTemplate], index);
            }
        }, {
            name: "status",
            build: function (index) {
                var statusFieldBEM = new BEM({
                        block: "imcms-field",
                        elements: {"item": "imcms-item"}
                    }),
                    statusItemBEM = new BEM({
                        block: "imcms-item",
                        elements: {
                            "label": "imcms-label",
                            "input": ""
                        }
                    });
                var boxModifiers = ["float-l"];

                // created by

                var $createdTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Created"});
                var $createdDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "createdDate"});
                var $createdTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "createdTime"});

                var $createdDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $createdTimeTitle
                }, {
                    "input": $createdDate,
                    modifiers: boxModifiers
                }, {
                    "input": $createdTime,
                    modifiers: boxModifiers
                }]);

                var $createdByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                var $createdBy = componentsBuilder.texts.textBox("<div>", {
                    id: "createdBy",
                    value: "Admin"
                });

                var $createdByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $createdByTitle
                    }, {
                        "input": $createdBy,
                        modifiers: boxModifiers
                    }]
                );

                var $created = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $createdDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $createdByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // modified by

                var $modifiedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Modified"});
                var $modifiedDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "modifiedDate"});
                var $modifiedTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "modifiedTime"});

                var $modifiedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $modifiedTimeTitle
                }, {
                    "input": $modifiedDate,
                    modifiers: boxModifiers
                }, {
                    "input": $modifiedTime,
                    modifiers: boxModifiers
                }]);

                var $modifiedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                var $modifiedBy = componentsBuilder.texts.textBox("<div>", {
                    id: "modifiedBy",
                    value: "Admin"
                });

                var $modifiedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $modifiedByTitle
                    }, {
                        "input": $modifiedBy,
                        modifiers: boxModifiers
                    }]
                );

                var $modified = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $modifiedDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $modifiedByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // archived

                var $archivedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Archived"});
                var $archivedDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "archivedDate"});
                var $archivedTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "archivedTime"});

                var $archivedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $archivedTimeTitle
                }, {
                    "input": $archivedDate,
                    modifiers: boxModifiers
                }, {
                    "input": $archivedTime,
                    modifiers: boxModifiers
                }]);

                var $archivedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                var $archivedBy = componentsBuilder.texts.textBox("<div>", {
                    id: "archivedBy",
                    value: "Admin"
                });

                var $archivedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $archivedByTitle
                    }, {
                        "input": $archivedBy,
                        modifiers: boxModifiers
                    }]
                );

                var $archived = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $archivedDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $archivedByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // published

                var $publishedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Published"});
                var $publishedDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "publishedDate"});
                var $publishedTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "publishedTime"});

                var $publishedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $publishedTimeTitle
                }, {
                    "input": $publishedDate,
                    modifiers: boxModifiers
                }, {
                    "input": $publishedTime,
                    modifiers: boxModifiers
                }]);

                var $publishedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                var $publishedBy = componentsBuilder.texts.textBox("<div>", {
                    id: "publishedBy",
                    value: "Admin"
                });

                var $publishedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $publishedByTitle
                    }, {
                        "input": $publishedBy,
                        modifiers: boxModifiers
                    }]
                );

                var $published = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $publishedDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $publishedByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // publish end

                var $publishEndTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Publish end"});
                var $publishEndDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "publishEndDate"});
                var $publishEndTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "publishEndTime"});

                var $publishEndDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $publishEndTimeTitle
                }, {
                    "input": $publishEndDate,
                    modifiers: boxModifiers
                }, {
                    "input": $publishEndTime,
                    modifiers: boxModifiers
                }]);

                var $publishEndByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                var $publishEndBy = componentsBuilder.texts.textBox("<div>", {
                    id: "publishEndBy",
                    value: "Admin"
                });

                var $publishEndByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $publishEndByTitle
                    }, {
                        "input": $publishEndBy,
                        modifiers: boxModifiers
                    }]
                );

                var $publishEnd = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $publishEndDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $publishEndByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                var blockElements = [
                    $created,
                    $modified,
                    $archived,
                    $published,
                    $publishEnd
                ];

                return buildFormBlock(blockElements, index);
            }
        }];

        function buildPageInfoTabs() {
            function getOnTabClick(index) {
                return function () {
                    $("[data-menu=pageInfo]").find(".imcms-title--active").removeClass("imcms-title--active");
                    $(this).addClass("imcms-title--active");
                    $(".imcms-form").css("display", "none");
                    showPanel(index);
                }
            }

            var pageInfoLeftSideTabsBEM = new BEM({
                block: "imcms-left-side",
                elements: {
                    "tabs": "imcms-tabs"
                }
            });

            var pageInfoTabsBEM = new BEM({
                block: "imcms-tabs",
                elements: {
                    "tab": "imcms-title"
                }
            });

            var $tabs = tabsData.map(function (tabData, index) {
                return pageInfoTabsBEM.buildElement("tab", "<div>",
                    {
                        "data-window-id": index,
                        text: tabData.name,
                        click: getOnTabClick(index)
                    },
                    (index === 0 ? ["active"] : [])
                );
            });

            var $tabsContainer = pageInfoTabsBEM.buildBlock("<div>", $tabs, {}, "tab");

            return pageInfoLeftSideTabsBEM.buildBlock("<div>", [{"tabs": $tabsContainer}]);
        }

        function buildPageInfoPanels() {
            var $forms = tabsData.map(function (tabData, index) {
                return tabData.build(index).css("display", (index === 0 ? "block" : "none"));
            });

            return pageInfoBEM.buildElement("right-side", "<div>").append($forms);
        }

        function buildPageInfoFooter() {
            function closePageInfo() {
                $(this).parents(".imcms-pop-up-modal").css({"display": "none"});
                $(".modal").css({"display": "none"});
            }

            var $saveBtn = componentsBuilder.buttons.positiveButton({
                text: "ok",
                click: function () {
                    // todo: save things
                    closePageInfo.call(this);
                }
            });

            var $cancelBtn = componentsBuilder.buttons.negativeButton({
                text: "cancel",
                click: function () {
                    // todo: cancel things
                    closePageInfo.call(this);
                }
            });

            var $saveAndPublishBtn = componentsBuilder.buttons.saveButton({
                text: "save and publish this version",
                click: function () {
                    // todo: save and publish
                    closePageInfo.call(this);
                }
            });

            return pageInfoBEM.buildElement("footer", "<div>").append($saveAndPublishBtn, $cancelBtn, $saveBtn);
        }

        return {
            build: function () {
                var $head = buildPageInfoHead(),
                    $tabs = buildPageInfoTabs(),
                    $panels = buildPageInfoPanels(),
                    $footer = buildPageInfoFooter();

                return pageInfoBEM.buildBlock("<div>", [
                        {"head": $head},
                        {"left-side": $tabs},
                        {"right-side": $panels},
                        {"footer": $footer}
                    ],
                    {"data-menu": "pageInfo"}
                );
            }
        }
    }
);
