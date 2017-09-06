Imcms.define("imcms-templates-tab-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-templates-rest-api",
        "imcms-page-info-tabs-linker"
    ],
    function (BEM, components, templatesRestApi, linker) {

        return {
            name: "templates",
            data: {},
            buildTab: function (index) {
                this.data.$templateSelect = components.selects.selectContainer("<div>", {
                    name: "template",
                    text: "Template"
                });

                this.data.$defaultChildTemplateSelect = components.selects.selectContainer("<div>", {
                    name: "childTemplate",
                    text: "Default child template"
                });

                var parentContext = this;
                templatesRestApi.read(null)
                    .done(function (templates) {
                        var templatesDataMapped = templates.map(function (template) {
                            return {
                                text: template.name,
                                "data-value": template.id
                            }
                        });

                        components.selects.addOptionsToSelect(templatesDataMapped, parentContext.data.$templateSelect.getSelect());
                        components.selects.addOptionsToSelect(templatesDataMapped, parentContext.data.$defaultChildTemplateSelect.getSelect());
                    });

                var blockElements = [
                    this.data.$templateSelect,
                    this.data.$defaultChildTemplateSelect
                ];
                return linker.buildFormBlock(blockElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var templatesTab = this.data;

                templatesTab.$templateSelect.getSelect().selectValue(document.template);
                templatesTab.$defaultChildTemplateSelect.getSelect().selectValue(document.child_template);
            },
            clearTabData: function () {
                var templatesTab = this.data;

                templatesTab.$templateSelect.getSelect().selectFirst();
                templatesTab.$defaultChildTemplateSelect.getSelect().selectFirst();
            }
        };
    }
);
