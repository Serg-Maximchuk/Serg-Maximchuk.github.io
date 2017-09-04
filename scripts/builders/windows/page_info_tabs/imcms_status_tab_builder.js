Imcms.define("imcms-status-tab-builder",
    [
        "imcms-date-picker", "imcms-time-picker",
        "imcms-bem-builder", "imcms-components-builder",
        "imcms-page-info-tabs-linker"
    ],
    function (DatePicker, TimePicker, BEM, components, linker) {

        return {
            name: "status",
            data: {},
            buildTab: function (index) {
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
                    ),
                    $created = statusFieldBEM.buildBlock("<div>", [
                        {
                            "item": $createdDateTimeField,
                            modifiers: ["col-3", "float-l"]
                        }, {
                            "item": $createdByField,
                            modifiers: ["col-2-3", "float-l"]
                        }]
                    );

                this.data.createdDate = new DatePicker($createdDate);
                this.data.createdTime = new TimePicker($createdTime);
                this.data.$createdBy = $createdBy;

                // modified by

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
                    ),
                    $modified = statusFieldBEM.buildBlock("<div>", [
                        {
                            "item": $modifiedDateTimeField,
                            modifiers: ["col-3", "float-l"]
                        }, {
                            "item": $modifiedByField,
                            modifiers: ["col-2-3", "float-l"]
                        }]
                    );

                this.data.modifiedDate = new DatePicker($modifiedDate);
                this.data.modifiedTime = new TimePicker($modifiedTime);
                this.data.$modifiedBy = $modifiedBy;

                // archived

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
                    ),
                    $archived = statusFieldBEM.buildBlock("<div>", [
                        {
                            "item": $archivedDateTimeField,
                            modifiers: ["col-3", "float-l"]
                        }, {
                            "item": $archivedByField,
                            modifiers: ["col-2-3", "float-l"]
                        }]
                    );

                this.data.archivedDate = new DatePicker($archivedDate);
                this.data.archivedTime = new TimePicker($archivedTime);
                this.data.$archivedBy = $archivedBy;

                // published

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
                    ),
                    $published = statusFieldBEM.buildBlock("<div>", [
                        {
                            "item": $publishedDateTimeField,
                            modifiers: ["col-3", "float-l"]
                        }, {
                            "item": $publishedByField,
                            modifiers: ["col-2-3", "float-l"]
                        }]
                    );

                this.data.publishedDate = new DatePicker($publishedDate);
                this.data.publishedTime = new TimePicker($publishedTime);
                this.data.$publishedBy = $publishedBy;

                // publication end

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
                    ),
                    $publicationEnd = statusFieldBEM.buildBlock("<div>", [
                        {
                            "item": $publicationEndDateTimeField,
                            modifiers: ["col-3", "float-l"]
                        }, {
                            "item": $publicationEndByField,
                            modifiers: ["col-2-3", "float-l"]
                        }]
                    );

                this.data.publicationEndDate = new DatePicker($publicationEndDate);
                this.data.publicationEndTime = new TimePicker($publicationEndTime);
                this.data.$publicationEndBy = $publicationEndBy;

                var blockElements = [
                    $created,
                    $modified,
                    $archived,
                    $published,
                    $publicationEnd
                ];

                return linker.buildFormBlock(blockElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var statusTab = this.data;

                statusTab.createdDate.setDate(document.created.date);
                statusTab.createdTime.setTime(document.created.time);
                statusTab.$createdBy.setValue(document.created.by);

                statusTab.modifiedDate.setDate(document.modified.date);
                statusTab.modifiedTime.setTime(document.modified.time);
                statusTab.$modifiedBy.setValue(document.modified.by);

                statusTab.archivedDate.setDate(document.archived.date);
                statusTab.archivedTime.setTime(document.archived.time);
                statusTab.$archivedBy.setValue(document.archived.by);

                statusTab.publishedDate.setDate(document.published.date);
                statusTab.publishedTime.setTime(document.published.time);
                statusTab.$publishedBy.setValue(document.published.by);

                statusTab.publicationEndDate.setDate(document.publication_end.date);
                statusTab.publicationEndTime.setTime(document.publication_end.time);
                statusTab.$publicationEndBy.setValue(document.publication_end.by);
            },
            clearTabData: function () {
                var statusTab = this.data,
                    emptyString = '';

                statusTab.createdDate.setDate(emptyString);
                statusTab.createdTime.setTime(emptyString);
                statusTab.$createdBy.setValue(emptyString);

                statusTab.modifiedDate.setDate(emptyString);
                statusTab.modifiedTime.setTime(emptyString);
                statusTab.$modifiedBy.setValue(emptyString);

                statusTab.archivedDate.setDate(emptyString);
                statusTab.archivedTime.setTime(emptyString);
                statusTab.$archivedBy.setValue(emptyString);

                statusTab.publishedDate.setDate(emptyString);
                statusTab.publishedTime.setTime(emptyString);
                statusTab.$publishedBy.setValue(emptyString);

                statusTab.publicationEndDate.setDate(emptyString);
                statusTab.publicationEndTime.setTime(emptyString);
                statusTab.$publicationEndBy.setValue(emptyString);
            }
        };
    }
);
