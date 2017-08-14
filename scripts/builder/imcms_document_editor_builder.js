/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 14.08.17.
 */
Imcms.define("imcms-document-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-primitives-builder"],
    function (BEM, components, primitives) {
        function buildBodyHead() {
            var bodyHeadBEM = new BEM({
                block: "imcms-document-editor-head",
                elements: {
                    "tools": "imcms-document-editor-head-tools imcms-grid-section"
                }
            });

            var headToolsBEM = new BEM({
                block: "imcms-document-editor-head-tools",
                elements: {
                    "tool": "imcms-document-editor-head-tool"
                }
            });

            var toolBEM = new BEM({
                block: "imcms-document-editor-head-tool",
                elements: {
                    "search": "imcms-input-search",
                    "button": "imcms-button"
                }
            });

            var $createNewDocButton = components.buttons.negativeButton({
                text: "New",
                click: function () {
                    console.log("%c Not implemented feature: create new doc");
                    // todo: implement doc creation dialog
                }
            });

            var $newDocButtonContainer = toolBEM.buildBlock("<div>", [{"button": $createNewDocButton}]);

            var searchBEM = new BEM({
                block: "imcms-input-search",
                elements: {
                    "text-box": "imcms-input",
                    "button": "imcms-button"
                }
            });

            var $searchButton = components.buttons.searchButton();
            var $searchInput = primitives.imcmsInputText({
                id: "searchText",
                name: "search",
                placeholder: "Type to find document"
            });

            var $searchInputWrapper = searchBEM.buildBlock("<div>", [
                {"text-box": $searchInput},
                {"button": $searchButton}
            ]);

            var $searchContainer = toolBEM.buildBlock("<div>", [{"search": $searchInputWrapper}]);

            var $usersFilterSelect = components.selects.imcmsSelect("<div>", {
                id: "users-filter",
                name: "users-filter"
            }, [{
                text: "All Documents",
                value: "0"
            }, {
                text: "My Documents",
                value: "1"
            }, {
                text: "Admin",
                value: "1"
            }, {
                text: "user",
                value: "2"
            }, {
                text: "test-user",
                value: "3"
            }]);

            var $usersFilter = toolBEM.buildBlock("<div>", [{"select": $usersFilterSelect}]);

            var $categoriesFilterSelect = components.selects.imcmsSelect("<div>", {
                id: "categories-filter",
                name: "categories-filter"
            }, [{
                text: "Category 1",
                value: "0"
            }, {
                text: "Category 2",
                value: "1"
            }, {
                text: "Category 3",
                value: "2"
            }]);

            var $categoriesFilter = toolBEM.buildBlock("<div>", [{"select": $categoriesFilterSelect}]);

            var $tools = headToolsBEM.buildBlock("<div>", [
                {
                    "tool": $newDocButtonContainer,
                    modifiers: ["grid-col-2"]
                }, {
                    "tool": $searchContainer,
                    modifiers: ["grid-col-4"]
                }, {
                    "tool": $usersFilter,
                    modifiers: ["grid-col-3"]
                }, {
                    "tool": $categoriesFilter,
                    modifiers: ["grid-col-3"]
                }]);

            return bodyHeadBEM.buildBlock("<div>", [{"tools": $tools}]);
        }

        return {
            buildBody: function () {
                var $head = buildBodyHead();

                return $head;
            },
            build: function () {
                var $body = this.buildBody();
            }
        };
    }
);
