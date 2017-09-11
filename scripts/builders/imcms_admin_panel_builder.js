/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-admin-panel-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-page-info-builder", "imcms-document-editor-builder", "jquery"],
    function (BEM, componentsBuilder, pageInfoBuilder, documentEditorBuilder, $) {
        var $panel;

        var panelSensitivePixels = 15;

        function getNotImplementedButtonClick(feature) {
            return function (e) {
                e.preventDefault();
                console.log("%c Not implemented feature: " + feature, "color: red;");
            }
        }

        function showPageInfo() {
            pageInfoBuilder.build(Imcms.currentDocId);
        }

        function initDocumentEditor() {
            documentEditorBuilder.build();
        }

        function buildPanelButtons(opts) {
            var panelButtonsBEM = new BEM({
                block: "imcms-menu",
                elements: {
                    "items": "",
                    "item": "imcms-menu__item"
                }
            });

            function buildPanelButton(buttonData) {
                var attributes = {
                    html: buttonData.content,
                    click: buttonData.onClick
                };

                if (opts && opts.active === buttonData.name) {
                    attributes["class"] = "imcms-menu__item--active";
                }

                return panelButtonsBEM.buildBlockElement("item", "<li>", attributes, buttonData.modifiers);
            }

            var buttons = [
                {
                    name: 'public',
                    content: '<a href="index.html">public</a>', // todo: temporary demo pages, should be changed!!!1
                    modifiers: ["public"]
                }, {
                    name: 'edit',
                    content: '<a href="edit_mode.html">edit</a>', // todo: temporary demo pages, should be changed!!!1
                    modifiers: ["edit"]
                }, {
                    name: 'preview',
                    content: "preview",
                    onClick: getNotImplementedButtonClick("preview click"),
                    modifiers: ["preview"]
                }, {
                    name: 'publish_offline',
                    content: "publish offline",
                    onClick: getNotImplementedButtonClick("publish offline version click"),
                    modifiers: ["publish-of"]
                }, {
                    name: 'page_info',
                    content: "page info",
                    onClick: showPageInfo,
                    modifiers: ["page-info"]
                }, {
                    name: 'document',
                    content: "document",
                    onClick: initDocumentEditor,
                    modifiers: ["document"]
                }, {
                    name: 'admin',
                    content: "admin",
                    onClick: getNotImplementedButtonClick("admin click"),
                    modifiers: ["admin"]
                }, {
                    name: 'logout',
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

        function createAdminPanel(opts) {
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
            var $buttonsContainer = buildPanelButtons(opts);

            return adminPanelBEM.buildBlock("<div>", [
                {"item": $logoItem},
                {"item": $titleItem},
                {"item": $flagsItem},
                {"item": $buttonsContainer}
            ]);
        }

        function setShowPanelRule() {
            var $body = $("body");
            $(document).mousemove(function (event) {
                if ((event.clientY >= 0) && (event.clientY <= panelSensitivePixels)) {
                    if($body.scrollTop() === 0) {
                        $body.animate({"top": "90px"}, 150)
                    } else {
                        $body.css({"padding-top": "0px"})
                    }
                    showPanel();
                }
            });
        }

        function setHidePanelRule() {
            $(document).click(function (event) {
                if ($(event.target).closest(".imcms-admin").length) {
                    return;
                }
                $("body").animate({"top": "0px"}, 150);
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
            buildPanel: function (opts) {
                $panel = $("<div>", {
                    "class": "imcms-admin",
                    html: createAdminPanel(opts)
                });

                setShowPanelRule();
                setHidePanelRule();
                $("body").prepend($panel);
            }
        }
    }
);
