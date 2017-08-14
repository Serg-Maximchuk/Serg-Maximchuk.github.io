/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 10.08.17.
 */
Imcms.define("imcms-menu-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-modal-window", "jquery"],
    function (BEM, components, imcmsModalWindow, $) {
        var menuEditorBEM = new BEM({
            block: "imcms-menu-editor",
            elements: {
                "head": "imcms-head",
                "body": "imcms-menu-editor-body",
                "footer": "imcms-footer"
            }
        });

        var $menuElementsContainer;

        function closeMenuEditor() {
            $("#imcms-menu-editor").css("display", "none");
        }

        function buildHead() {
            var headBEM = new BEM({
                block: "imcms-head",
                elements: {
                    "title": "imcms-title",
                    "button": ""
                }
            });

            var $title = headBEM.buildElement("title", "<div>", {
                text: "menu editor: "
            }).append($("<span>", {text: "1001-1"})); // 1001 doc, 1st menu; todo: receive correct values

            var $closeBtn = components.buttons.closeButton({
                click: closeMenuEditor
            });

            return headBEM.buildBlock("<div>", [
                {"title": $title},
                {"button": $closeBtn}
            ]);
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
            var $documentsContainer = bodyBEM.buildElement("right-side", "<div>"); // todo: should be document editor

            return bodyBEM.buildBlock("<div>", [
                {"left-side": $menuElementsContainer},
                {"right-side": $documentsContainer}
            ]);
        }

        function buildFooter() {
            var footerBEM = new BEM({
                block: "imcms-footer",
                elements: {
                    "buttons": "imcms-buttons"
                }
            });

            var $saveAndClose = components.buttons.saveButton({
                text: "Save and close",
                click: closeMenuEditor // fixme: just closing now, should be save and close
            });

            var $buttons = footerBEM.makeBlockElement("buttons",
                components.buttons.buttonsContainer("<div>", [$saveAndClose])
            );

            return footerBEM.buildBlock("<div>", [
                {"buttons": $buttons}
            ]);
        }

        function getMenuElementsTree() {
            // mock data
            return [{
                id: 1001,
                title: "Start page",
                children: [{
                    id: 1002,
                    title: "Second page"
                }, {
                    id: 1003,
                    title: "Another page 1"
                }, {
                    id: 1004,
                    title: "Another page 2"
                }, {
                    id: 1005,
                    title: "Another page 3"
                }]
            }, {
                id: 1006,
                title: "Main page",
                children: [{
                    id: 1012,
                    title: "Third page"
                }, {
                    id: 1013,
                    title: "Inner page 1"
                }, {
                    id: 1014,
                    title: "Inner page 2"
                }, {
                    id: 1015,
                    title: "Inner page 3",
                    children: [{
                        id: 1021,
                        title: "Some page"
                    }, {
                        id: 1022,
                        title: "One more page 1"
                    }, {
                        id: 1023,
                        title: "One more page 2"
                    }, {
                        id: 1124,
                        title: "One more page 3"
                    }]
                }]
            }, {
                id: 1007,
                title: "Childless page"
            }, {
                id: 1008,
                title: "Last page",
                children: [{
                    id: 1009,
                    title: "Some page"
                }, {
                    id: 1010,
                    title: "One more page 1"
                }, {
                    id: 1011,
                    title: "One more page 2"
                }, {
                    id: 1111,
                    title: "One more page 3"
                }]
            }];
        }

        function buildMenuEditorContent(menuElementsTree) {
            function removeMenuItem() {
                var currentMenuItem = $(this).closest(".imcms-menu-item"),
                    currentMenuItemName = currentMenuItem.find(".imcms-menu-item__info-title").text();

                var question = "Do you want to remove menu item \"" + currentMenuItemName + "\"?";
                imcmsModalWindow.showModalWindow(question, function (answer) {
                    if (answer) {
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
                });
            }

            function buildMenuItemControls() {
                var menuControlsBEM = new BEM({
                    block: "imcms-controls",
                    elements: {"control": "imcms-control"}
                });

                var $controlMove = menuControlsBEM.buildElement("control", "<div>", {}, ["move"]);
                var $controlRemove = menuControlsBEM.buildElement("control", "<div>", {click: removeMenuItem},
                    ["remove"]);
                var $controlRename = menuControlsBEM.buildElement("control", "<div>", {}, ["rename"]);

                return menuControlsBEM.buildBlock("<div>", [
                    {"control": $controlMove},
                    {"control": $controlRemove},
                    {"control": $controlRename}
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
                // todo: decide what to do with this
                // var $menuItemTitle = menuItemBEM.buildElement("info", "<div>", {text: menuElementTree.title});
                var $controls = buildMenuItemControls();

                var $menuItemRowComponents = [
                    {
                        "info": $menuItemId,
                        modifiers: ["id"]
                    },
                    // {"info": $menuItemTitle},
                    {"controls": $controls}
                ];

                if (menuElementTree.children.length) {
                    var $openSubMenuBtn = menuItemBEM.buildElement("btn", "<div>", {
                        click: showHideSubmenu
                    });
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

        return {
            build: function () {
                var $head = buildHead(),
                    $body = buildBody(),
                    $footer = buildFooter();

                var docId = 1001;  // receive correct doc id
                var menuId = 1;  // receive correct menu id

                menuEditorBEM.buildBlock("<div>", [
                        {"head": $head},
                        {"body": $body},
                        {"footer": $footer}
                    ],
                    {
                        id: "imcms-menu-editor",
                        "data-document-id": docId, // receive correct doc id
                        "data-menu-id": menuId // receive correct menu id
                    }
                ).appendTo("body");

                var menuElementsTree = getMenuElementsTree(); // mock elements, later receive real data from server
                var $menuElementsTree = buildMenuEditorContent(menuElementsTree);
                $menuElementsContainer.append($menuElementsTree);
            }
        };
    }
);
