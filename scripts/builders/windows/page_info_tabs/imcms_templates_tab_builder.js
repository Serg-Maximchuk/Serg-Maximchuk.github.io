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
                var $templateSelectContainer = components.selects.selectContainer("<div>", {
                    name: "template",
                    text: "Template"
                });
                this.data.$templateSelect = $templateSelectContainer.getSelect();

                var $defaultChildTemplateSelectContainer = components.selects.selectContainer("<div>", {
                    name: "childTemplate",
                    text: "Default child template"
                });
                this.data.$defaultChildTemplateSelect = $templateSelectContainer.getSelect();

                var parentContext = this;
                templatesRestApi.read(null)
                    .done(function (templates) {
                        var templatesDataMapped = templates.map(function (template) {
                            return {
                                text: template.name,
                                "data-value": template.id
                            }
                        });

                        components.selects.addOptionsToSelect(templatesDataMapped, parentContext.data.$templateSelect);
                        components.selects.addOptionsToSelect(templatesDataMapped, parentContext.data.$defaultChildTemplateSelect);
                    });

                var blockElements = [
                    $templateSelectContainer,
                    $defaultChildTemplateSelectContainer
                ];
                return linker.buildFormBlock(blockElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var templatesTab = this.data;

                templatesTab.$templateSelect.selectValue(document.template);
                templatesTab.$defaultChildTemplateSelect.selectValue(document.child_template);
            },
            clearTabData: function () {
                var templatesTab = this.data;

                templatesTab.$templateSelect.selectFirst();
                templatesTab.$defaultChildTemplateSelect.selectFirst();
            }
        };
    }
);
