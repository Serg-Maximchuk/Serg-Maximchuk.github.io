/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-content-manager-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder", "jquery"],
    function (BEM, windowComponents, components, $) {
        var $contentManager;
        var $folders;
        var $images;
        var $footer;

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
                function openCloseFolders() {
                    var $btn = $(this);
                    var btnText, btnState, imagesAndFooterLeft, foldersLeft;

                    if ($btn.attr("data-state") === "close") {
                        foldersLeft = 0;
                        imagesAndFooterLeft = "400px";
                        btnState = "open";
                        btnText = "hide folders";

                    } else {
                        foldersLeft = "-400px";
                        imagesAndFooterLeft = 0;
                        btnState = "close";
                        btnText = "show folders";
                    }

                    $folders.animate({"left": foldersLeft}, 600);
                    $images.add($footer).animate({"left": imagesAndFooterLeft}, 600);
                    $btn.attr("data-state", btnState).text(btnText);
                }

                var $showHideFolders = components.buttons.neutralButton({
                    id: "openCloseFolders",
                    text: "Show folders",
                    "data-state": "close",
                    click: openCloseFolders
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

                return windowComponents.buildFooter([$showHideFolders, $uploadNewImage, $saveAndClose]);
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
            $folders = buildFolders();
            $images = buildImages();
            $footer = buildFooter();

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
