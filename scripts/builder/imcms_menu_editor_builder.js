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
            var bodyBEM = new BEM({
                block: "imcms-menu-editor-body",
                elements: {
                    "left-side": "imcms-left-side",
                    "right-side": "imcms-right-side"
                }
            });

            var $menuElementsContainer = bodyBEM.buildElement("left-side", "<div>"); // empty for now
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
