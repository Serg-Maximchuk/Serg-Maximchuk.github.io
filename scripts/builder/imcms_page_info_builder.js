/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    ["imcms-date-picker", "imcms-time-picker", "imcms-bem-builder", "imcms-components-builder",
        "imcms-roles-rest-api", "imcms-templates-rest-api",
        "imcms-documents-rest-api", "imcms-users-rest-api", "imcms-category-types-rest-api", "jquery"],
    function (DatePicker, TimePicker, BEM, componentsBuilder,
              rolesRestApi, templatesRestApi, documentsRestApi, usersRestApi,
              categoriesTypesRestApi, $) {

        // todo: receive date and time from server

        function getCurrentTime() {
            var currentDate = new Date(),
                hour = currentDate.getHours(),
                minute = currentDate.getMinutes()
            ;

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }

            return hour + ":" + minute;
        }

        function getCurrentDate() {
            var currentDate = new Date(),
                year = currentDate.getFullYear(),
                month = currentDate.getMonth() + 1,
                date = currentDate.getDate()
            ;

            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }

            return year + "-" + month + "-" + date;
        }

        var mockTimeReceivedFromServer = getCurrentTime();
        var mockDateReceivedFromServer = getCurrentDate();

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

            pageInfoElements.$title = pageInfoHeadBEM.buildElement("title", "<div>", {});

            return pageInfoHeadBEM.buildBlock("<div>", [
                {"title": pageInfoElements.$title}
            ]);
        }

        function showPanel(index) {
            $(".imcms-form[data-window-id=" + index + "]").css({"display": "block"});
        }

        var formsBEM = new BEM({
            block: "imcms-form",
            elements: {
                "field": "imcms-field"
            }
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

                pageInfoElements.appearance.$engCheckbox = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                        name: "english",
                        text: "English",
                        checked: "checked"
                    });

                var
                    $engCheckboxWrapper = componentsBuilder.checkboxes.checkboxContainer("<div>",
                        [pageInfoElements.appearance.$engCheckbox]);
                var $engCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "checkboxes": $engCheckboxWrapper
                    }]);

                pageInfoElements.appearance.$pageTitle = componentsBuilder.texts.textBox("<div>", {
                        name: "title",
                        text: "Title",
                        placeholder: "Start page"
                    });

                var $pageTitleContainer = pageInfoInnerStructureBEM.buildBlock("<div>",
                    [{"text-box": pageInfoElements.appearance.$pageTitle}]);

                pageInfoElements.appearance.$menuText = componentsBuilder.texts.textArea("<div>", {
                        text: "Menu text",
                        name: "menu-text"
                    });

                var $menuTextContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{"text-area": pageInfoElements.appearance.$menuText}]);

                pageInfoElements.appearance.$linkToImage = componentsBuilder.chooseImage.container("<div>", {
                        id: "path-to-image",
                        name: "image",
                        placeholder: "Image path",
                        "label-text": "Link to image",
                        "button-text": "choose..."
                    });

                var $linkToImageContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "choose-image": pageInfoElements.appearance.$linkToImage
                    }]);

                pageInfoElements.appearance.$sweCheckbox = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                        name: "swedish",
                        text: "Swedish"
                    });

                var
                    $sweCheckboxWrapper = componentsBuilder.checkboxes.checkboxContainer("<div>", [pageInfoElements.appearance.$sweCheckbox]),
                    $sweCheckboxContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "checkboxes": $sweCheckboxWrapper
                    }]);

                pageInfoElements.appearance.$pageTitleSwe = componentsBuilder.texts.textBox("<div>", {
                        name: "title",
                        text: "Title",
                        placeholder: "Startsida"
                    });

                var $pageTitleSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "text-box": pageInfoElements.appearance.$pageTitleSwe
                    }]);

                pageInfoElements.appearance.$menuTextSwe = componentsBuilder.texts.textArea("<div>", {
                        text: "Menu text",
                        name: "menu-text"
                    });

                var $menuTextSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "text-area": pageInfoElements.appearance.$menuTextSwe
                    }]);

                pageInfoElements.appearance.$linkToImageSwe = componentsBuilder.chooseImage.container("<div>", {
                        id: "path-to-image-swe",
                        name: "image",
                        placeholder: "Image path",
                        "label-text": "Link to image",
                        "button-text": "choose..."
                    });

                var $linkToImageSweContainer = pageInfoInnerStructureBEM.buildBlock("<div>", [{
                        "choose-image": pageInfoElements.appearance.$linkToImageSwe
                    }]);

                pageInfoElements.appearance.$showIn = componentsBuilder.selects.imcmsSelect("<div>", {
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

                var $showInContainer = pageInfoInnerStructureBEM.buildBlock("<div>",
                    [{"select": pageInfoElements.appearance.$showIn}]);

                pageInfoElements.appearance.$documentAlias = componentsBuilder.texts.textBox("<div>", {
                        name: "alias",
                        text: "Document alias",
                        placeholder: "this-doc-alias"
                    });

                var $documentAliasContainer = pageInfoInnerStructureBEM.buildBlock("<div>",
                    [{"text-box": pageInfoElements.appearance.$documentAlias}]);

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

                pageInfoElements.lifeCycle.$docStatusSelect = componentsBuilder.selects.imcmsSelect("<div>", {
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

                var $docStatusSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [{"select": pageInfoElements.lifeCycle.$docStatusSelect}]),

                    // published date-time row
                    $publishedTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Published"}),
                    $publishDate = componentsBuilder.dateTime.datePickerCalendar({title: "Set published date"}),
                    $publishTime = componentsBuilder.dateTime.timePickerClock({title: "Set published time"}),
                    $setPublishTimeNowBtn = componentsBuilder.buttons.neutralButton({
                        text: "Now",
                        click: onTimeNowButtonClick
                    }),
                    $setPublishTimeNowContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$setPublishTimeNowBtn]),

                    $publishDateTime = componentsBuilder.dateTime.dateTimeReadOnly({title: "Saved publish date-time"}),

                    $clearPublishTimeBtn = componentsBuilder.buttons.neutralButton({
                        text: "Clear",
                        click: onTimeClearButtonClick
                    });

                pageInfoElements.lifeCycle.publishTime = new TimePicker($publishTime);
                pageInfoElements.lifeCycle.publishDate = new DatePicker($publishDate);
                pageInfoElements.lifeCycle.publishDateTime = {};
                pageInfoElements.lifeCycle.publishDateTime.date = new DatePicker($publishDateTime);
                pageInfoElements.lifeCycle.publishDateTime.time = new TimePicker($publishDateTime);

                var $clearPublishTimeContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$clearPublishTimeBtn]),

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
                    $archivedDate = componentsBuilder.dateTime.datePickerCalendar({title: "Set archived date"}),
                    $archivedTime = componentsBuilder.dateTime.timePickerClock({title: "Set archived time"}),
                    $setArchivedTimeNowBtn = componentsBuilder.buttons.neutralButton({
                        text: "Now",
                        click: onTimeNowButtonClick
                    }),
                    $setArchivedTimeNowContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$setArchivedTimeNowBtn]),

                    $archivedDateTime = componentsBuilder.dateTime.dateTimeReadOnly({title: "Saved archived date-time"}),

                    $clearArchivedTimeBtn = componentsBuilder.buttons.neutralButton({
                        text: "Clear",
                        click: onTimeClearButtonClick
                    });

                pageInfoElements.lifeCycle.archivedTime = new TimePicker($archivedTime);
                pageInfoElements.lifeCycle.archivedDate = new DatePicker($archivedDate);
                pageInfoElements.lifeCycle.archivedDateTime = {};
                pageInfoElements.lifeCycle.archivedDateTime.date = new DatePicker($archivedDateTime);
                pageInfoElements.lifeCycle.archivedDateTime.time = new TimePicker($archivedDateTime);

                var $clearArchivedTimeContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$clearArchivedTimeBtn]),

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

                    $publishEndTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {text: "Publication end"}),
                    $publishEndDate = componentsBuilder.dateTime.datePickerCalendar({title: "Set publication end date"}),
                    $publishEndTime = componentsBuilder.dateTime.timePickerClock({title: "Set publication end time"}),

                    $setPublishEndTimeNowBtn = componentsBuilder.buttons.neutralButton({
                        text: "Now",
                        click: onTimeNowButtonClick
                    }),

                    $setPublishEndTimeNowContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$setPublishEndTimeNowBtn]),

                    $publishEndDateTime = componentsBuilder.dateTime.dateTimeReadOnly({
                        title: "Saved publication end date-time"
                    }),

                    $clearPublishEndTimeBtn = componentsBuilder.buttons.neutralButton({
                        text: "Clear",
                        click: onTimeClearButtonClick
                    }),

                    $clearPublishEndTimeContainer = componentsBuilder.buttons.buttonsContainer("<div>", [$clearPublishEndTimeBtn]),

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
                    ]);

                pageInfoElements.lifeCycle.publishEndTime = new TimePicker($publishEndTime);
                pageInfoElements.lifeCycle.publishEndDate = new DatePicker($publishEndDate);
                pageInfoElements.lifeCycle.publishEndDateTime = {};
                pageInfoElements.lifeCycle.publishEndDateTime.date = new DatePicker($publishEndDateTime);
                pageInfoElements.lifeCycle.publishEndDateTime.time = new TimePicker($publishEndDateTime);

                // publisher select row

                pageInfoElements.lifeCycle.$publisherSelect = componentsBuilder.selects.imcmsSelect("<div>", {
                        id: "doc-publisher",
                        text: "Publisher",
                        name: "publisher"
                    }, []);
                usersRestApi.read(null, function (users) {
                    var usersDataMapped = users.map(function (user) {
                        return {
                            text: user.username,
                            "data-value": user.id
                        }
                    });
                    pageInfoElements.lifeCycle.$publisherSelect.append(componentsBuilder.selects.mapOptionsToSelectItems(usersDataMapped));
                });// todo receive users with specific role admin
                var $publisherSelectContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [{"select": pageInfoElements.lifeCycle.$publisherSelect}]),

                    // languages row

                    $languagesTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                        text: "If requested language is missing:"
                    });
                pageInfoElements.lifeCycle.$showDefaultLang = componentsBuilder.radios.imcmsRadio("<div>", {
                        text: "Show in default language if enabled",
                        name: "langSetting",
                        value: "SHOW_DEFAULT",
                        checked: "checked"
                    });
                pageInfoElements.lifeCycle.$doNotShow = componentsBuilder.radios.imcmsRadio("<div>", {
                        text: "Don't show at all",
                        name: "langSetting",
                        value: "DO_NOT_SHOW"
                    });
                var $languagesContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"title": $languagesTitle},
                        {"item": pageInfoElements.lifeCycle.$showDefaultLang},
                        {"item": pageInfoElements.lifeCycle.$doNotShow}
                    ]),

                    // current version row

                    $currentVersionRowTitle = lifeCycleInnerStructureBEM.buildElement("title", "<div>", {
                        text: "Current version:"
                    });
                pageInfoElements.lifeCycle.$currentVersionNumber = componentsBuilder.texts.textBox("<div>", {
                        readonly: "readonly",
                        value: "0"
                    });

                var $docVersionSaveDateTime = componentsBuilder.dateTime.dateTimeReadOnly(),
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
                    $offlineVersionInfo = componentsBuilder.texts.infoText("<div>", "This offline version has changes."),
                    $savingVersionInfo = componentsBuilder.texts.infoText("<div>",
                        "Please press \"Save and publish this version\" to publish as: version 0000.", {
                            id: "save-as-new-version-message"
                        }),
                    $docVersionsInfoContainer = lifeCycleInnerStructureBEM.buildBlock("<div>", [
                        {"item": $offlineVersionInfo},
                        {"item": $savingVersionInfo}
                    ]);

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

                pageInfoElements.keywords.$keywordsBox = componentsBuilder.keywords.keywordsBox("<div>", {
                    "input-id": "keyword",
                    title: "Keywords",
                    placeholder: "keyword",
                    "button-text": "ADD+"
                });
                pageInfoElements.keywords.$searchDisableCheckbox = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                    id: "isSearchDisabled",
                    name: "isSearchDisabled",
                    text: "Disable search"
                });
                var $checkboxField = componentsBuilder.checkboxes.checkboxContainerField("<div>",
                    [pageInfoElements.keywords.$searchDisableCheckbox]);

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

                        pageInfoElements.categories.descriptor= [];

                        if (categoryType.multi_select) {
                            pageInfoElements.categories[categoryTypeQualifier] = {};
                            categoryType.categories.forEach(function (category) {
                                var $categoryCheckbox = componentsBuilder.checkboxes.imcmsCheckbox("<div>", {
                                    name: categoryTypeQualifier,
                                    value: category.id,
                                    text: category.name
                                });

                                pageInfoElements.categories[categoryTypeQualifier][category.id] = $categoryCheckbox;

                                pageInfoElements.categories.descriptor.push({
                                    category_ids: [category.id],
                                    access_key_category_type_qualifier: categoryTypeQualifier,
                                    access_key_category_id: category.id,
                                    member_of_multi_select: true
                                });
                            });

                            $categoryType = componentsBuilder.checkboxes.checkboxContainerField("<div>", Object.values(pageInfoElements.categories[categoryTypeQualifier]),
                                {title: categoryType.name}
                            );
                        } else {
                            var mappedCategoriesForSelectContainer = categoryType.categories.map(function (category) {
                                return {
                                    text: category.name,
                                    value: category.id
                                }
                            });

                            $categoryType = componentsBuilder.selects.selectContainer("<div>", {
                                id: categoryTypeQualifier,
                                text: categoryType.name
                            }, mappedCategoriesForSelectContainer);

                            pageInfoElements.categories[categoryTypeQualifier] = $categoryType;

                            pageInfoElements.categories.descriptor.push({
                                category_ids: categoryType.categories.map(function (category) {return category.id;}),
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

                var $addRoleSelect = componentsBuilder.selects.imcmsSelect("<div>", {
                    id: "select3"
                }, []);

                rolesRestApi.read(null, function (roles) {
                    var rolesDataMapped = roles.map(function (role) {
                        return {
                            text: role.name,
                            "data-value": role.id
                        }
                    });
                    $addRoleSelect.append(componentsBuilder.selects.mapOptionsToSelectItems(rolesDataMapped));
                });

                var $addRoleButton = componentsBuilder.buttons.neutralButton({
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

                function buildTestCheckboxes(attributesArr) {
                    return attributesArr.map(function (attributes) {
                        return componentsBuilder.checkboxes.imcmsCheckbox("<div>", attributes);
                    });
                }

                var fieldItemBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "item": "imcms-col-3"
                    }
                });

                pageInfoElements.permissions.$restrictedCheckboxes1 = buildTestCheckboxes([{
                    name: "editText1",
                    text: "Edit text"
                }, {
                    name: "editMenu1",
                    text: "Edit menu"
                }, {
                    name: "editImage1",
                    text: "Edit image"
                }, {
                    name: "editLoop1",
                    text: "Edit loop"
                }, {
                    name: "editDocInfo1",
                    text: "Edit doc info"
                }]);
                var $restrictedRole1Rights = componentsBuilder.checkboxes
                    .checkboxContainer("<div>", pageInfoElements.permissions.$restrictedCheckboxes1, {title: "Restricted 1"});

                pageInfoElements.permissions.$restrictedCheckboxes2 = buildTestCheckboxes([{
                    name: "editText2",
                    text: "Edit text"
                }, {
                    name: "editMenu2",
                    text: "Edit menu"
                }, {
                    name: "editImage2",
                    text: "Edit image"
                }, {
                    name: "editLoop2",
                    text: "Edit loop"
                }, {
                    name: "editDocInfo2",
                    text: "Edit doc info"
                }]);
                var $restrictedRole2Rights = componentsBuilder.checkboxes
                    .checkboxContainer("<div>", pageInfoElements.permissions.$restrictedCheckboxes2, {title: "Restricted 2"});

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

                pageInfoElements.templates.$templateSelect = componentsBuilder.selects.selectContainer("<div>", {
                    name: "template",
                    text: "Template"
                }, []);

                pageInfoElements.templates.$defaultChildTemplateSelect = componentsBuilder.selects.selectContainer("<div>", {
                    name: "childTemplate",
                    text: "Default child template"
                }, []);

                templatesRestApi.read(null, function (templates) {
                    var templatesDataMapped = templates.map(function (template) {
                        return {
                            text: template.name,
                            "data-value": template.id
                        }
                    });

                    var $selectItems = componentsBuilder.selects.mapOptionsToSelectItems(templatesDataMapped);
                    pageInfoElements.templates.$templateSelect.find(".imcms-select").append($selectItems);
                    pageInfoElements.templates.$defaultChildTemplateSelect.find(".imcms-select").append($selectItems.clone(true, true));
                });

                return buildFormBlock([pageInfoElements.templates.$templateSelect, pageInfoElements.templates.$defaultChildTemplateSelect], index);
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
                pageInfoElements.status.$createdDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "createdDate"});
                pageInfoElements.status.$createdTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "createdTime"});

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
                pageInfoElements.status.$createdBy = componentsBuilder.texts.textBox("<div>", {
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
                pageInfoElements.status.$modifiedDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "modifiedDate"});
                pageInfoElements.status.$modifiedTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "modifiedTime"});

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
                pageInfoElements.status.$modifiedBy = componentsBuilder.texts.textBox("<div>", {
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
                pageInfoElements.status.$archivedDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "archivedDate"});
                pageInfoElements.status.$archivedTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "archivedTime"});

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
                pageInfoElements.status.$archivedBy = componentsBuilder.texts.textBox("<div>", {
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
                pageInfoElements.status.$publishedDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "publishedDate"});
                pageInfoElements.status.$publishedTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "publishedTime"});

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
                pageInfoElements.status.$publishedBy = componentsBuilder.texts.textBox("<div>", {
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
                pageInfoElements.status.$publishEndDate = componentsBuilder.dateTime.dateBoxReadOnly({id: "publishEndDate"});
                pageInfoElements.status.$publishEndTime = componentsBuilder.dateTime.timeBoxReadOnly({id: "publishEndTime"});

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
                pageInfoElements.status.$publishEndBy = componentsBuilder.texts.textBox("<div>", {
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
                    $("[data-menu=pageInfo]").find(".imcms-title--active").removeClass("imcms-title--active");
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

            var $saveBtn = componentsBuilder.buttons.positiveButton({
                text: "ok",
                click: function () {
                    // todo: save things
                    closePageInfo.call(this);
                }
            });

            var $cancelBtn = componentsBuilder.buttons.negativeButton({
                text: "cancel",
                click: function () {
                    // todo: cancel things
                    closePageInfo.call(this);
                }
            });

            var $saveAndPublishBtn = componentsBuilder.buttons.saveButton({
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

        function loadPageInfoDataFrom(docId) {

            documentsRestApi.read(docId, function (document) {
                pageInfoElements.$title.text("document " + document.id);
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

                docId && loadPageInfoDataFrom(docId);
            }
        }
    }
);
