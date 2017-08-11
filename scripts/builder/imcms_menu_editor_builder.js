/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 10.08.17.
 */
Imcms.define("imcms-menu-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder", "jquery"],
    function (BEM, components, $) {
        var menuEditorBEM = new BEM({
            block: "imcms-menu-editor",
            elements: {
                "head": "imcms-head",
                "body": "imcms-menu-editor-body",
                "footer": "imcms-footer"
            }
        });

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

            function buildMenuItemControls() {
                var menuControlsBEM = new BEM({
                    block: "imcms-controls",
                    elements: {"control": "imcms-control"}
                });

                var $controlMove = menuControlsBEM.buildElement("control", "<div>", {}, ["move"]);
                var $controlRemove = menuControlsBEM.buildElement("control", "<div>", {}, ["remove"]);
                var $controlRename = menuControlsBEM.buildElement("control", "<div>", {}, ["rename"]);

                return menuControlsBEM.buildBlock("<div>", [
                    {"control": $controlMove},
                    {"control": $controlRemove},
                    {"control": $controlRename}
                ]);
            }

            function buildMenuItems() {
                var menuItemBEM = new BEM({
                    block: "imcms-menu-item",
                    elements: {
                        "info": "imcms-title imcms-grid-coll-2",
                        "controls": "imcms-controls"
                    }
                });

                var $menuItemId = menuItemBEM.buildElement("info", "<div>", {text: "1001"});
                var $menuItemTitle = menuItemBEM.buildElement("info", "<div>", {text: "Start page"});
                var $controls = buildMenuItemControls();

                return menuItemBEM.buildBlock("<div>", [
                    {"info": $menuItemId},
                    {"info": $menuItemTitle},
                    {"controls": $controls}
                ]);
            }

            function buildMenuElements() {
                var menuTreeBEM = new BEM({
                    block: "imcms-menu-items-tree",
                    elements: {"menu-items": "imcms-menu-items"}
                });

                var menuItemsBEM = new BEM({
                    block: "imcms-menu-items",
                    elements: {"menu-item": "imcms-menu-item"}
                });

                var $testMenuItem = buildMenuItems();

                var $menuItems = menuItemsBEM.buildBlock("<div>", [{"menu-item": $testMenuItem}], {
                    "data-menu-items-lvl": "1"
                });

                return menuTreeBEM.buildBlock("<div>", [{"menu-items": $menuItems}]);
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

            function buildMenuList() {
                var menuListBEM = new BEM({
                    block: "imcms-menu-list",
                    elements: {
                        "titles": "imcms-menu-list-titles",
                        "items": "imcms-menu-items-tree"
                    }
                });

                var $titles = buildMenuTitlesRow();
                var $menuList = buildMenuElements();

                return menuListBEM.buildBlock("<div>", [
                    {"titles": $titles},
                    {"items": $menuList}
                ]);
            }

            var bodyBEM = new BEM({
                block: "imcms-menu-editor-body",
                elements: {
                    "left-side": "imcms-left-side",
                    "right-side": "imcms-right-side"
                }
            });

            var $menuList = buildMenuList();
            var $menuElementsContainer = bodyBEM.buildElement("left-side", "<div>").append($menuList);
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

        return {
            build: function () {
                var $head = buildHead(),
                    $body = buildBody(),
                    $footer = buildFooter();

                return menuEditorBEM.buildBlock("<div>", [
                        {"head": $head},
                        {"body": $body},
                        {"footer": $footer}
                    ],
                    {id: "imcms-menu-editor"}
                ).appendTo("body");
            }
        };
    }
);
