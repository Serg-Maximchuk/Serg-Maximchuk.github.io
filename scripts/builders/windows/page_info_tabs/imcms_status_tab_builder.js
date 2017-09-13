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

        function buildRowBlock($dateTimeField, $doneByField) {
            return new BEM({
                block: "imcms-field",
                elements: {
                    "item": "imcms-item"
                }
            }).buildBlock("<div>", [{
                    "item": $dateTimeField,
                    modifiers: ["col-3", "float-l"]
                }, {
                    "item": $doneByField,
                    modifiers: ["col-2-3", "float-l"]
                }]
            );
        }

        function buildCreatedInfoRow() {
            var $createdTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Created"}),
                $createdDate = components.dateTime.dateBoxReadOnly({id: "createdDate"}),
                $createdTime = components.dateTime.timeBoxReadOnly({id: "createdTime"}),
                $createdDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $createdTimeTitle
                }, {
                    "input": $createdDate,
                    modifiers: boxModifiers
                }, {
                    "input": $createdTime,
                    modifiers: boxModifiers
                }]),
                $createdByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"}),
                $createdBy = components.texts.textBox("<div>", {
                    id: "createdBy",
                    readonly: "readonly"
                }),
                $createdByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $createdByTitle
                    }, {
                        "input": $createdBy,
                        modifiers: boxModifiers
                    }]
                )
            ;
            tabData.createdDate = new DatePicker($createdDate);
            tabData.createdTime = new TimePicker($createdTime);
            tabData.$createdBy = $createdBy;

            return buildRowBlock($createdDateTimeField, $createdByField);
        }

        function buildModifiedInfoRow() {
            var $modifiedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Modified"}),
                $modifiedDate = components.dateTime.dateBoxReadOnly({id: "modifiedDate"}),
                $modifiedTime = components.dateTime.timeBoxReadOnly({id: "modifiedTime"}),
                $modifiedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $modifiedTimeTitle
                }, {
                    "input": $modifiedDate,
                    modifiers: boxModifiers
                }, {
                    "input": $modifiedTime,
                    modifiers: boxModifiers
                }]),
                $modifiedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"}),
                $modifiedBy = components.texts.textBox("<div>", {
                    id: "modifiedBy",
                    readonly: "readonly"
                }),
                $modifiedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $modifiedByTitle
                    }, {
                        "input": $modifiedBy,
                        modifiers: boxModifiers
                    }]
                )
            ;
            tabData.modifiedDate = new DatePicker($modifiedDate);
            tabData.modifiedTime = new TimePicker($modifiedTime);
            tabData.$modifiedBy = $modifiedBy;

            return buildRowBlock($modifiedDateTimeField, $modifiedByField);
        }

        function buildArchivedInfoRow() {
            var $archivedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Archived"}),
                $archivedDate = components.dateTime.dateBoxReadOnly({id: "archivedDate"}),
                $archivedTime = components.dateTime.timeBoxReadOnly({id: "archivedTime"}),
                $archivedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $archivedTimeTitle
                }, {
                    "input": $archivedDate,
                    modifiers: boxModifiers
                }, {
                    "input": $archivedTime,
                    modifiers: boxModifiers
                }]),
                $archivedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"}),
                $archivedBy = components.texts.textBox("<div>", {
                    id: "archivedBy",
                    readonly: "readonly"
                }),
                $archivedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $archivedByTitle
                    }, {
                        "input": $archivedBy,
                        modifiers: boxModifiers
                    }]
                )
            ;
            tabData.archivedDate = new DatePicker($archivedDate);
            tabData.archivedTime = new TimePicker($archivedTime);
            tabData.$archivedBy = $archivedBy;

            return buildRowBlock($archivedDateTimeField, $archivedByField);
        }

        function buildPublishedInfoRow() {
            var $publishedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Published"}),
                $publishedDate = components.dateTime.dateBoxReadOnly({id: "publishedDate"}),
                $publishedTime = components.dateTime.timeBoxReadOnly({id: "publishedTime"}),
                $publishedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $publishedTimeTitle
                }, {
                    "input": $publishedDate,
                    modifiers: boxModifiers
                }, {
                    "input": $publishedTime,
                    modifiers: boxModifiers
                }]),
                $publishedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"}),
                $publishedBy = components.texts.textBox("<div>", {
                    id: "publishedBy",
                    readonly: "readonly"
                }),
                $publishedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $publishedByTitle
                    }, {
                        "input": $publishedBy,
                        modifiers: boxModifiers
                    }]
                )
            ;
            tabData.publishedDate = new DatePicker($publishedDate);
            tabData.publishedTime = new TimePicker($publishedTime);
            tabData.$publishedBy = $publishedBy;

            return buildRowBlock($publishedDateTimeField, $publishedByField);
        }

        function buildPublicationEndInfoRow() {
            var $publicationEndTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Publication end"}),
                $publicationEndDate = components.dateTime.dateBoxReadOnly({id: "publishEndDate"}),
                $publicationEndTime = components.dateTime.timeBoxReadOnly({id: "publishEndTime"}),
                $publicationEndDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $publicationEndTimeTitle
                }, {
                    "input": $publicationEndDate,
                    modifiers: boxModifiers
                }, {
                    "input": $publicationEndTime,
                    modifiers: boxModifiers
                }]),
                $publicationEndByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"}),
                $publicationEndBy = components.texts.textBox("<div>", {
                    id: "publishEndBy",
                    readonly: "readonly"
                }),
                $publicationEndByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $publicationEndByTitle
                    }, {
                        "input": $publicationEndBy,
                        modifiers: boxModifiers
                    }]
                )
            ;
            tabData.publicationEndDate = new DatePicker($publicationEndDate);
            tabData.publicationEndTime = new TimePicker($publicationEndTime);
            tabData.$publicationEndBy = $publicationEndBy;

            return buildRowBlock($publicationEndDateTimeField, $publicationEndByField);
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
                tabData.createdDate.setDate(document.created.date);
                tabData.createdTime.setTime(document.created.time);
                tabData.$createdBy.setValue(document.created.by);

                tabData.modifiedDate.setDate(document.modified.date);
                tabData.modifiedTime.setTime(document.modified.time);
                tabData.$modifiedBy.setValue(document.modified.by);

                tabData.archivedDate.setDate(document.archived.date);
                tabData.archivedTime.setTime(document.archived.time);
                tabData.$archivedBy.setValue(document.archived.by);

                tabData.publishedDate.setDate(document.published.date);
                tabData.publishedTime.setTime(document.published.time);
                tabData.$publishedBy.setValue(document.published.by);

                tabData.publicationEndDate.setDate(document.publication_end.date);
                tabData.publicationEndTime.setTime(document.publication_end.time);
                tabData.$publicationEndBy.setValue(document.publication_end.by);
            },
            clearTabData: function () {
                var emptyString = '';

                tabData.createdDate.setDate(emptyString);
                tabData.createdTime.setTime(emptyString);
                tabData.$createdBy.setValue(emptyString);

                tabData.modifiedDate.setDate(emptyString);
                tabData.modifiedTime.setTime(emptyString);
                tabData.$modifiedBy.setValue(emptyString);

                tabData.archivedDate.setDate(emptyString);
                tabData.archivedTime.setTime(emptyString);
                tabData.$archivedBy.setValue(emptyString);

                tabData.publishedDate.setDate(emptyString);
                tabData.publishedTime.setTime(emptyString);
                tabData.$publishedBy.setValue(emptyString);

                tabData.publicationEndDate.setDate(emptyString);
                tabData.publicationEndTime.setTime(emptyString);
                tabData.$publicationEndBy.setValue(emptyString);
            }
        };
    }
);
