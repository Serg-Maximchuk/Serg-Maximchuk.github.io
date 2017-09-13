Imcms.define("imcms-life-cycle-tab-builder",
    [
        "imcms-date-picker", "imcms-time-picker",
        "imcms-bem-builder", "imcms-components-builder", "imcms-users-rest-api",
        "imcms-page-info-tabs-linker"
    ],
    function (DatePicker, TimePicker, BEM, components, usersRestApi, linker) {

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

        var tabData = {};

        return {
            name: "life cycle",
            buildTab: function (index) {
                tabData.$docStatusSelect = components.selects.imcmsSelect("<div>", {
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
                }]);

                var $docStatusSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"select": tabData.$docStatusSelect}
                    ]),

                    // published date-time row
                    $publishedTitle = components.texts.titleText("<div>", "Published"),
                    $publishDate = components.dateTime.datePickerCalendar({title: "Set published date"}),
                    $publishTime = components.dateTime.timePickerClock({title: "Set published time"}),
                    $setPublishTimeNowBtn = components.buttons.neutralButton({
                        text: "Now",
                        click: onTimeNowButtonClick
                    }),
                    $setPublishTimeNowContainer = components.buttons.buttonsContainer("<div>", [$setPublishTimeNowBtn]),

                    $publishDateTime = components.dateTime.dateTimeReadOnly({title: "Saved publish date-time"}),

                    $clearPublishTimeBtn = components.buttons.neutralButton({
                        text: "Clear",
                        click: onTimeClearButtonClick
                    })
                ;

                tabData.publishTime = new TimePicker($publishTime);
                tabData.publishDate = new DatePicker($publishDate);
                tabData.publishDateTime = {
                    date: new DatePicker($publishDateTime),
                    time: new TimePicker($publishDateTime)
                };

                var $clearPublishTimeContainer = components.buttons.buttonsContainer("<div>", [$clearPublishTimeBtn]),

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
                            "item": $publishDateTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $clearPublishTimeContainer,
                            modifiers: itemModifiers
                        }
                    ]),

                    // archived date-time row

                    $archivedTitle = components.texts.titleText("<div>", "Archived"),
                    $archivedDate = components.dateTime.datePickerCalendar({title: "Set archived date"}),
                    $archivedTime = components.dateTime.timePickerClock({title: "Set archived time"}),
                    $setArchivedTimeNowBtn = components.buttons.neutralButton({
                        text: "Now",
                        click: onTimeNowButtonClick
                    }),
                    $setArchivedTimeNowContainer = components.buttons.buttonsContainer("<div>", [$setArchivedTimeNowBtn]),

                    $archivedDateTime = components.dateTime.dateTimeReadOnly({title: "Saved archived date-time"}),

                    $clearArchivedTimeBtn = components.buttons.neutralButton({
                        text: "Clear",
                        click: onTimeClearButtonClick
                    })
                ;

                tabData.archivedTime = new TimePicker($archivedTime);
                tabData.archivedDate = new DatePicker($archivedDate);
                tabData.archivedDateTime = {
                    date: new DatePicker($archivedDateTime),
                    time: new TimePicker($archivedDateTime)
                };

                var $clearArchivedTimeContainer = components.buttons.buttonsContainer("<div>", [$clearArchivedTimeBtn]),

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
                            "item": $archivedDateTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $clearArchivedTimeContainer,
                            modifiers: itemModifiers
                        }
                    ]),

                    // publication date-time row

                    $publishEndTitle = components.texts.titleText("<div>", "Publication end"),
                    $publishEndDate = components.dateTime.datePickerCalendar({title: "Set publication end date"}),
                    $publishEndTime = components.dateTime.timePickerClock({title: "Set publication end time"}),

                    $setPublishEndTimeNowBtn = components.buttons.neutralButton({
                        text: "Now",
                        click: onTimeNowButtonClick
                    }),

                    $setPublishEndTimeNowContainer = components.buttons.buttonsContainer("<div>", [
                        $setPublishEndTimeNowBtn
                    ]),

                    $publishEndDateTime = components.dateTime.dateTimeReadOnly({
                        title: "Saved publication end date-time"
                    }),

                    $clearPublishEndTimeBtn = components.buttons.neutralButton({
                        text: "Clear",
                        click: onTimeClearButtonClick
                    }),

                    $clearPublishEndTimeContainer = components.buttons.buttonsContainer("<div>", [
                        $clearPublishEndTimeBtn
                    ]),

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
                            "item": $publishEndDateTime,
                            modifiers: itemModifiers
                        }, {
                            "item": $clearPublishEndTimeContainer,
                            modifiers: itemModifiers
                        }
                    ])
                ;

                tabData.publishEndTime = new TimePicker($publishEndTime);
                tabData.publishEndDate = new DatePicker($publishEndDate);
                tabData.publishEndDateTime = {
                    date: new DatePicker($publishEndDateTime),
                    time: new TimePicker($publishEndDateTime)
                };

                // publisher select row

                tabData.$publisherSelect = components.selects.imcmsSelect("<div>", {
                    id: "doc-publisher",
                    text: "Publisher",
                    name: "publisher"
                });

                usersRestApi.read(null).done(function (users) {
                    var usersDataMapped = users.map(function (user) {
                            return {
                                text: user.username,
                                "data-value": user.id
                            }
                        })
                    ;

                    components.selects.addOptionsToSelect(usersDataMapped, tabData.$publisherSelect);
                });// todo receive users with specific role admin

                var $publisherSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                    {"select": tabData.$publisherSelect}
                ]);

                // languages row

                var $languagesTitle = components.texts.titleText("<div>", "If requested language is missing:");

                tabData.$showDefaultLang = components.radios.imcmsRadio("<div>", {
                    text: "Show in default language if enabled",
                    name: "langSetting",
                    value: "SHOW_DEFAULT",
                    checked: "checked" // default value
                });
                tabData.$doNotShow = components.radios.imcmsRadio("<div>", {
                    text: "Don't show at all",
                    name: "langSetting",
                    value: "DO_NOT_SHOW"
                });

                var $languagesContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                    {"title": $languagesTitle},
                    {"item": tabData.$showDefaultLang},
                    {"item": tabData.$doNotShow}
                ]);

                // current version row

                var $currentVersionRowTitle = components.texts.titleText("<div>", "Current version:");
                tabData.$currentVersionNumber = components.texts.textBox("<div>", {
                    readonly: "readonly",
                    value: "0"
                });

                var $docVersionSaveDateTime = components.dateTime.dateTimeReadOnly(),
                    $docVersionContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"title": $currentVersionRowTitle},
                        {
                            "item": tabData.$currentVersionNumber,
                            modifiers: itemModifiers.concat("short")
                        }, {
                            "item": $docVersionSaveDateTime,
                            modifiers: itemModifiers
                        }
                    ]),

                    // doc versions info row

                    // todo implement appearance logic for this text
                    $offlineVersionInfo = components.texts.infoText("<div>", "This offline version has changes."),
                    $savingVersionInfo = components.texts.infoText("<div>",
                        "Please press \"Save and publish this version\" to publish as: version 0000.", {
                            id: "save-as-new-version-message"
                        }),
                    $docVersionsInfoContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"item": $offlineVersionInfo},
                        {"item": $savingVersionInfo}
                    ])
                ;

                tabData.docVersionSaveDateTime = {
                    date: new DatePicker($docVersionSaveDateTime),
                    time: new TimePicker($docVersionSaveDateTime)
                };

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

                return linker.buildFormBlock(formElements, index);
            },
            fillTabDataFromDocument: function (document) {
                tabData.$docStatusSelect.selectValue(document.status);

                tabData.publishDate.setDate(document.published.date);
                tabData.publishTime.setTime(document.published.time);
                tabData.publishDateTime.date.setDate(document.published.date);
                tabData.publishDateTime.time.setTime(document.published.time);

                tabData.archivedDate.setDate(document.archived.date);
                tabData.archivedTime.setTime(document.archived.time);
                tabData.archivedDateTime.date.setDate(document.archived.date);
                tabData.archivedDateTime.time.setTime(document.archived.time);

                tabData.publishEndDate.setDate(document.publication_end.date);
                tabData.publishEndTime.setTime(document.publication_end.time);
                tabData.publishEndDateTime.date.setDate(document.publication_end.date);
                tabData.publishEndDateTime.time.setTime(document.publication_end.time);

                tabData.$publisherSelect.selectValue(document.publisher);

                components.radios.group(tabData.$showDefaultLang, tabData.$doNotShow)
                    .checkAmongGroup(document.if_requested_lang_missing_doc_opts);

                tabData.$currentVersionNumber.setValue(document.currentVersion);
                tabData.docVersionSaveDateTime.date.setDate(document.currentVersionDate);
                tabData.docVersionSaveDateTime.time.setTime(document.currentVersionTime);
            },
            clearTabData: function () {
                var emptyString = '';

                tabData.$docStatusSelect.selectFirst();

                tabData.publishDate.setDate(emptyString);
                tabData.publishTime.setTime(emptyString);
                tabData.publishDateTime.date.setDate(emptyString);
                tabData.publishDateTime.time.setTime(emptyString);

                tabData.archivedDate.setDate(emptyString);
                tabData.archivedTime.setTime(emptyString);
                tabData.archivedDateTime.date.setDate(emptyString);
                tabData.archivedDateTime.time.setTime(emptyString);

                tabData.publishEndDate.setDate(emptyString);
                tabData.publishEndTime.setTime(emptyString);
                tabData.publishEndDateTime.date.setDate(emptyString);
                tabData.publishEndDateTime.time.setTime(emptyString);

                tabData.$publisherSelect.selectFirst();

                tabData.$showDefaultLang.setChecked(true); //default value

                tabData.$currentVersionNumber.setValue(emptyString);
                tabData.docVersionSaveDateTime.date.setDate(emptyString);
                tabData.docVersionSaveDateTime.time.setTime(emptyString);

            }
        };
    }
);
