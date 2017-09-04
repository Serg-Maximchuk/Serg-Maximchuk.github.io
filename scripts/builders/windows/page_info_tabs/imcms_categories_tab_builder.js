Imcms.define("imcms-categories-tab-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-category-types-rest-api",
        "imcms-page-info-tabs-linker"
    ],
    function (BEM, components, categoriesTypesRestApi, linker) {

        return {
            name: "categories",
            data: {},
            buildTab: function (index) {
                this.data.$categoriesBlock = linker.buildFormBlock([], index);
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
        };
    }
);
