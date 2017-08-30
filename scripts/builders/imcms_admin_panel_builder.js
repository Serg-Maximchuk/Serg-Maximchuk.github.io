/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-admin-panel-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-editors-builder", "jquery"],
    function (BEM, componentsBuilder, editors, $) {
        var $panel;

        function logNotImplementedFeature(feature) {
            console.log("%c Not implemented feature: " + feature, "color: red;");
        }

        function showPageInfo() {
            editors.buildPageInfo(Imcms.currentDocId);
        }

        function initDocumentEditor() {
            editors.buildDocumentEditor();
        }

        function createAdminPanel() {
            var adminPanelBEM = new BEM({
                block: "imcms-admin-panel",
                elements: {
                    "item": "",
                    "logo": "",
                    "title": ""
                }
            });

            var panelButtonsBEM = new BEM({
                block: "imcms-menu",
                elements: {
                    "items": "",
                    "item": "imcms-menu__item"
                }
            });

            var $logo = adminPanelBEM.buildBlockElement("logo", "<a>", {
                href: "#" // maybe it should be the link to the start page?
            });
            var $logoItem = $("<div>").append($logo);
            var $title = adminPanelBEM.buildBlockElement("title", "<div>", {
                text: Imcms.version
            });
            var $titleItem = $("<div>").append($title);
            var $flagsItem = componentsBuilder.flags.flagsContainer("<div>", [
                componentsBuilder.flags.eng("<div>", true, {
                    click: function (e) {
                        e.preventDefault();
                        logNotImplementedFeature("flags click");
                    }
                }),
                componentsBuilder.flags.swe("<div>", false, {
                    click: function (e) {
                        e.preventDefault();
                        logNotImplementedFeature("flags click");
                    }
                })
            ]);
            var $menuItems = $("<ul>");
            var $publicViewButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "public",
                click: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("public view click");
                }
            }, ["public"]);

            var $editPageButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "edit",
                click: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("edit click");
                }
            }, ["edit"]);

            var $previewButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "preview",
                click: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("preview click");
                }
            }, ["preview"]);

            var $publishOfflineVersionButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "publish offline",
                click: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("publish offline version click");
                }
            }, ["publish-of"]);

            var $pageInfoButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "page info",
                click: showPageInfo
            }, ["page-info"]);

            var $openDocumentEditorButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "document",
                click: initDocumentEditor
            }, ["document"]);

            var $adminPageButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                text: "admin",
                click: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("admin click");
                }
            }, ["admin"]);

            var $logoutButton = panelButtonsBEM.buildBlockElement("item", "<li>", {
                html: componentsBuilder.buttons.positiveButton({
                    text: "log out",
                    click: function (e) {
                        e.preventDefault();
                        logNotImplementedFeature("logout click");
                    }
                })
            }, ["logout"]);

            $menuItems.append($publicViewButton)
                .append($editPageButton)
                .append($previewButton)
                .append($publishOfflineVersionButton)
                .append($pageInfoButton)
                .append($openDocumentEditorButton)
                .append($adminPageButton)
                .append($logoutButton);

            var $menuItem = panelButtonsBEM.buildBlock("<div>", [
                {"items": $menuItems}
            ]);

            return adminPanelBEM.buildBlock("<div>", [
                {"item": $logoItem},
                {"item": $titleItem},
                {"item": $flagsItem},
                {"item": $menuItem}
            ]);
        }

        var panelSensitivePixels = 15;

        function setShowPanelRule() {
            $(document).mousemove(function (event) {
                if (event.pageY >= 0 && event.pageY <= panelSensitivePixels) {
                    showPanel();
                }
            });
        }

        function setHidePanelRule() {
            $(document).click(function (event) {
                if ($(event.target).closest(".imcms-admin").length) {
                    return;
                }

                event.stopPropagation();
                hidePanel();
            });
        }

        function hidePanel() {
            setAdminPanelTop(-90);
        }

        function showPanel() {
            setAdminPanelTop(0);
        }

        function setAdminPanelTop(px) {
            $panel.css({"top": "" + px + "px"});
        }

        return {
            buildPanel: function () {
                $panel = $("<div>", {
                    "class": "imcms-admin",
                    html: createAdminPanel()
                });

                setShowPanelRule();
                setHidePanelRule();
                $("body").prepend($panel);
            }
        }
    }
);
