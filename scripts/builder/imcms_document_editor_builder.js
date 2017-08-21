/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 14.08.17.
 */
Imcms.define("imcms-document-editor-builder",
    [
        "imcms-bem-builder", "imcms-page-info-builder", "imcms-components-builder", "imcms-primitives-builder",
        "imcms-window-components-builder", "imcms-documents-rest-api", "imcms-controls-builder",
        "imcms-users-rest-api", "imcms-categories-rest-api"
    ],
    function (BEM, pageInfoBuilder, components, primitives,
              windowComponents, docRestApi, controlsBuilder,
              usersRestApi, categoriesRestApi) {
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
                click: pageInfoBuilder.build
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
            }, []);

            usersRestApi.read(null, function (users) {
                var usersDataMapped = users.map(function (user) {
                    return {
                        text: user.username,
                        "data-value": user.id
                    }
                });
                $usersFilterSelect.append(components.selects.mapOptionsToSelectItems(usersDataMapped));
            });

            var $usersFilter = toolBEM.buildBlock("<div>", [{"select": $usersFilterSelect}]);

            var $categoriesFilterSelect = components.selects.imcmsSelect("<div>", {
                id: "categories-filter",
                name: "categories-filter"
            }, []);

            categoriesRestApi.read(null, function (categories) {
                var categoriesDataMapped = categories.map(function (category) {
                    return {
                        text: category.name,
                        "data-value": category.id
                    }
                });
                $categoriesFilterSelect.append(components.selects.mapOptionsToSelectItems(categoriesDataMapped));
            });

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

        function buildDocItemControls(documentId, opts) {
            var docControlsBEM = new BEM({
                block: "imcms-controls",
                elements: {"control": "imcms-control"}
            });

            var $controlRemove = controlsBuilder.remove(function () {
                removeDocument.call(this, documentId);
            });

            //todo implement it,fix "rename" to more appropriate name in general case e.g. "edit"
            var $controlRename = controlsBuilder.rename(pageInfoBuilder.build);

            var controls = [
                {"control": $controlRemove},
                {"control": $controlRename}
            ];

            if (opts && opts.moveEnable) {
                var $controlMove = controlsBuilder.move(function () {
                    console.log("%c Not implemented feature: move doc", "color: red;");
                });
                controls.unshift({"control": $controlMove});
            }

            return docControlsBEM.buildBlock("<div>", controls);
        }

        function buildDocItem(document, opts) {
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
            var $controls = buildDocItemControls(document.id, opts);

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

        function buildDocumentItem(document, opts) {
            var docItemsBEM = new BEM({
                block: "imcms-document-items",
                elements: {"document-item": "imcms-document-item"}
            });

            var $testDocItem = buildDocItem(document, opts);
            return docItemsBEM.buildBlock("<div>", [{"document-item": $testDocItem}]);
        }

        function buildDocumentList(documentList, opts) {
            var docListBEM = new BEM({
                block: "imcms-document-items-list",
                elements: {"document-items": "imcms-document-items"}
            });

            var $blockElements = documentList.map(function (document) {
                var $docItems = buildDocumentItem(document, opts);
                return {"document-items": $docItems}
            });

            return docListBEM.buildBlock("<div>", $blockElements);
        }

        function buildEditorBody(documentList, opts) {
            var documentListBEM = new BEM({
                block: "imcms-document-list",
                elements: {
                    "titles": "imcms-document-list-titles",
                    "items": "imcms-document-items"
                }
            });

            var $titles = buildDocumentListTitlesRow();
            var $docList = buildDocumentList(documentList, opts);

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

        var $documentEditor, $documentsContainer;

        function closeEditor() {
            $documentEditor.css("display", "none");
        }

        function buildHead() {
            return windowComponents.buildHead("Document editor", closeEditor);
        }

        function buildFooter() {
            return windowComponents.buildFooter();
        }

        function buildBody() {
            var bodyBEM = new BEM({
                block: "imcms-document-editor-body",
                elements: {"body-head": "imcms-body-head"}
            });

            var $head = buildBodyHead();
            $documentsContainer = bodyBEM.buildBlock("<div>", [{"body-head": $head}]);

            return $documentsContainer;
        }

        function loadDocumentEditorContent(opts) {
            var documentList = getDocuments(); //todo: mock elements for now, implement receiving from server
            var $editorBody = buildEditorBody(documentList, opts);
            $documentsContainer.append($editorBody);
        }

        function buildDocumentEditor() {
            var documentEditorBEM = new BEM({
                block: "imcms-document-editor",
                elements: {
                    "head": "imcms-head",
                    "body": "imcms-document-editor-body",
                    "footer": "imcms-footer"
                }
            });

            var $head = buildHead(),
                $body = buildBody(),
                $footer = buildFooter();

            setTimeout(loadDocumentEditorContent);

            return documentEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"body": $body},
                {"footer": $footer}
            ], {id: "imcms-document-editor"}).addClass("imcms-editor-window");
        }

        function removeDocument(documentId) {
            var documentRow = this.parentElement.parentElement;
            docRestApi.remove(documentId, function (responseCode) {
                responseCode === 200 && documentRow.remove();
            });
        }

        return {
            buildBody: buildBody,
            loadDocumentEditorContent: loadDocumentEditorContent,
            build: function () {
                if (!$documentEditor) {
                    $documentEditor = buildDocumentEditor().appendTo("body");
                }

                $documentEditor.css("display", "block");
            }
        };
    }
);
