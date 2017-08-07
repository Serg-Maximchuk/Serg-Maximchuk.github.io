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

        var tabsData = [
            {
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
            },
            {
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

                    // todo: receive data from server

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
            },
            {
                name: "keywords",
                build: function (index) {
                    return buildFormBlock([], index);
                }
            },
            {
                name: "categories",
                build: function (index) {
                    return buildFormBlock([], index);
                }
            },
            {
                name: "access",
                build: function (index) {
                    return buildFormBlock([], index);
                }
            },
            {
                name: "permissions",
                build: function (index) {
                    return buildFormBlock([], index);
                }
            },
            {
                name: "templates",
                build: function (index) {
                    return buildFormBlock([], index);
                }
            },
            {
                name: "status",
                build: function (index) {
                    return buildFormBlock([], index);
                }
            }
        ];

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
                return tabData.build(index);
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
                ], {
                    "data-menu": "pageInfo"
                });
            }
        }
    }
);
