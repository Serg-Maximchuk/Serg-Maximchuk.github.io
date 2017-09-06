/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 14.08.17.
 */
Imcms.define("imcms-document-editor-builder",
    [
        "imcms-bem-builder", "imcms-page-info-builder", "imcms-components-builder", "imcms-primitives-builder",
        "imcms-documents-rest-api", "imcms-controls-builder", "imcms-users-rest-api", "imcms-categories-rest-api",
        "imcms-window-builder"
    ],
    function (BEM, pageInfoBuilder, components, primitives, docRestApi, controlsBuilder, usersRestApi,
              categoriesRestApi, WindowBuilder) {

        function buildBodyHeadTools() {

            function onNewDocButtonClick(e) {
                e.preventDefault();
                pageInfoBuilder.build();
            }

            function buildNewDocButton() {
                return components.buttons.negativeButton({
                    text: "New",
                    click: onNewDocButtonClick
                });
            }

            function buildSearchDocField() {
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

                return searchBEM.buildBlock("<div>", [
                    {"text-box": $searchInput},
                    {"button": $searchButton}
                ]);
            }

            function buildUsersFilterSelect() {
                var $usersFilterSelect = components.selects.imcmsSelect("<div>", {
                    id: "users-filter",
                    name: "users-filter"
                });

                usersRestApi.read(null)
                    .done(function (users) {
                        var usersDataMapped = users.map(function (user) {
                            return {
                                text: user.username,
                                "data-value": user.id
                            }
                        });
                        components.selects.addOptionsToSelect(usersDataMapped, $usersFilterSelect);
                    });

                return $usersFilterSelect;
            }

            function buildCategoriesFilterSelect() {
                var $categoriesFilterSelect = components.selects.imcmsSelect("<div>", {
                    id: "categories-filter",
                    name: "categories-filter"
                });

                categoriesRestApi.read(null)
                    .done(function (categories) {
                        var categoriesDataMapped = categories.map(function (category) {
                            return {
                                text: category.name,
                                "data-value": category.id
                            }
                        });
                        components.selects.addOptionsToSelect(categoriesDataMapped, $categoriesFilterSelect);
                    });

                return $categoriesFilterSelect;
            }

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

            var $createNewDocButton = buildNewDocButton();
            var $newDocButtonContainer = toolBEM.buildBlock("<div>", [{"button": $createNewDocButton}]);

            var $searchInputWrapper = buildSearchDocField();
            var $searchContainer = toolBEM.buildBlock("<div>", [{"search": $searchInputWrapper}]);

            var $usersFilterSelect = buildUsersFilterSelect();
            var $usersFilter = toolBEM.buildBlock("<div>", [{"select": $usersFilterSelect}]);

            var $categoriesFilterSelect = buildCategoriesFilterSelect();
            var $categoriesFilter = toolBEM.buildBlock("<div>", [{"select": $categoriesFilterSelect}]);

            return headToolsBEM.buildBlock("<div>", [
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
                }]
            );
        }

        function buildBodyHead() {
            var bodyHeadBEM = new BEM({
                block: "imcms-document-editor-head",
                elements: {
                    "tools": "imcms-document-editor-head-tools imcms-grid-section"
                }
            });

            var $tools = buildBodyHeadTools();

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
            var controls = [];

            if (opts) {
                if (opts.moveEnable) {
                    var $controlMove = controlsBuilder.move(function () {
                        console.log("%c Not implemented feature: move doc", "color: red;");
                    });
                    controls.push($controlMove);
                }

                if (opts.removeEnable) {
                    var $controlRemove = controlsBuilder.remove(function () {
                        removeDocument.call(this, documentId);
                    });
                    controls.push($controlRemove);
                }

                if (opts.editEnable) {
                    var $controlEdit = controlsBuilder.edit(pageInfoBuilder.build.bind(pageInfoBuilder, documentId));
                    controls.push($controlEdit);
                }
            }

            return controlsBuilder.buildControlsBlock("<div>", controls);
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

        var $documentsContainer, $editorBody;

        function buildHead() {
            return documentWindowBuilder.buildHead("Document editor");
        }

        function buildFooter() {
            return documentWindowBuilder.buildFooter();
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
            docRestApi.read(null).done(function (documentList) {
                $editorBody = buildEditorBody(documentList, opts);
                $documentsContainer.append($editorBody);
            });
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

            return documentEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"body": $body},
                {"footer": $footer}
            ]).addClass("imcms-editor-window");
        }

        function removeDocument(documentId) {
            var documentRow = this.parentElement.parentElement;

            docRestApi.remove(documentId).done(function (responseCode) {
                responseCode === 200 && documentRow.remove();
            });
        }

        function loadData() {
            loadDocumentEditorContent({
                editEnable: true,
                removeEnable: true
            });
        }

        function clearData() {
            $editorBody.detach();
        }

        var documentWindowBuilder = new WindowBuilder({
            factory: buildDocumentEditor,
            loadDataStrategy: loadData,
            clearDataStrategy: clearData
        });

        return {
            buildBody: buildBody,
            loadDocumentEditorContent: loadDocumentEditorContent,
            build: function () {
                documentWindowBuilder.buildWindow.applyAsync(arguments, documentWindowBuilder);
            }
        };
    }
);
