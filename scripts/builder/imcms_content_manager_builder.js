/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-content-manager-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder", "jquery"],
    function (BEM, windowComponents, components, $) {
        var $contentManager;

        function buildContentManager() {
            function closeWindow() {
                $contentManager.css("display", "none");
            }

            function buildHead() {
                return windowComponents.buildHead("Content manager", closeWindow);
            }

            function buildFolders() {
                return $("<div>");
            }

            function buildImages() {
                return $("<div>");
            }

            function buildFooter() {
                var footerBEM = new BEM({
                    block: "imcms-footer",
                    elements: {
                        "buttons": "imcms-buttons"
                    }
                });

                var $showHideFolders = components.buttons.neutralButton({
                    id: "openCloseFolders",
                    text: "Show folders",
                    "data-state": "close"
                });

                var $uploadNewImage = components.buttons.positiveButton({
                    text: "Upload",
                    click: function () {
                        console.log("%c Not implemented feature: upload new image", "color: red;");
                    }
                });

                var $saveAndClose = components.buttons.saveButton({
                    text: "Save and close",
                    click: closeWindow // fixme: just closing now, should be save and close
                });

                var $buttons = footerBEM.makeBlockElement("buttons",
                    components.buttons.buttonsContainer("<div>", [$showHideFolders, $uploadNewImage, $saveAndClose])
                );

                return footerBEM.buildBlock("<div>", [{"buttons": $buttons}]);
            }

            var contentManagerBEM = new BEM({
                block: "imcms-content-manager",
                elements: {
                    "head": "imcms-head",
                    "left-side": "imcms-left-side",
                    "right-side": "imcms-right-side",
                    "footer": "imcms-footer"
                }
            });

            var $head = buildHead();
            var $folders = buildFolders();
            var $images = buildImages();
            var $footer = buildFooter();

            return contentManagerBEM.buildBlock("<div>", [
                {"head": $head},
                {"left-side": $folders},
                {"right-side": $images},
                {"footer": $footer}
            ]);
        }

        return {
            build: function () {
                if (!$contentManager) {
                    $contentManager = buildContentManager().appendTo("body");
                }

                $contentManager.css("display", "block");
            }
        };
    }
);
