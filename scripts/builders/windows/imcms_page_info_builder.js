/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    [
        "imcms-date-picker", "imcms-time-picker", "imcms-bem-builder", "imcms-components-builder",
        "imcms-roles-rest-api", "imcms-templates-rest-api", "imcms-documents-rest-api", "imcms-users-rest-api",
        "imcms-category-types-rest-api", "jquery"
    ],
    function (DatePicker, TimePicker, BEM, components, rolesRestApi, templatesRestApi, documentsRestApi, usersRestApi,
              categoriesTypesRestApi, $) {

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
                }),

                $title = pageInfoHeadBEM.buildElement("title", "<div>", {id: "page-info-title"});

            return pageInfoHeadBEM.buildBlock("<div>", [{"title": $title}]);
        }

        function showPanel(index) {
            $(".imcms-form[data-window-id=" + index + "]").css({"display": "block"});
        }

        var formsBEM = new BEM({
            block: "imcms-form",
            elements: {"field": "imcms-field"}
        });

        function buildFormBlock(elements, index) {
            return formsBEM.buildBlock("<div>", elements, {"data-window-id": index}, "field");
        }

        var tabsData = [{
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

                return buildFormBlock(tabElements, index);
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
        }, {
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

                return buildFormBlock(formElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var lifeCycleTab = this.data;

                lifeCycleTab.$docStatusSelect.selectValue(document.status);

                lifeCycleTab.publishDate.setDate(document.published_date);
                lifeCycleTab.publishTime.setTime(document.published_time);
                lifeCycleTab.publishDateTime.date.setDate(document.published_date);
                lifeCycleTab.publishDateTime.time.setTime(document.published_time);

                lifeCycleTab.archivedDate.setDate(document.archived_date);
                lifeCycleTab.archivedTime.setTime(document.archived_time);
                lifeCycleTab.archivedDateTime.date.setDate(document.archived_date);
                lifeCycleTab.archivedDateTime.time.setTime(document.archived_time);

                lifeCycleTab.publishEndDate.setDate(document.publication_end_date);
                lifeCycleTab.publishEndTime.setTime(document.publication_end_time);
                lifeCycleTab.publishEndDateTime.date.setDate(document.publication_end_date);
                lifeCycleTab.publishEndDateTime.time.setTime(document.publication_end_time);

                lifeCycleTab.$publisherSelect.selectValue(document.publisher);

                components.radios.group(lifeCycleTab.$showDefaultLang, lifeCycleTab.$doNotShow)
                    .checkAmongGroup(document.if_requested_lang_missing_doc_opts);

                lifeCycleTab.$currentVersionNumber.setValue(document.currentVersion);
                lifeCycleTab.docVersionSaveDateTime.date.setDate(document.currentVersionDate);
                lifeCycleTab.docVersionSaveDateTime.time.setTime(document.currentVersionTime);
            }
        }, {
            name: "keywords",
            data: {},
            buildTab: function (index) {
                this.data.$keywordsBox = components.keywords.keywordsBox("<div>", {
                    "input-id": "keyword",
                    title: "Keywords",
                    placeholder: "keyword",
                    "button-text": "ADD+"
                });
                this.data.$searchDisableCheckbox = components.checkboxes.imcmsCheckbox("<div>", {
                    id: "isSearchDisabled",
                    name: "isSearchDisabled",
                    text: "Disable search"
                });
                var $checkboxField = components.checkboxes.checkboxContainerField("<div>", [
                    this.data.$searchDisableCheckbox
                ]);

                return buildFormBlock([this.data.$keywordsBox, $checkboxField], index);
            },
            fillTabDataFromDocument: function (document) {
                var keywordsTab = this.data;

                document.keywords.forEach(keywordsTab.$keywordsBox.addKeyword);

                keywordsTab.$searchDisableCheckbox.setValue(document.disable_search);

            }
        }, {
            name: "categories",
            data: {},
            buildTab: function (index) {
                this.data.$categoriesBlock = buildFormBlock([], index);
                return this.data.$categoriesBlock;
            },
            fillTabDataFromDocument: function (document) {

                function isDocumentContainsCategory(document, category) {
                    var docCategoriesIds = document.categories.map(function (category) {
                        return category.id;
                    });

                    return docCategoriesIds.indexOf(category.id) !== -1;
                }

                function createMultiSelectCategoryType(categoryType, document) {

                    var categoryTypeAsCheckboxGroup = categoryType.categories.map(function (category) {
                        return components.checkboxes
                            .imcmsCheckbox("<div>", {
                                name: "category-type-" + categoryType.id,
                                value: category.id,
                                text: category.name
                            })
                            .setValue(isDocumentContainsCategory(document, category));
                    });

                    return components.checkboxes.checkboxContainerField("<div>",
                        categoryTypeAsCheckboxGroup,
                        {title: categoryType.name}
                    );
                }

                function createSingleSelectCategoryType(categoryType, document) {
                    var mappedCategoriesForSelectContainer = categoryType.categories.map(function (category) {
                        return {
                            text: category.name,
                            "data-value": category.id
                        };
                    });

                    var $selectContainer = components.selects.selectContainer("<div>", {
                        id: "category-type-" + categoryType.id,
                        text: categoryType.name
                    }, mappedCategoriesForSelectContainer);

                    categoryType.categories.filter(function (category) {
                        return isDocumentContainsCategory(document, category);
                    }).forEach(function (category) {
                        $selectContainer.selectValue(category.id);
                    });

                    return $selectContainer;
                }

                var categoriesBlockElements = [],
                    parentContext = this;

                categoriesTypesRestApi.read(null)
                    .done(function (categoriesTypes) {
                        categoriesTypes.forEach(function (categoryType) {
                            var $categoryType;
                            if (categoryType.multi_select) {
                                $categoryType = createMultiSelectCategoryType(categoryType, document);
                            } else {
                                $categoryType = createSingleSelectCategoryType(categoryType, document);
                            }

                            categoriesBlockElements.push($categoryType);

                            parentContext.data.$categoriesBlock.append(categoriesBlockElements);
                        });
                    });

            }
        }, {
            name: "access",
            data: {},
            buildTab: function (index) {
                var addRoleContainerBEM = new BEM({
                        block: "imcms-field",
                        elements: {
                            "access-role": "imcms-access-addrole"
                        }
                    }),
                    addRoleInnerBEM = new BEM({
                        block: "imcms-access-addrole",
                        elements: {
                            "select": "imcms-select",
                            "button": "imcms-button"
                        }
                    })
                ;

                var $addRoleSelect = components.selects.imcmsSelect("<div>", {
                    id: "select3"
                });

                rolesRestApi.read(null)
                    .done(function (roles) {
                        var rolesDataMapped = roles.map(function (role) {
                            return {
                                text: role.name,
                                "data-value": role.id
                            }
                        });
                        $addRoleSelect.append(components.selects.mapOptionsToSelectItems(rolesDataMapped));
                    });

                var $addRoleButton = components.buttons.neutralButton({
                        text: "Add role",
                        click: function () {
                            console.log("%c Not implemented feature: add role.", "color: red;")
                        }
                    }),
                    $addRoleInnerBlock = addRoleInnerBEM.buildBlock("<div>", [
                        {"select": $addRoleSelect},
                        {"button": $addRoleButton}
                    ]),
                    $addRoleContainer = addRoleContainerBEM.buildBlock("<div>", [{"access-role": $addRoleInnerBlock}])
                ;

                this.data.$accessBlock = buildFormBlock([$addRoleContainer], index);
                return this.data.$accessBlock;
            },
            fillTabDataFromDocument: function (document) {

                var rolesBEM = new BEM({
                        block: "imcms-access-role",
                        elements: {
                            "head": "",
                            "title": "imcms-title",
                            "body": "",
                            "row": "",
                            "column-title": "imcms-title",
                            "column": "imcms-radio",
                            "button": "imcms-button"
                        }
                    }),
                    rolesContainerBEM = new BEM({
                        block: "imcms-field",
                        elements: {
                            "access-role": "imcms-access-role"
                        }
                    })
                ;

                var $titleRole = rolesBEM.buildBlockElement("title", "<div>", {text: "role"}),
                    $titleView = rolesBEM.buildBlockElement("title", "<div>", {text: "view"}),
                    $titleEdit = rolesBEM.buildBlockElement("title", "<div>", {text: "edit"}),
                    $titleRestricted1 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 1"}),
                    $titleRestricted2 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 2"}),
                    $rolesHead = rolesBEM.buildElement("head", "<div>").append([
                        $titleRole,
                        $titleView,
                        $titleEdit,
                        $titleRestricted1,
                        $titleRestricted2
                    ]),
                    roles = generateRoles(rolesBEM, document),
                    $rolesBody = rolesBEM.buildElement("body", "<div>").append(roles),
                    $rolesTable = rolesBEM.buildBlock("<div>", [
                        {"head": $rolesHead},
                        {"body": $rolesBody}
                    ]),
                    $rolesField = rolesContainerBEM.buildBlock("<div>", [{"access-role": $rolesTable}])
                ;

                this.data.$accessBlock.prepend($rolesField);

                function generateRoles(rolesBEM, document) {

                    function checkIfRoleNamePermittedInRole(roleName, role) {
                        return roleName === role.permission_name ? "checked" : undefined;
                    }

                    return document.roles.map(function (role) {
                        var $roleTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: role.name}),
                            viewRoleName = "VIEW",
                            $roleView = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": viewRoleName,
                                checked: checkIfRoleNamePermittedInRole(viewRoleName, role)
                            })),
                            editRoleName = "EDIT",
                            $roleEdit = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": editRoleName,
                                checked: checkIfRoleNamePermittedInRole(editRoleName, role)
                            })),
                            restricted1RoleName = "RESTRICTED_1",
                            $roleRestricted1 = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": restricted1RoleName,
                                checked: checkIfRoleNamePermittedInRole(restricted1RoleName, role)
                            })),
                            restricted2RoleName = "RESTRICTED_2",
                            $roleRestricted2 = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": restricted2RoleName,
                                checked: checkIfRoleNamePermittedInRole(restricted2RoleName, role)
                            })),
                            $deleteRoleButton = rolesBEM.makeBlockElement("button", components.buttons.closeButton({
                                click: function () {
                                    console.log("%c Not implemented feature: delete role.", "color: red;")
                                }
                            }));

                        return rolesBEM.buildBlockElement("row", "<div>").append([
                            $roleTitle,
                            $roleView,
                            $roleEdit,
                            $roleRestricted1,
                            $roleRestricted2,
                            $deleteRoleButton
                        ]);
                    });
                }
            }
        }, {
            name: "permissions",
            data: {},
            buildTab: function (index) {
                function createRestrictedCheckboxesDependingOnIndex(index) {
                    return mapCheckboxesFromAttributesArray([{
                        name: "edit_text" + index,
                        text: "Edit text"
                    }, {
                        name: "edit_menu" + index,
                        text: "Edit menu"
                    }, {
                        name: "edit_image" + index,
                        text: "Edit image"
                    }, {
                        name: "edit_loop" + index,
                        text: "Edit loop"
                    }, {
                        name: "edit_doc_info" + index,
                        text: "Edit doc info"
                    }]);
                }

                function mapCheckboxesFromAttributesArray(attributesArr) {
                    return attributesArr.map(function (attributes) {
                        return components.checkboxes.imcmsCheckbox("<div>", attributes);
                    });
                }

                var fieldItemBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "item": "imcms-col-3"
                    }
                });

                var restrictedCheckboxes0 = createRestrictedCheckboxesDependingOnIndex(0);
                var $restrictedRole1Rights = components.checkboxes.checkboxContainer("<div>",
                    restrictedCheckboxes0,
                    {title: "Restricted 1"}
                );

                var restrictedCheckboxes1 = createRestrictedCheckboxesDependingOnIndex(1);
                var $restrictedRole2Rights = components.checkboxes.checkboxContainer("<div>",
                    restrictedCheckboxes1,
                    {title: "Restricted 2"}
                );

                this.data.restrictedCheckboxes = restrictedCheckboxes0.concat(restrictedCheckboxes1);

                var $permissionsWrapper = fieldItemBEM.buildBlock("<div>", [{
                    "item": $restrictedRole1Rights,
                    modifiers: ["float-l", "col-3"]
                }, {
                    "item": $restrictedRole2Rights,
                    modifiers: ["float-l", "col-3"]
                }]);

                return buildFormBlock([$permissionsWrapper], index);
            },
            fillTabDataFromDocument: function (document) {
                var permissionsTab = this.data,

                    restrictedCheckboxes = {};

                permissionsTab.restrictedCheckboxes.forEach(function (permission) {
                    restrictedCheckboxes[permission.find("input").prop("name")] = permission;
                });

                document.permissions.forEach(function (permission, index) {
                    var edit_text = "edit_text",
                        edit_menu = "edit_menu",
                        edit_image = "edit_image",
                        edit_loop = "edit_loop",
                        edit_doc_info = "edit_doc_info";

                    restrictedCheckboxes[edit_text + index].setValue(permission[edit_text]);
                    restrictedCheckboxes[edit_menu + index].setValue(permission[edit_menu]);
                    restrictedCheckboxes[edit_image + index].setValue(permission[edit_image]);
                    restrictedCheckboxes[edit_loop + index].setValue(permission[edit_loop]);
                    restrictedCheckboxes[edit_doc_info + index].setValue(permission[edit_doc_info]);
                });
            }
        }, {
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

                        var $selectItems = components.selects.mapOptionsToSelectItems(templatesDataMapped);
                        parentContext.data.$templateSelect.find(".imcms-select").append($selectItems);
                        parentContext.data.$defaultChildTemplateSelect.find(".imcms-select")
                            .append($selectItems.clone(true, true));
                    });

                var blockElements = [
                    this.data.$templateSelect,
                    this.data.$defaultChildTemplateSelect
                ];
                return buildFormBlock(blockElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var templatesTab = this.data;

                templatesTab.$templateSelect.selectValue(document.template);
                templatesTab.$defaultChildTemplateSelect.selectValue(document.child_template);
            }
        }, {
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

                return buildFormBlock(blockElements, index);
            },
            fillTabDataFromDocument: function (document) {
                var statusTab = this.data;

                statusTab.createdDate.setDate(document.created_date);
                statusTab.createdTime.setTime(document.created_time);
                statusTab.$createdBy.setValue(document.created_by);

                statusTab.modifiedDate.setDate(document.modified_date);
                statusTab.modifiedTime.setTime(document.modified_time);
                statusTab.$modifiedBy.setValue(document.modified_by);

                statusTab.archivedDate.setDate(document.archived_date);
                statusTab.archivedTime.setTime(document.archived_time);
                statusTab.$archivedBy.setValue(document.archived_by);

                statusTab.publishedDate.setDate(document.published_date);
                statusTab.publishedTime.setTime(document.published_time);
                statusTab.$publishedBy.setValue(document.published_by);

                statusTab.publicationEndDate.setDate(document.publication_end_date);
                statusTab.publicationEndTime.setTime(document.publication_end_time);
                statusTab.$publicationEndBy.setValue(document.publication_end_by);
            }
        }];

        function buildPageInfoTabs() {
            function getOnTabClick(index) {
                return function () {
                    $pageInfo.find(".imcms-title--active").removeClass("imcms-title--active");
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
                return tabData.buildTab(index).css("display", (index === 0 ? "block" : "none"));
            });

            return pageInfoBEM.buildElement("right-side", "<div>").append($forms);
        }

        function buildPageInfoFooter() {
            function closePageInfo() {
                $pageInfo.css({"display": "none"});
                $shadow.css({"display": "none"});
                clearPageInfoData();
            }

            var $saveBtn = components.buttons.positiveButton({
                text: "ok",
                click: function () {
                    // todo: save things
                    closePageInfo.call(this);
                }
            });

            var $cancelBtn = components.buttons.negativeButton({
                text: "cancel",
                click: function () {
                    // todo: cancel things
                    closePageInfo.call(this);
                }
            });

            var $saveAndPublishBtn = components.buttons.saveButton({
                text: "save and publish this version",
                click: function () {
                    // todo: save and publish
                    closePageInfo.call(this);
                }
            });

            return pageInfoBEM.buildElement("footer", "<div>").append($saveAndPublishBtn, $cancelBtn, $saveBtn);
        }

        function buildShadow() {
            var $modal = $(".imcms-modal-layout");

            if ($modal.length) {
                $modal.css("display", "block");
                return $modal;
            }

            return $("<div>", {"class": "imcms-modal-layout"}).appendTo("body");
        }

        var $pageInfo;
        var $shadow;

        function buildPageInfo() {
            var $head = buildPageInfoHead(),
                $tabs = buildPageInfoTabs(),
                $panels = buildPageInfoPanels(),
                $footer = buildPageInfoFooter();

            return pageInfoBEM.buildBlock("<div>", [
                    {"head": $head},
                    {"left-side": $tabs},
                    {"right-side": $panels},
                    {"footer": $footer}
                ],
                {"data-menu": "pageInfo"}
            );
        }

        function loadPageInfoDataFromDocumentBy(docId) {
            documentsRestApi.read(docId)
                .done(function (document) {
                    $("#page-info-title").text("document " + document.id);
                    tabsData.forEach(function (tab) {
                        tab.fillTabDataFromDocument(document);
                    });
                });
        }

        function clearPageInfoData() {

        }

        return {
            build: function (docId) {
                $shadow = buildShadow();

                if (!$pageInfo) {
                    $pageInfo = buildPageInfo().appendTo("body");
                }

                $pageInfo.css({"display": "block"});

                docId && loadPageInfoDataFromDocumentBy(docId);
            }
        }
    }
);
