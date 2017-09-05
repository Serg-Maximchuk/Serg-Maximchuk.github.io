/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 10.08.17.
 */
Imcms.define("imcms-menu-editor-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-document-editor-builder", "imcms-modal-window-builder",
        "imcms-window-components-builder", "imcms-window-builder", "imcms-menu-rest-api", "imcms-controls-builder",
        "jquery"
    ],
    function (BEM, components, documentEditorBuilder, imcmsModalWindow, windowComponents, WindowBuilder, menuRestApi,
              controls, $) {
        var menuEditorBEM = new BEM({
            block: "imcms-menu-editor",
            elements: {
                "head": "imcms-head",
                "body": "imcms-menu-editor-body",
                "footer": "imcms-footer"
            }
        });

        var $title, $menuElementsContainer, $documentsContainer;
        var docId, menuId;

        function closeMenuEditor() {
            menuWindowBuilder.closeWindow();
        }

        function buildHead() {
            return windowComponents.buildHead("menu editor", closeMenuEditor);
        }

        function buildBody() {
            var bodyBEM = new BEM({
                block: "imcms-menu-editor-body",
                elements: {
                    "left-side": "imcms-left-side",
                    "right-side": "imcms-right-side"
                }
            });

            $menuElementsContainer = bodyBEM.buildElement("left-side", "<div>");
            $documentsContainer = bodyBEM.buildElement("right-side", "<div>");

            return bodyBEM.buildBlock("<div>", [
                {"left-side": $menuElementsContainer},
                {"right-side": $documentsContainer}
            ]);
        }

        function buildFooter() {
            var $saveAndClose = components.buttons.saveButton({
                text: "Save and close",
                click: closeMenuEditor // fixme: just closing now, should be save and close
            });

            return windowComponents.buildFooter([$saveAndClose]);
        }

        function buildMenuEditorContent(menuElementsTree) {
            function removeMenuItemFromEditor(currentMenuItem) {
                var submenuItem = currentMenuItem.parent().find(".imcms-menu-items"),
                    parentMenuItem = currentMenuItem.closest(".imcms-menu-items"),
                    currentMenuItemWrap = parentMenuItem.parent();

                submenuItem.remove();
                currentMenuItem.remove();
                parentMenuItem.remove();

                if (currentMenuItemWrap.children().length === 1) {
                    currentMenuItemWrap.find(".imcms-menu-item__btn").remove();
                }
            }

            function removeMenuItem(menuItemDocId) {
                var currentMenuItem = $(this).closest(".imcms-menu-item"),
                    currentMenuItemName = currentMenuItem.find(".imcms-menu-item__info").text();

                var question = "Do you want to remove menu item \"" + currentMenuItemName + "\"?";
                imcmsModalWindow.buildModalWindow(question, function (answer) {
                    if (!answer) {
                        return;
                    }

                    menuRestApi.remove({
                        docId: docId,
                        menuId: menuId,
                        menuItemDocId: menuItemDocId
                    }).done(function () {
                        removeMenuItemFromEditor(currentMenuItem)
                    });
                });
            }

            function buildMenuItemControls(menuItemDocId) {
                var menuControlsBEM = new BEM({
                    block: "imcms-controls",
                    elements: {"control": "imcms-control"}
                });

                var $controlMove = controls.move();
                var $controlRemove = controls.remove(function () {
                    removeMenuItem.call(this, menuItemDocId);
                });
                var $controlEdit = controls.edit();

                return menuControlsBEM.buildBlock("<div>", [
                    {"control": $controlMove},
                    {"control": $controlRemove},
                    {"control": $controlEdit}
                ]);
            }

            function showHideSubmenu() {
                var $btn = $(this),
                    level = $btn.parents(".imcms-menu-items").attr("data-menu-items-lvl")
                ;

                level = parseInt(level) + 1;
                $btn.parents(".imcms-menu-items")
                    .find(".imcms-menu-items[data-menu-items-lvl=" + level + "]")
                    .each(function () {
                        $(this).slideToggle()
                    });
                $btn.toggleClass("imcms-menu-item-btn--open");
            }

            function buildMenuItems(menuElementTree) {
                var menuItemBEM = new BEM({
                    block: "imcms-menu-item",
                    elements: {
                        "btn": "",
                        "info": "imcms-title",
                        "controls": "imcms-controls"
                    }
                });

                var $menuItemId = menuItemBEM.buildElement("info", "<div>", {
                    text: menuElementTree.id + " - " + menuElementTree.title
                });
                var $controls = buildMenuItemControls(menuElementTree.id);

                var $menuItemRowComponents = [
                    {"info": $menuItemId},
                    {"controls": $controls}
                ];

                if (menuElementTree.children.length) {
                    var $openSubMenuBtn = menuItemBEM.buildElement("btn", "<div>", {click: showHideSubmenu});
                    $menuItemRowComponents.unshift({"btn": $openSubMenuBtn});
                }

                return menuItemBEM.buildBlock("<div>", $menuItemRowComponents);
            }

            function buildMenuItemTree(menuElementTree, level) {
                menuElementTree.children = menuElementTree.children || [];

                var menuItemsBEM = new BEM({
                    block: "imcms-menu-items",
                    elements: {"menu-item": "imcms-menu-item"}
                });

                var $testMenuItem = buildMenuItems(menuElementTree);
                var treeBlock = menuItemsBEM.buildBlock("<div>", [{"menu-item": $testMenuItem}], {
                    "data-menu-items-lvl": level
                });

                ++level;

                var $childElements = menuElementTree.children.map(function (childElement) {
                    return buildMenuItemTree(childElement, level).addClass("imcms-submenu-items--close");
                });

                return treeBlock.append($childElements);
            }

            function buildMenuElements(menuElementsTree) {
                var menuTreeBEM = new BEM({
                    block: "imcms-menu-items-tree",
                    elements: {"menu-items": "imcms-menu-items"}
                });

                var $blockElements = menuElementsTree.map(function (menuElementTree) {
                    var $menuItems = buildMenuItemTree(menuElementTree, 1);
                    return {"menu-items": $menuItems}
                });

                return menuTreeBEM.buildBlock("<div>", $blockElements);
            }

            function buildMenuTitlesRow() {
                var titlesBEM = new BEM({
                    block: "imcms-menu-list-titles",
                    elements: {"title": "imcms-grid-coll-2"}
                });

                var $idColumnHead = titlesBEM.buildElement("title", "<div>", {text: "id"});
                var $titleColumnHead = titlesBEM.buildElement("title", "<div>", {text: "Title"});

                return titlesBEM.buildBlock("<div>", [
                    {"title": $idColumnHead},
                    {"title": $titleColumnHead}
                ]);
            }

            var menuListBEM = new BEM({
                block: "imcms-menu-list",
                elements: {
                    "titles": "imcms-menu-list-titles",
                    "items": "imcms-menu-items-tree"
                }
            });

            var $titles = buildMenuTitlesRow();
            var $menuList = buildMenuElements(menuElementsTree);

            return menuListBEM.buildBlock("<div>", [
                {"titles": $titles},
                {"items": $menuList}
            ]);
        }

        function fillEditorContent(menuElementsTree) {
            var $menuElementsTree = buildMenuEditorContent(menuElementsTree);
            $menuElementsContainer.append($menuElementsTree);

            var $documentEditor = documentEditorBuilder.buildBody();
            $documentsContainer.append($documentEditor);
            documentEditorBuilder.loadDocumentEditorContent({moveEnable: true});
        }

        function loadMenuEditorContent(opts) {
            addHeadData(opts);
            menuRestApi.read(opts).done(fillEditorContent);
        }

        function addHeadData(opts) {
            $title.append(": " + opts.docId + "-" + opts.menuId);
        }

        function buildMenuEditor(opts) {
            docId = opts.docId;
            menuId = opts.menuId;

            var $head = buildHead(),
                $body = buildBody(),
                $footer = buildFooter();

            $title = $head.find(".imcms-title");

            return menuEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"body": $body},
                {"footer": $footer}
            ]).addClass("imcms-editor-window");
        }

        function clearData() {
            $title.text("Menu Editor");
            $menuElementsContainer.add($documentsContainer).empty();
        }

        var menuWindowBuilder = new WindowBuilder({
            factory: buildMenuEditor,
            loadDataStrategy: loadMenuEditorContent,
            clearDataStrategy: clearData
        });

        return {
            build: function (opts) {
                menuWindowBuilder.buildWindow.applyAsync(arguments, menuWindowBuilder);
            }
        };
    }
);
