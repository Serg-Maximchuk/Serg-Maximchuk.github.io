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

        var tabData = {};

        function onTimeNowButtonClick() {
            console.log("%c Not implemented feature: set time.", "color: red;")
        }

        function onTimeClearButtonClick() {
            console.log("%c Not implemented feature: clear time.", "color: red;")
        }

        function buildDocStatusSelect() {
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

            return lifeCycleInnerStructureBEM.buildBlock("<div>", [{"select": tabData.$docStatusSelect}]);
        }

        function buildDateTimeContainerBlock($title, items) {
            var blockElements = [{"title": $title}].concat(items.map(function ($item) {
                return {
                    "item": $item,
                    modifiers: itemModifiers
                }
            }));

            return lifeCycleInnerStructureBEM.buildBlock("<div>", blockElements);
        }

        function buildPublishedDateTimeContainer() {
            var $publishedTitle = components.texts.titleText("<div>", "Published"),
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
                }),
                $clearPublishTimeContainer = components.buttons.buttonsContainer("<div>", [$clearPublishTimeBtn])
            ;

            tabData.publishTime = new TimePicker($publishTime);
            tabData.publishDate = new DatePicker($publishDate);
            tabData.publishDateTime = {
                date: new DatePicker($publishDateTime),
                time: new TimePicker($publishDateTime)
            };

            return buildDateTimeContainerBlock($publishedTitle, [
                $publishDate,
                $publishTime,
                $setPublishTimeNowContainer,
                $publishDateTime,
                $clearPublishTimeContainer
            ]);
        }

        function buildArchivedDateTimeContainer() {
            var $archivedTitle = components.texts.titleText("<div>", "Archived"),
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
                }),
                $clearArchivedTimeContainer = components.buttons.buttonsContainer("<div>", [$clearArchivedTimeBtn])
            ;

            tabData.archivedTime = new TimePicker($archivedTime);
            tabData.archivedDate = new DatePicker($archivedDate);
            tabData.archivedDateTime = {
                date: new DatePicker($archivedDateTime),
                time: new TimePicker($archivedDateTime)
            };

            return buildDateTimeContainerBlock($archivedTitle, [
                $archivedDate,
                $archivedTime,
                $setArchivedTimeNowContainer,
                $archivedDateTime,
                $clearArchivedTimeContainer
            ]);
        }

        function buildPublishEndDateTimeContainer() {
            var $publishEndTitle = components.texts.titleText("<div>", "Publication end"),
                $publishEndDate = components.dateTime.datePickerCalendar({title: "Set publication end date"}),
                $publishEndTime = components.dateTime.timePickerClock({title: "Set publication end time"}),
                $setPublishEndTimeNowBtn = components.buttons.neutralButton({
                    text: "Now",
                    click: onTimeNowButtonClick
                }),
                $setPublishEndTimeNowContainer = components.buttons.buttonsContainer("<div>", [$setPublishEndTimeNowBtn]),
                $publishEndDateTime = components.dateTime.dateTimeReadOnly({
                    title: "Saved publication end date-time"
                }),
                $clearPublishEndTimeBtn = components.buttons.neutralButton({
                    text: "Clear",
                    click: onTimeClearButtonClick
                }),
                $clearPublishEndTimeContainer = components.buttons.buttonsContainer("<div>", [$clearPublishEndTimeBtn])
            ;

            tabData.publishEndTime = new TimePicker($publishEndTime);
            tabData.publishEndDate = new DatePicker($publishEndDate);
            tabData.publishEndDateTime = {
                date: new DatePicker($publishEndDateTime),
                time: new TimePicker($publishEndDateTime)
            };

            return buildDateTimeContainerBlock($publishEndTitle, [
                $publishEndDate,
                $publishEndTime,
                $setPublishEndTimeNowContainer,
                $publishEndDateTime,
                $clearPublishEndTimeContainer
            ]);
        }

        function buildPublisherSelectRow() {
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

            return lifeCycleInnerStructureBEM.buildBlock("<div>", [{"select": tabData.$publisherSelect}]);
        }

        function buildLanguagesContainer() {
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

            return lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"title": $languagesTitle},
                {"item": tabData.$showDefaultLang},
                {"item": tabData.$doNotShow}
            ]);
        }

        function buildCurrentVersionRow() {
            var $currentVersionRowTitle = components.texts.titleText("<div>", "Current version:"),
                $docVersionSaveDateTime = components.dateTime.dateTimeReadOnly()
            ;

            tabData.$currentVersionNumber = components.texts.textBox("<div>", {
                readonly: "readonly",
                value: "0"
            });
            tabData.docVersionSaveDateTime = {
                date: new DatePicker($docVersionSaveDateTime),
                time: new TimePicker($docVersionSaveDateTime)
            };

            return lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"title": $currentVersionRowTitle},
                {
                    "item": tabData.$currentVersionNumber,
                    modifiers: itemModifiers.concat("short")
                }, {
                    "item": $docVersionSaveDateTime,
                    modifiers: itemModifiers
                }
            ]);
        }

        function buildDocVersionsInfoRow() {
            // todo implement appearance logic for this text
            var $offlineVersionInfo = components.texts.infoText("<div>", "This offline version has changes."),
                $savingVersionInfo = components.texts.infoText("<div>",
                    "Please press \"Save and publish this version\" to publish as: version 0000.", {
                        id: "save-as-new-version-message"
                    })
            ;
            return lifeCycleInnerStructureBEM.buildBlock("<div>", [
                {"item": $offlineVersionInfo},
                {"item": $savingVersionInfo}
            ]);
        }

        return {
            name: "life cycle",
            buildTab: function (index) {
                return linker.buildFormBlock([
                    buildDocStatusSelect(),
                    buildPublishedDateTimeContainer(),
                    buildArchivedDateTimeContainer(),
                    buildPublishEndDateTimeContainer(),
                    buildPublisherSelectRow(),
                    buildLanguagesContainer(),
                    buildCurrentVersionRow(),
                    buildDocVersionsInfoRow()
                ], index);
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
