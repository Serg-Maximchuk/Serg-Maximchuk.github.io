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

        var pageInfoElements = {};

        function buildPageInfoHead() {
            var pageInfoHeadBEM = new BEM({
                block: "imcms-head",
                elements: {
                    "title": "imcms-title"
                }
            });

            pageInfoElements.$title = pageInfoHeadBEM.buildElement("title", "<div>");

            return pageInfoHeadBEM.buildBlock("<div>", [{"title": pageInfoElements.$title}]);
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

                pageInfoElements.appearance = {};

                pageInfoElements.appearance.$engCheckbox = components.checkboxes.imcmsCheckbox("<div>", {
                    name: "english",
                    text: "English",
                    checked: "checked"
                });

                var $engCheckboxWrapper = components.checkboxes.checkboxContainer("<div>", [
                    pageInfoElements.appearance.$engCheckbox
                ]);
                var $engCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "checkboxes": $engCheckboxWrapper
                }]);

                pageInfoElements.appearance.$engPageTitle = components.texts.textBox("<div>", {
                    name: "title",
                    text: "Title",
                    placeholder: "Start page"
                });

                var $pageTitleContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"text-box": pageInfoElements.appearance.$engPageTitle}
                ]);

                pageInfoElements.appearance.$engMenuText = components.texts.textArea("<div>", {
                    text: "Menu text",
                    name: "menu-text"
                });

                var $menuTextContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"text-area": pageInfoElements.appearance.$engMenuText}
                ]);

                pageInfoElements.appearance.$engLinkToImage = components.chooseImage.container("<div>", {
                    id: "path-to-image",
                    name: "image",
                    placeholder: "Image path",
                    "label-text": "Link to image",
                    "button-text": "choose..."
                });

                var $linkToImageContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "choose-image": pageInfoElements.appearance.$engLinkToImage
                }]);

                pageInfoElements.appearance.$sweCheckbox = components.checkboxes.imcmsCheckbox("<div>", {
                    name: "swedish",
                    text: "Swedish"
                });

                var $sweCheckboxWrapper = components.checkboxes.checkboxContainer("<div>", [
                        pageInfoElements.appearance.$sweCheckbox
                    ]),
                    $sweCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "checkboxes": $sweCheckboxWrapper
                    }]);

                pageInfoElements.appearance.$swePageTitle = components.texts.textBox("<div>", {
                    name: "title",
                    text: "Title",
                    placeholder: "Startsida"
                });

                var $pageTitleSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "text-box": pageInfoElements.appearance.$swePageTitle
                }]);

                pageInfoElements.appearance.$sweMenuText = components.texts.textArea("<div>", {
                    text: "Menu text",
                    name: "menu-text"
                });

                var $menuTextSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "text-area": pageInfoElements.appearance.$sweMenuText
                }]);

                pageInfoElements.appearance.$linkToImageSwe = components.chooseImage.container("<div>", {
                    id: "path-to-image-swe",
                    name: "image",
                    placeholder: "Image path",
                    "label-text": "Link to image",
                    "button-text": "choose..."
                });

                var $linkToImageSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                    "choose-image": pageInfoElements.appearance.$linkToImageSwe
                }]);

                pageInfoElements.appearance.$showIn = components.selects.imcmsSelect("<div>", {
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
                    {"select": pageInfoElements.appearance.$showIn}
                ]);

                pageInfoElements.appearance.$documentAlias = components.texts.textBox("<div>", {
                    name: "alias",
                    text: "Document alias",
                    placeholder: "this-doc-alias"
                });

                var $documentAliasContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [
                    {"text-box": pageInfoElements.appearance.$documentAlias}
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
            }
        }, {
            name: "life cycle",
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

                pageInfoElements.lifeCycle = {};

                pageInfoElements.lifeCycle.$docStatusSelect = components.selects.imcmsSelect("<div>", {
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
                        {"select": pageInfoElements.lifeCycle.$docStatusSelect}
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

                pageInfoElements.lifeCycle.publishTime = new TimePicker($publishTime);
                pageInfoElements.lifeCycle.publishDate = new DatePicker($publishDate);
                pageInfoElements.lifeCycle.publishDateTime = {};
                pageInfoElements.lifeCycle.publishDateTime.date = new DatePicker($publishDateTime);
                pageInfoElements.lifeCycle.publishDateTime.time = new TimePicker($publishDateTime);

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

                pageInfoElements.lifeCycle.archivedTime = new TimePicker($archivedTime);
                pageInfoElements.lifeCycle.archivedDate = new DatePicker($archivedDate);
                pageInfoElements.lifeCycle.archivedDateTime = {};
                pageInfoElements.lifeCycle.archivedDateTime.date = new DatePicker($archivedDateTime);
                pageInfoElements.lifeCycle.archivedDateTime.time = new TimePicker($archivedDateTime);

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

                pageInfoElements.lifeCycle.publishEndTime = new TimePicker($publishEndTime);
                pageInfoElements.lifeCycle.publishEndDate = new DatePicker($publishEndDate);
                pageInfoElements.lifeCycle.publishEndDateTime = {};
                pageInfoElements.lifeCycle.publishEndDateTime.date = new DatePicker($publishEndDateTime);
                pageInfoElements.lifeCycle.publishEndDateTime.time = new TimePicker($publishEndDateTime);

                // publisher select row

                pageInfoElements.lifeCycle.$publisherSelect = components.selects.imcmsSelect("<div>", {
                    id: "doc-publisher",
                    text: "Publisher",
                    name: "publisher"
                });
                usersRestApi.read(null, function (users) {
                    var usersDataMapped = users.map(function (user) {
                            return {
                                text: user.username,
                                "data-value": user.id
                            }
                        }),
                        usersDataAsSelectItems = components.selects.mapOptionsToSelectItems(usersDataMapped)
                    ;

                    pageInfoElements.lifeCycle.$publisherSelect.append(usersDataAsSelectItems);
                });// todo receive users with specific role admin

                var $publisherSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                    {"select": pageInfoElements.lifeCycle.$publisherSelect}
                ]);

                // languages row

                var $languagesTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                    text: "If requested language is missing:"
                });

                pageInfoElements.lifeCycle.$showDefaultLang = components.radios.imcmsRadio("<div>", {
                    text: "Show in default language if enabled",
                    name: "langSetting",
                    value: "SHOW_DEFAULT",
                    checked: "checked"
                });
                pageInfoElements.lifeCycle.$doNotShow = components.radios.imcmsRadio("<div>", {
                    text: "Don't show at all",
                    name: "langSetting",
                    value: "DO_NOT_SHOW"
                });

                var $languagesContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                    {"title": $languagesTitle},
                    {"item": pageInfoElements.lifeCycle.$showDefaultLang},
                    {"item": pageInfoElements.lifeCycle.$doNotShow}
                ]);

                // current version row

                var $currentVersionRowTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                    text: "Current version:"
                });
                pageInfoElements.lifeCycle.$currentVersionNumber = components.texts.textBox("<div>", {
                    readonly: "readonly",
                    value: "0"
                });

                var $docVersionSaveDateTime = components.dateTime.dateTimeReadOnly(),
                    $docVersionContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"title": $currentVersionRowTitle},
                        {
                            "item": pageInfoElements.lifeCycle.$currentVersionNumber,
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

                pageInfoElements.lifeCycle.docVersionSaveDateTime = {};
                pageInfoElements.lifeCycle.docVersionSaveDateTime.date = new DatePicker($docVersionSaveDateTime);
                pageInfoElements.lifeCycle.docVersionSaveDateTime.time = new TimePicker($docVersionSaveDateTime);

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
            }
        }, {
            name: "keywords",
            buildTab: function (index) {
                pageInfoElements.keywords = {};

                pageInfoElements.keywords.$keywordsBox = components.keywords.keywordsBox("<div>", {
                    "input-id": "keyword",
                    title: "Keywords",
                    placeholder: "keyword",
                    "button-text": "ADD+"
                });
                pageInfoElements.keywords.$searchDisableCheckbox = components.checkboxes.imcmsCheckbox("<div>", {
                    id: "isSearchDisabled",
                    name: "isSearchDisabled",
                    text: "Disable search"
                });
                var $checkboxField = components.checkboxes.checkboxContainerField("<div>", [
                    pageInfoElements.keywords.$searchDisableCheckbox
                ]);

                return buildFormBlock([pageInfoElements.keywords.$keywordsBox, $checkboxField], index);
            }
        }, {
            name: "categories",
            buildTab: function (index) {
                pageInfoElements.categories = {};

                var $categoriesBlock = buildFormBlock([], index);
                var categoriesBlockElements = [];

                categoriesTypesRestApi.read(null, function (categoriesTypes) {
                    categoriesTypes.forEach(function (categoryType) {
                        var $categoryType,
                            categoryTypeQualifier = "category-type-" + categoryType.id;

                        pageInfoElements.categories.descriptor = [];

                        if (categoryType.multi_select) {
                            pageInfoElements.categories[categoryTypeQualifier] = {};
                            categoryType.categories.forEach(function (category) {
                                pageInfoElements.categories[categoryTypeQualifier][category.id] = components.checkboxes
                                    .imcmsCheckbox("<div>", {
                                        name: categoryTypeQualifier,
                                        value: category.id,
                                        text: category.name
                                    });

                                pageInfoElements.categories.descriptor.push({
                                    category_ids: [category.id],
                                    access_key_category_type_qualifier: categoryTypeQualifier,
                                    access_key_category_id: category.id,
                                    member_of_multi_select: true
                                });
                            });

                            $categoryType = components.checkboxes.checkboxContainerField("<div>",
                                Object.values(pageInfoElements.categories[categoryTypeQualifier]),
                                {title: categoryType.name}
                            );
                        } else {
                            var mappedCategoriesForSelectContainer = categoryType.categories.map(function (category) {
                                return {
                                    text: category.name,
                                    value: category.id
                                }
                            });

                            $categoryType = components.selects.selectContainer("<div>", {
                                id: categoryTypeQualifier,
                                text: categoryType.name
                            }, mappedCategoriesForSelectContainer);

                            pageInfoElements.categories[categoryTypeQualifier] = $categoryType;

                            pageInfoElements.categories.descriptor.push({
                                category_ids: categoryType.categories.map(function (category) {
                                    return category.id;
                                }),
                                access_key_category_type_qualifier: categoryTypeQualifier,
                                member_of_multi_select: false
                            });
                        }

                        categoriesBlockElements.push($categoryType);

                        $categoriesBlock.append(categoriesBlockElements);
                    });
                });

                return $categoriesBlock;
            }
        }, {
            name: "access",
            buildTab: function (index) {
                pageInfoElements.access = {};


                // var rolesBEM = new BEM({
                //         block: "imcms-access-role",
                //         elements: {
                //             "head": "",
                //             "title": "imcms-title",
                //             "body": "",
                //             "row": "",
                //             "column-title": "imcms-title",
                //             "column": "imcms-radio",
                //             "button": "imcms-button"
                //         }
                //     }),
                //     rolesContainerBEM = new BEM({
                //         block: "imcms-field",
                //         elements: {
                //             "access-role": "imcms-access-role"
                //         }
                //     })
                // ;
                //
                // var $titleRole = rolesBEM.buildBlockElement("title", "<div>", {text: "role"}),
                //     $titleView = rolesBEM.buildBlockElement("title", "<div>", {text: "view"}),
                //     $titleEdit = rolesBEM.buildBlockElement("title", "<div>", {text: "edit"}),
                //     $titleRestricted1 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 1"}),
                //     $titleRestricted2 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 2"}),
                //     $rolesHead = rolesBEM.buildElement("head", "<div>").append([
                //         $titleRole,
                //         $titleView,
                //         $titleEdit,
                //         $titleRestricted1,
                //         $titleRestricted2
                //     ]),
                //     $userAdminTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: "Useradmin"}),
                //     userAdminRadioName = "useradmin0",
                //     $userAdminView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "view01",
                //         name: userAdminRadioName,
                //         checked: "checked"
                //     })),
                //     $userAdminEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "edit01",
                //         name: userAdminRadioName
                //     })),
                //     $userAdminRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "restricted011",
                //         name: userAdminRadioName
                //     })),
                //     $userAdminRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "restricted021",
                //         name: userAdminRadioName
                //     })),
                //     $userAdminDeleteRoleButton = rolesBEM.makeBlockElement("button", componentsBuilder.buttons.closeButton({
                //         click: function () {
                //             console.log("%c Not implemented feature: delete role.", "color: red;")
                //         }
                //     })),
                //     $userAdminRow = rolesBEM.buildBlockElement("row", "<div>").append([
                //         $userAdminTitle,
                //         $userAdminView,
                //         $userAdminEdit,
                //         $userAdminRestricted1,
                //         $userAdminRestricted2,
                //         $userAdminDeleteRoleButton
                //     ]),
                //     $userTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: "Users"}),
                //     usersRadioName = "users0",
                //     $userView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "view02",
                //         name: usersRadioName,
                //         checked: "checked"
                //     })),
                //     $userEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "edit02",
                //         name: usersRadioName
                //     })),
                //     $userRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "restricted012",
                //         name: usersRadioName
                //     })),
                //     $userRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "restricted022",
                //         name: usersRadioName
                //     })),
                //     $userDeleteRoleButton = rolesBEM.makeBlockElement("button", componentsBuilder.buttons.closeButton({
                //         click: function () {
                //             console.log("%c Not implemented feature: delete role.", "color: red;")
                //         }
                //     })),
                //     $userRow = rolesBEM.buildBlockElement("row", "<div>").append([
                //         $userTitle,
                //         $userView,
                //         $userEdit,
                //         $userRestricted1,
                //         $userRestricted2,
                //         $userDeleteRoleButton
                //     ]),
                //     $testRoleTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: "Test role"}),
                //     testRoleRadioName = "testrole0",
                //     $testRoleView = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "view03",
                //         name: testRoleRadioName,
                //         checked: "checked"
                //     })),
                //     $testRoleEdit = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "edit03",
                //         name: testRoleRadioName
                //     })),
                //     $testRoleRestricted1 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "restricted013",
                //         name: testRoleRadioName
                //     })),
                //     $testRoleRestricted2 = rolesBEM.makeBlockElement("column", componentsBuilder.radios.imcmsRadio("<div>", {
                //         id: "restricted023",
                //         name: testRoleRadioName
                //     })),
                //     $testRoleDeleteRoleButton = rolesBEM.makeBlockElement("button", componentsBuilder.buttons.closeButton({
                //         click: function () {
                //             console.log("%c Not implemented feature: delete role.", "color: red;")
                //         }
                //     })),
                //     $testRoleRow = rolesBEM.buildBlockElement("row", "<div>").append([
                //         $testRoleTitle,
                //         $testRoleView,
                //         $testRoleEdit,
                //         $testRoleRestricted1,
                //         $testRoleRestricted2,
                //         $testRoleDeleteRoleButton
                //     ]),
                //     $rolesBody = rolesBEM.buildElement("body", "<div>").append([
                //         $userAdminRow,
                //         $userRow,
                //         $testRoleRow
                //     ]),
                //     $rolesTable = rolesBEM.buildBlock("<div>", [
                //         {"head": $rolesHead},
                //         {"body": $rolesBody}
                //     ]),
                //     $rolesField = rolesContainerBEM.buildBlock("<div>", [{"access-role": $rolesTable}])
                // ;
                // add role

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

                rolesRestApi.read(null, function (roles) {
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

                pageInfoElements.access.$accessBlock = buildFormBlock([$addRoleContainer], index);
                return pageInfoElements.access.$accessBlock;
            }
        }, {
            name: "permissions",
            buildTab: function (index) {
                pageInfoElements.permissions = {};

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

                pageInfoElements.permissions.restrictedCheckboxes = restrictedCheckboxes0.concat(restrictedCheckboxes1);

                var $permissionsWrapper = fieldItemBEM.buildBlock("<div>", [{
                    "item": $restrictedRole1Rights,
                    modifiers: ["float-l", "col-3"]
                }, {
                    "item": $restrictedRole2Rights,
                    modifiers: ["float-l", "col-3"]
                }]);

                return buildFormBlock([$permissionsWrapper], index);
            }
        }, {
            name: "templates",
            buildTab: function (index) {
                pageInfoElements.templates = {};

                pageInfoElements.templates.$templateSelect = components.selects.selectContainer("<div>", {
                    name: "template",
                    text: "Template"
                });

                pageInfoElements.templates.$defaultChildTemplateSelect = components.selects.selectContainer("<div>", {
                    name: "childTemplate",
                    text: "Default child template"
                });

                templatesRestApi.read(null, function (templates) {
                    var templatesDataMapped = templates.map(function (template) {
                        return {
                            text: template.name,
                            "data-value": template.id
                        }
                    });

                    var $selectItems = components.selects.mapOptionsToSelectItems(templatesDataMapped);
                    pageInfoElements.templates.$templateSelect.find(".imcms-select").append($selectItems);
                    pageInfoElements.templates.$defaultChildTemplateSelect.find(".imcms-select")
                        .append($selectItems.clone(true, true));
                });

                var blockElements = [
                    pageInfoElements.templates.$templateSelect,
                    pageInfoElements.templates.$defaultChildTemplateSelect
                ];
                return buildFormBlock(blockElements, index);
            }
        }, {
            name: "status",
            buildTab: function (index) {
                pageInfoElements.status = {};

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

                var $createdTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Created"});
                pageInfoElements.status.$createdDate = components.dateTime.dateBoxReadOnly({id: "createdDate"});
                pageInfoElements.status.$createdTime = components.dateTime.timeBoxReadOnly({id: "createdTime"});

                var $createdDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $createdTimeTitle
                }, {
                    "input": pageInfoElements.status.$createdDate,
                    modifiers: boxModifiers
                }, {
                    "input": pageInfoElements.status.$createdTime,
                    modifiers: boxModifiers
                }]);

                var $createdByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                pageInfoElements.status.$createdBy = components.texts.textBox("<div>", {
                    id: "createdBy",
                    readonly: "readonly"
                });

                var $createdByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $createdByTitle
                    }, {
                        "input": pageInfoElements.status.$createdBy,
                        modifiers: boxModifiers
                    }]
                );

                var $created = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $createdDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $createdByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // modified by

                var $modifiedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Modified"});
                pageInfoElements.status.$modifiedDate = components.dateTime.dateBoxReadOnly({id: "modifiedDate"});
                pageInfoElements.status.$modifiedTime = components.dateTime.timeBoxReadOnly({id: "modifiedTime"});

                var $modifiedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $modifiedTimeTitle
                }, {
                    "input": pageInfoElements.status.$modifiedDate,
                    modifiers: boxModifiers
                }, {
                    "input": pageInfoElements.status.$modifiedTime,
                    modifiers: boxModifiers
                }]);

                var $modifiedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                pageInfoElements.status.$modifiedBy = components.texts.textBox("<div>", {
                    id: "modifiedBy",
                    readonly: "readonly"
                });

                var $modifiedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $modifiedByTitle
                    }, {
                        "input": pageInfoElements.status.$modifiedBy,
                        modifiers: boxModifiers
                    }]
                );

                var $modified = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $modifiedDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $modifiedByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // archived

                var $archivedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Archived"});
                pageInfoElements.status.$archivedDate = components.dateTime.dateBoxReadOnly({id: "archivedDate"});
                pageInfoElements.status.$archivedTime = components.dateTime.timeBoxReadOnly({id: "archivedTime"});

                var $archivedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $archivedTimeTitle
                }, {
                    "input": pageInfoElements.status.$archivedDate,
                    modifiers: boxModifiers
                }, {
                    "input": pageInfoElements.status.$archivedTime,
                    modifiers: boxModifiers
                }]);

                var $archivedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                pageInfoElements.status.$archivedBy = components.texts.textBox("<div>", {
                    id: "archivedBy",
                    readonly: "readonly"
                });

                var $archivedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $archivedByTitle
                    }, {
                        "input": pageInfoElements.status.$archivedBy,
                        modifiers: boxModifiers
                    }]
                );

                var $archived = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $archivedDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $archivedByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // published

                var $publishedTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Published"});
                pageInfoElements.status.$publishedDate = components.dateTime.dateBoxReadOnly({id: "publishedDate"});
                pageInfoElements.status.$publishedTime = components.dateTime.timeBoxReadOnly({id: "publishedTime"});

                var $publishedDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $publishedTimeTitle
                }, {
                    "input": pageInfoElements.status.$publishedDate,
                    modifiers: boxModifiers
                }, {
                    "input": pageInfoElements.status.$publishedTime,
                    modifiers: boxModifiers
                }]);

                var $publishedByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                pageInfoElements.status.$publishedBy = components.texts.textBox("<div>", {
                    id: "publishedBy",
                    readonly: "readonly"
                });

                var $publishedByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $publishedByTitle
                    }, {
                        "input": pageInfoElements.status.$publishedBy,
                        modifiers: boxModifiers
                    }]
                );

                var $published = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $publishedDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $publishedByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                // publish end

                var $publishEndTimeTitle = statusItemBEM.buildElement("label", "<div>", {text: "Publish end"});
                pageInfoElements.status.$publishEndDate = components.dateTime.dateBoxReadOnly({id: "publishEndDate"});
                pageInfoElements.status.$publishEndTime = components.dateTime.timeBoxReadOnly({id: "publishEndTime"});

                var $publishEndDateTimeField = statusItemBEM.buildBlock("<div>", [{
                    "label": $publishEndTimeTitle
                }, {
                    "input": pageInfoElements.status.$publishEndDate,
                    modifiers: boxModifiers
                }, {
                    "input": pageInfoElements.status.$publishEndTime,
                    modifiers: boxModifiers
                }]);

                var $publishEndByTitle = statusItemBEM.buildElement("label", "<div>", {text: "By"});
                pageInfoElements.status.$publishEndBy = components.texts.textBox("<div>", {
                    id: "publishEndBy",
                    readonly: "readonly"
                });

                var $publishEndByField = statusItemBEM.buildBlock("<div>", [{
                        "label": $publishEndByTitle
                    }, {
                        "input": pageInfoElements.status.$publishEndBy,
                        modifiers: boxModifiers
                    }]
                );

                var $publishEnd = statusFieldBEM.buildBlock("<div>", [
                    {
                        "item": $publishEndDateTimeField,
                        modifiers: ["col-3", "float-l"]
                    }, {
                        "item": $publishEndByField,
                        modifiers: ["col-2-3", "float-l"]
                    }]
                );

                var blockElements = [
                    $created,
                    $modified,
                    $archived,
                    $published,
                    $publishEnd
                ];

                return buildFormBlock(blockElements, index);
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
            documentsRestApi.read(docId, function (document) {
                pageInfoElements.$title.text("document " + document.id);

                // appearance

                var appearanceTab = pageInfoElements.appearance,
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

                // life cycle

                var lifeCycleTab = pageInfoElements.lifeCycle;

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

                components.radios
                    .group(lifeCycleTab.$showDefaultLang, lifeCycleTab.$doNotShow)
                    .checkAmongGroup(document.if_requested_lang_missing_doc_opts);

                pageInfoElements.lifeCycle.$currentVersionNumber.setValue(document.currentVersion);
                pageInfoElements.lifeCycle.docVersionSaveDateTime.date.setDate(document.currentVersionDate);
                pageInfoElements.lifeCycle.docVersionSaveDateTime.time.setTime(document.currentVersionTime);

                // keywords

                var keywordsTab = pageInfoElements.keywords;

                document.keywords.forEach(keywordsTab.$keywordsBox.addKeyword);

                keywordsTab.$searchDisableCheckbox.setValue(document.disable_search);

                // categories

                //todo based on callback after build

                // access

                //todo based on callback after build

                // permissions

                var permissions = pageInfoElements.permissions,
                    restrictedCheckboxes = {};
                permissions.restrictedCheckboxes.forEach(function (permission) {
                    restrictedCheckboxes[permission
                        .find("input")
                        .prop("name")] = permission;
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
