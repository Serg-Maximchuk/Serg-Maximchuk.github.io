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
                    console.log("%c Not implemented feature: create new doc", "color: red");
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

        function buildDocumentListTitlesRow() {
            var titlesBEM = new BEM({
                block: "imcms-document-list-titles",
                elements: {"title": ""}
            });

            var $idColumnHead = titlesBEM.buildElement("title", "<div>", {text: "id"});
            var $titleColumnHead = titlesBEM.buildElement("title", "<div>", {text: "Title"});
            var $aliasColumnHead = titlesBEM.buildElement("title", "<div>", {text: "Alias"});
            var $typeColumnHead = titlesBEM.buildElement("title", "<div>", {text: "Type"});

            return titlesBEM.buildBlock("<div>", [{
                "title": $idColumnHead,
                modifiers: ["col-2"]
            }, {
                "title": $titleColumnHead,
                modifiers: ["col-3"]
            }, {
                "title": $aliasColumnHead,
                modifiers: ["col-3"]
            }, {
                "title": $typeColumnHead,
                modifiers: ["col-4"]
            }]);
        }

        function buildDocItemControls() {
            var docControlsBEM = new BEM({
                block: "imcms-controls",
                elements: {"control": "imcms-control"}
            });

            var $controlMove = docControlsBEM.buildElement("control", "<div>", {
                click: function () {
                    console.log("%c Not implemented feature: move doc", "color: red;");
                }
            }, ["move"]);
            var $controlRemove = docControlsBEM.buildElement("control", "<div>", {
                click: function () {
                    console.log("%c Not implemented feature: remove doc", "color: red;");
                }
            }, ["remove"]);
            var $controlRename = docControlsBEM.buildElement("control", "<div>", {
                click: function () {
                    console.log("%c Not implemented feature: rename doc", "color: red;");
                }
            }, ["rename"]);

            return docControlsBEM.buildBlock("<div>", [
                {"control": $controlMove},
                {"control": $controlRemove},
                {"control": $controlRename}
            ]);
        }

        function buildDocItem(document) {
            var docItemBEM = new BEM({
                block: "imcms-document-item",
                elements: {
                    "btn": "",
                    "info": "imcms-title",
                    "controls": "imcms-controls"
                }
            });

            var $docItemId = docItemBEM.buildElement("info", "<div>", {text: document.id});
            var $docItemTitle = docItemBEM.buildElement("info", "<div>", {text: document.title});
            var $docItemAlias = docItemBEM.buildElement("info", "<div>", {text: document.alias});
            var $docItemType = docItemBEM.buildElement("info", "<div>", {text: document.type});
            var $controls = buildDocItemControls();

            return docItemBEM.buildBlock("<div>", [{
                "info": $docItemId,
                modifiers: ["col-2"]
            }, {
                "info": $docItemTitle,
                modifiers: ["col-3"]
            }, {
                "info": $docItemAlias,
                modifiers: ["col-3"]
            }, {
                "info": $docItemType,
                modifiers: ["col-4"]
            }, {"controls": $controls}]);
        }

        function buildDocumentItem(document) {
            var docItemsBEM = new BEM({
                block: "imcms-document-items",
                elements: {"document-item": "imcms-document-item"}
            });

            var $testDocItem = buildDocItem(document);
            return docItemsBEM.buildBlock("<div>", [{"document-item": $testDocItem}]);
        }

        function buildDocumentList(documentList) {
            var docListBEM = new BEM({
                block: "imcms-document-items-list",
                elements: {"document-items": "imcms-document-items"}
            });

            var $blockElements = documentList.map(function (document) {
                var $docItems = buildDocumentItem(document);
                return {"document-items": $docItems}
            });

            return docListBEM.buildBlock("<div>", $blockElements);
        }

        function buildEditorBody(documentList) {
            var documentListBEM = new BEM({
                block: "imcms-document-list",
                elements: {
                    "titles": "imcms-document-list-titles",
                    "items": "imcms-document-items"
                }
            });

            var $titles = buildDocumentListTitlesRow();
            var $docList = buildDocumentList(documentList);

            return documentListBEM.buildBlock("<div>", [
                {"titles": $titles},
                {"items": $docList}
            ]);
        }

        function getDocuments() {
            return [{
                id: 1001,
                title: "Start page",
                alias: "start-page",
                type: "text"
            }, {
                id: 1002,
                title: "Second page",
                alias: "second-page",
                type: "text"
            }, {
                id: 1003,
                title: "Another page",
                alias: "some-page",
                type: "text"
            }, {
                id: 1004,
                title: "File page",
                alias: "file-page",
                type: "file"
            }, {
                id: 1005,
                title: "Another page 1",
                alias: "some-page-1",
                type: "text"
            }, {
                id: 1006,
                title: "Another page 2",
                alias: "some-page-2",
                type: "text"
            }, {
                id: 1007,
                title: "Another page 3",
                alias: "some-page-3",
                type: "text"
            }, {
                id: 1008,
                title: "Another page 4",
                alias: "some-page-4",
                type: "text"
            }, {
                id: 1009,
                title: "Another page 5",
                alias: "some-page-5",
                type: "text"
            }, {
                id: 1010,
                title: "Another page 6",
                alias: "some-page-6",
                type: "text"
            }, {
                id: 1011,
                title: "Another page 7",
                alias: "some-page-7",
                type: "text"
            }, {
                id: 1012,
                title: "Another page 8",
                alias: "some-page-8",
                type: "text"
            }, {
                id: 1013,
                title: "Another page 9",
                alias: "some-page-9",
                type: "text"
            }, {
                id: 1014,
                title: "Another page 10",
                alias: "some-page-10",
                type: "text"
            }, {
                id: 1015,
                title: "Another page 11",
                alias: "some-page-11",
                type: "text"
            }, {
                id: 1016,
                title: "Another page 12",
                alias: "some-page-12",
                type: "text"
            }, {
                id: 1017,
                title: "Another page 13",
                alias: "some-page-13",
                type: "text"
            }, {
                id: 1018,
                title: "Another page 14",
                alias: "some-page-14",
                type: "text"
            }];
        }

        return {
            buildBody: function () {
                var $head = buildBodyHead();
                var documentList = getDocuments(); //todo: mock elements for now, implement receiving from server
                var $body = buildEditorBody(documentList);

                return [$head, $body];
            },
            build: function () {
                var $body = this.buildBody();
            }
        };
    }
);