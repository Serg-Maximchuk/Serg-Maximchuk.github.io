Imcms.define("imcms-appearance-tab-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-page-info-tabs-linker"
    ],
    function (BEM, components, linker) {
        return {
            name: "appearance",
            data: {},
            buildTab: function (index) {
                var pageInfoInnerStructureBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "checkboxes": "imcms-checkboxes",
                        "text-box": "imcms-text-box",
                        "text-area": "imcms-text-area",
                        "choose-image": "imcms-choose-image",
                        "select": "imcms-select"
                    }
                });

                this.data.$engCheckbox = components.checkboxes.imcmsCheckbox("<div>", {
                    name: "english",
                    text: "English",
                    checked: "checked"
                });

                var $engCheckboxWrapper = components.checkboxes.checkboxContainer("<div>", [
                    this.data.$engCheckbox
                ]);
                var $engCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "checkboxes": $engCheckboxWrapper
                }]);

                this.data.$engPageTitle = components.texts.textBox("<div>", {
                    name: "title",
                    text: "Title",
                    placeholder: "Start page"
                });

                var $pageTitleContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"text-box": this.data.$engPageTitle}
                ]);

                this.data.$engMenuText = components.texts.textArea("<div>", {
                    text: "Menu text",
                    name: "menu-text"
                });

                var $menuTextContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"text-area": this.data.$engMenuText}
                ]);

                this.data.$engLinkToImage = components.chooseImage.container("<div>", {
                    id: "path-to-image",
                    name: "image",
                    placeholder: "Image path",
                    "label-text": "Link to image",
                    "button-text": "choose..."
                });

                var $linkToImageContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "choose-image": this.data.$engLinkToImage
                }]);

                this.data.$sweCheckbox = components.checkboxes.imcmsCheckbox("<div>", {
                    name: "swedish",
                    text: "Swedish"
                });

                var $sweCheckboxWrapper = components.checkboxes.checkboxContainer("<div>", [
                        this.data.$sweCheckbox
                    ]),
                    $sweCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "checkboxes": $sweCheckboxWrapper
                    }]);

                this.data.$swePageTitle = components.texts.textBox("<div>", {
                    name: "title",
                    text: "Title",
                    placeholder: "Startsida"
                });

                var $pageTitleSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "text-box": this.data.$swePageTitle
                }]);

                this.data.$sweMenuText = components.texts.textArea("<div>", {
                    text: "Menu text",
                    name: "menu-text"
                });

                var $menuTextSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "text-area": this.data.$sweMenuText
                }]);

                this.data.$linkToImageSwe = components.chooseImage.container("<div>", {
                    id: "path-to-image-swe",
                    name: "image",
                    placeholder: "Image path",
                    "label-text": "Link to image",
                    "button-text": "choose..."
                });

                var $linkToImageSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "choose-image": this.data.$linkToImageSwe
                }]);

                this.data.$showIn = components.selects.imcmsSelect("<div>", {
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
                }]);

                var $showInContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"select": this.data.$showIn}
                ]);

                this.data.$documentAlias = components.texts.textBox("<div>", {
                    name: "alias",
                    text: "Document alias",
                    placeholder: "this-doc-alias"
                });

                var $documentAliasContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"text-box": this.data.$documentAlias}
                ]);

                var tabElements = [
                    $engCheckboxContainer,
                    $pageTitleContainer,
                    $menuTextContainer,
                    $linkToImageContainer,
                    $sweCheckboxContainer,
                    $pageTitleSweContainer,
                    $menuTextSweContainer,
                    $linkToImageSweContainer,
                    $showInContainer,
                    $documentAliasContainer
                ];

                return linker.buildFormBlock(tabElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var appearanceTab = this.data,

                    englishLanguage = document.languages["eng"],
                    swedishLanguage = document.languages["swe"];

                appearanceTab.$engCheckbox.setLabelText(englishLanguage.name)
                    .setValue(englishLanguage.enabled);
                appearanceTab.$engPageTitle.setValue(englishLanguage.title);
                appearanceTab.$engMenuText.setValue(englishLanguage.menu_text);

                appearanceTab.$sweCheckbox.setLabelText(swedishLanguage.name)
                    .setValue(swedishLanguage.enabled);
                appearanceTab.$swePageTitle.setValue(swedishLanguage.title);
                appearanceTab.$sweMenuText.setValue(swedishLanguage.menu_text);

                appearanceTab.$showIn.selectValue(document.show_in);

                appearanceTab.$documentAlias.setValue(document.alias);
            }
        };
    }
);
