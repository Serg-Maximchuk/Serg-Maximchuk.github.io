Imcms.define("imcms-status-tab-builder",
    [
        "imcms-date-picker", "imcms-time-picker",
        "imcms-bem-builder", "imcms-components-builder",
        "imcms-page-info-tabs-linker"
    ],
    function (DatePicker, TimePicker, BEM, components, linker) {

        var statusItemBEM = new BEM({
                block: "imcms-item",
                elements: {
                    "label": "imcms-label",
                    "input": ""
                }
            }),
            boxModifiers = ["float-l"],
            tabData = {}
        ;

        function buildRowBlock($dateTimeField, $doneByInput) {
            return new BEM({
                block: "imcms-field",
                elements: {
                    "item": "imcms-item"
                }
            }).buildBlock("<div>", [{
                    "item": $dateTimeField,
                    modifiers: ["col-3", "float-l"]
                }, {
                "item": buildDoneByField($doneByInput),
                    modifiers: ["col-2-3", "float-l"]
                }]
            );
        }

        function buildDateTimeField(title, $dateField, $timeField) {
            return statusItemBEM.buildBlock("<div>", [{
                "label": statusItemBEM.buildElement("label", "<div>", {text: title})
            }, {
                "input": $dateField,
                modifiers: boxModifiers
            }, {
                "input": $timeField,
                modifiers: boxModifiers
            }]);
        }

        function buildDoneByField($input) {
            return statusItemBEM.buildBlock("<div>", [{
                    "label": statusItemBEM.buildElement("label", "<div>", {text: "By"})
                }, {
                    "input": $input,
                    modifiers: boxModifiers
                }]
            );
        }

        function buildCreatedInfoRow() {
            tabData.$createdDate = components.dateTime.dateBoxReadOnly({id: "createdDate"});
            tabData.$createdTime = components.dateTime.timeBoxReadOnly({id: "createdTime"});
            tabData.$createdBy = components.texts.textBox("<div>", {
                id: "createdBy",
                readonly: "readonly"
            });

            var $createdDateTimeField = buildDateTimeField("Created", tabData.$createdDate, tabData.$createdTime);
            return buildRowBlock($createdDateTimeField, tabData.$createdBy);
        }

        function buildModifiedInfoRow() {
            tabData.$modifiedDate = components.dateTime.dateBoxReadOnly({id: "modifiedDate"});
            tabData.$modifiedTime = components.dateTime.timeBoxReadOnly({id: "modifiedTime"});
            tabData.$modifiedBy = components.texts.textBox("<div>", {
                id: "modifiedBy",
                readonly: "readonly"
            });

            var $modifiedDateTimeField = buildDateTimeField("Modified", tabData.$modifiedDate, tabData.$modifiedTime);
            return buildRowBlock($modifiedDateTimeField, tabData.$modifiedBy);
        }

        function buildArchivedInfoRow() {
            tabData.$archivedDate = components.dateTime.dateBoxReadOnly({id: "archivedDate"});
            tabData.$archivedTime = components.dateTime.timeBoxReadOnly({id: "archivedTime"});
            tabData.$archivedBy = components.texts.textBox("<div>", {
                id: "archivedBy",
                readonly: "readonly"
            });

            var $archivedDateTimeField = buildDateTimeField("Archived", tabData.$archivedDate, tabData.$archivedTime);
            return buildRowBlock($archivedDateTimeField, tabData.$archivedBy);
        }

        function buildPublishedInfoRow() {
            tabData.$publishedDate = components.dateTime.dateBoxReadOnly({id: "publishedDate"});
            tabData.$publishedTime = components.dateTime.timeBoxReadOnly({id: "publishedTime"});
            tabData.$publishedBy = components.texts.textBox("<div>", {
                id: "publishedBy",
                readonly: "readonly"
            });

            var $publishedDateTimeField = buildDateTimeField("Published", tabData.$publishedDate, tabData.$publishedTime);
            return buildRowBlock($publishedDateTimeField, tabData.$publishedBy);
        }

        function buildPublicationEndInfoRow() {
            tabData.$publicationEndDate = components.dateTime.dateBoxReadOnly({id: "publishEndDate"});
            tabData.$publicationEndTime = components.dateTime.timeBoxReadOnly({id: "publishEndTime"});
            tabData.$publicationEndBy = components.texts.textBox("<div>", {
                id: "publishEndBy",
                readonly: "readonly"
            });

            var $publicationEndDateTimeField = buildDateTimeField("Publication end", tabData.$publicationEndDate,
                tabData.$publicationEndTime
            );
            return buildRowBlock($publicationEndDateTimeField, tabData.$publicationEndBy);
        }

        return {
            name: "status",
            buildTab: function (index) {
                return linker.buildFormBlock([
                    buildCreatedInfoRow(),
                    buildModifiedInfoRow(),
                    buildArchivedInfoRow(),
                    buildPublishedInfoRow(),
                    buildPublicationEndInfoRow()
                ], index);
            },
            fillTabDataFromDocument: function (document) {
                tabData.$createdDate.setDate(document.created.date);
                tabData.$createdTime.setTime(document.created.time);
                tabData.$createdBy.setValue(document.created.by);

                tabData.$modifiedDate.setDate(document.modified.date);
                tabData.$modifiedTime.setTime(document.modified.time);
                tabData.$modifiedBy.setValue(document.modified.by);

                tabData.$archivedDate.setDate(document.archived.date);
                tabData.$archivedTime.setTime(document.archived.time);
                tabData.$archivedBy.setValue(document.archived.by);

                tabData.$publishedDate.setDate(document.published.date);
                tabData.$publishedTime.setTime(document.published.time);
                tabData.$publishedBy.setValue(document.published.by);

                tabData.$publicationEndDate.setDate(document.publication_end.date);
                tabData.$publicationEndTime.setTime(document.publication_end.time);
                tabData.$publicationEndBy.setValue(document.publication_end.by);
            },
            clearTabData: function () {
                var emptyString = '';

                tabData.$createdDate.setDate(emptyString);
                tabData.$createdTime.setTime(emptyString);
                tabData.$createdBy.setValue(emptyString);

                tabData.$modifiedDate.setDate(emptyString);
                tabData.$modifiedTime.setTime(emptyString);
                tabData.$modifiedBy.setValue(emptyString);

                tabData.$archivedDate.setDate(emptyString);
                tabData.$archivedTime.setTime(emptyString);
                tabData.$archivedBy.setValue(emptyString);

                tabData.$publishedDate.setDate(emptyString);
                tabData.$publishedTime.setTime(emptyString);
                tabData.$publishedBy.setValue(emptyString);

                tabData.$publicationEndDate.setDate(emptyString);
                tabData.$publicationEndTime.setTime(emptyString);
                tabData.$publicationEndBy.setValue(emptyString);
            }
        };
    }
);
