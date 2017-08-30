/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-admin-panel-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-editors-builder", "jquery"],
    function (BEM, componentsBuilder, editors, $) {
        var $panel;

        var panelSensitivePixels = 15;

        function getNotImplementedButtonClick(feature) {
            return function (e) {
                e.preventDefault();
                console.log("%c Not implemented feature: " + feature, "color: red;");
            }
        }

        function showPageInfo() {
            editors.buildPageInfo(Imcms.currentDocId);
        }

        function initDocumentEditor() {
            editors.buildDocumentEditor();
        }

        function buildPanelButtons() {
            var panelButtonsBEM = new BEM({
                block: "imcms-menu",
                elements: {
                    "items": "",
                    "item": "imcms-menu__item"
                }
            });

            function buildPanelButton(buttonData) {
                return panelButtonsBEM.buildBlockElement("item", "<li>", {
                    html: buttonData.content,
                    click: buttonData.onClick
                }, buttonData.modifiers);
            }

            var buttons = [
                {
                    content: "public",
                    onClick: getNotImplementedButtonClick("public view click"),
                    modifiers: ["public"]
                }, {
                    content: "edit",
                    onClick: getNotImplementedButtonClick("edit click"),
                    modifiers: ["edit"]
                }, {
                    content: "preview",
                    onClick: getNotImplementedButtonClick("preview click"),
                    modifiers: ["preview"]
                }, {
                    content: "publish offline",
                    onClick: getNotImplementedButtonClick("publish offline version click"),
                    modifiers: ["publish-of"]
                }, {
                    content: "page info",
                    onClick: showPageInfo,
                    modifiers: ["page-info"]
                }, {
                    content: "document",
                    onClick: initDocumentEditor,
                    modifiers: ["document"]
                }, {
                    content: "admin",
                    onClick: getNotImplementedButtonClick("admin click"),
                    modifiers: ["admin"]
                }, {
                    content: componentsBuilder.buttons.positiveButton({
                        text: "log out",
                        click: getNotImplementedButtonClick("logout click")
                    }),
                    modifiers: ["logout"]
                }
            ].map(buildPanelButton);

            var $buttonsWrapper = $("<ul>").append(buttons);

            return panelButtonsBEM.buildBlock("<div>", [{"items": $buttonsWrapper}]);
        }

        function buildFlags() {
            return componentsBuilder.flags.flagsContainer("<div>", [
                componentsBuilder.flags.eng("<div>", true, {
                    click: getNotImplementedButtonClick("flags click")
                }),
                componentsBuilder.flags.swe("<div>", false, {
                    click: getNotImplementedButtonClick("flags click")
                })
            ]);
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

            var $logo = adminPanelBEM.buildBlockElement("logo", "<a>", {href: ""}); // fixme: link to start doc?
            var $logoItem = $("<div>").append($logo);

            var $title = adminPanelBEM.buildBlockElement("title", "<div>", {text: Imcms.version});
            var $titleItem = $("<div>").append($title);

            var $flagsItem = buildFlags();
            var $buttonsContainer = buildPanelButtons();

            return adminPanelBEM.buildBlock("<div>", [
                {"item": $logoItem},
                {"item": $titleItem},
                {"item": $flagsItem},
                {"item": $buttonsContainer}
            ]);
        }

        function setShowPanelRule() {
            $(document).mousemove(function (event) {
                if ((event.pageY >= 0) && (event.pageY <= panelSensitivePixels)) {
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
