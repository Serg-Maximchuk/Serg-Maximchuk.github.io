Imcms.define("imcms-life-cycle-tab-builder",
    [
        "imcms-date-picker", "imcms-time-picker",
        "imcms-bem-builder", "imcms-components-builder", "imcms-users-rest-api",
        "imcms-page-info-tabs-linker"
    ],
    function (DatePicker, TimePicker, BEM, components, usersRestApi, linker) {

        return {
            name: "life cycle",
            data: {},
            buildTab: function (index) {
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

                this.data.$docStatusSelect = components.selects.imcmsSelect("<div>", {
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
                        {"select": this.data.$docStatusSelect}
                    ]),

                    // published date-time row
                    $publishedTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Published"}),
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

                this.data.publishTime = new TimePicker($publishTime);
                this.data.publishDate = new DatePicker($publishDate);
                this.data.publishDateTime = {};
                this.data.publishDateTime.date = new DatePicker($publishDateTime);
                this.data.publishDateTime.time = new TimePicker($publishDateTime);

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

                    $archivedTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Archived"}),
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

                this.data.archivedTime = new TimePicker($archivedTime);
                this.data.archivedDate = new DatePicker($archivedDate);
                this.data.archivedDateTime = {};
                this.data.archivedDateTime.date = new DatePicker($archivedDateTime);
                this.data.archivedDateTime.time = new TimePicker($archivedDateTime);

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

                    $publishEndTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                        text: "Publication end"
                    }),
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

                this.data.publishEndTime = new TimePicker($publishEndTime);
                this.data.publishEndDate = new DatePicker($publishEndDate);
                this.data.publishEndDateTime = {};
                this.data.publishEndDateTime.date = new DatePicker($publishEndDateTime);
                this.data.publishEndDateTime.time = new TimePicker($publishEndDateTime);

                // publisher select row

                this.data.$publisherSelect = components.selects.imcmsSelect("<div>", {
                    id: "doc-publisher",
                    text: "Publisher",
                    name: "publisher"
                });
                var parentContext = this;
                usersRestApi.read(null)
                    .done(function (users) {
                        var usersDataMapped = users.map(function (user) {
                                return {
                                    text: user.username,
                                    "data-value": user.id
                                }
                            }),
                            usersDataAsSelectItems = components.selects.mapOptionsToSelectItems(usersDataMapped)
                        ;

                        parentContext.data.$publisherSelect.append(usersDataAsSelectItems);
                    });// todo receive users with specific role admin

                var $publisherSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                    {"select": this.data.$publisherSelect}
                ]);

                // languages row

                var $languagesTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                    text: "If requested language is missing:"
                });

                this.data.$showDefaultLang = components.radios.imcmsRadio("<div>", {
                    text: "Show in default language if enabled",
                    name: "langSetting",
                    value: "SHOW_DEFAULT",
                    checked: "checked"
                });
                this.data.$doNotShow = components.radios.imcmsRadio("<div>", {
                    text: "Don't show at all",
                    name: "langSetting",
                    value: "DO_NOT_SHOW"
                });

                var $languagesContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                    {"title": $languagesTitle},
                    {"item": this.data.$showDefaultLang},
                    {"item": this.data.$doNotShow}
                ]);

                // current version row

                var $currentVersionRowTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                    text: "Current version:"
                });
                this.data.$currentVersionNumber = components.texts.textBox("<div>", {
                    readonly: "readonly",
                    value: "0"
                });

                var $docVersionSaveDateTime = components.dateTime.dateTimeReadOnly(),
                    $docVersionContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"title": $currentVersionRowTitle},
                        {
                            "item": this.data.$currentVersionNumber,
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

                this.data.docVersionSaveDateTime = {};
                this.data.docVersionSaveDateTime.date = new DatePicker($docVersionSaveDateTime);
                this.data.docVersionSaveDateTime.time = new TimePicker($docVersionSaveDateTime);

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
                var lifeCycleTab = this.data;

                lifeCycleTab.$docStatusSelect.selectValue(document.status);

                lifeCycleTab.publishDate.setDate(document.published.date);
                lifeCycleTab.publishTime.setTime(document.published.time);
                lifeCycleTab.publishDateTime.date.setDate(document.published.date);
                lifeCycleTab.publishDateTime.time.setTime(document.published.time);

                lifeCycleTab.archivedDate.setDate(document.archived.date);
                lifeCycleTab.archivedTime.setTime(document.archived.time);
                lifeCycleTab.archivedDateTime.date.setDate(document.archived.date);
                lifeCycleTab.archivedDateTime.time.setTime(document.archived.time);

                lifeCycleTab.publishEndDate.setDate(document.publication_end.date);
                lifeCycleTab.publishEndTime.setTime(document.publication_end.time);
                lifeCycleTab.publishEndDateTime.date.setDate(document.publication_end.date);
                lifeCycleTab.publishEndDateTime.time.setTime(document.publication_end.time);

                lifeCycleTab.$publisherSelect.selectValue(document.publisher);

                components.radios.group(lifeCycleTab.$showDefaultLang, lifeCycleTab.$doNotShow)
                    .checkAmongGroup(document.if_requested_lang_missing_doc_opts);

                lifeCycleTab.$currentVersionNumber.setValue(document.currentVersion);
                lifeCycleTab.docVersionSaveDateTime.date.setDate(document.currentVersionDate);
                lifeCycleTab.docVersionSaveDateTime.time.setTime(document.currentVersionTime);
            }
        };
    }
);
