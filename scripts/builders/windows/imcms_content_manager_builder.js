/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-content-manager-builder",
    [
        "imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder",
        "imcms-image-content-builder", "jquery"
    ],
    function (BEM, windowComponents, components, imageContentBuilder, $) {
        var $contentManager;
        var $foldersContainer;
        var $imagesContainer;
        var $footer;
        var $showHideFolders;

        function buildContentManager() {
            function closeWindow() {
                $contentManager.css("display", "none");
            }

            function buildHead() {
                return windowComponents.buildHead("Content manager", closeWindow);
            }

            function buildFoldersContainer() {
                var $closeFoldersBtn = components.buttons.closeButton({
                    id: "closeFolders",
                    click: function () {
                        $showHideFolders.click();
                    }
                });
                return leftSideBEM.buildBlock("<div>", [{"close-button": $closeFoldersBtn}]);
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
                        foldersLeft = "-100%";
                        imagesAndFooterLeft = 0;
                        btnState = "close";
                        btnText = "show folders";
                    }

                    $foldersContainer.animate({"left": foldersLeft}, 600);
                    $imagesContainer.add($footer).animate({"left": imagesAndFooterLeft}, 600);
                    $btn.attr("data-state", btnState).text(btnText);
                }

                $showHideFolders = components.buttons.neutralButton({
                    id: "openCloseFolders",
                    text: "Show folders",
                    "data-state": "close",
                    click: openCloseFolders
                });

                var $fileInput = $("<input>", {
                    type: "file",
                    style: "display: none;",
                    change: function () {
                        console.log("%c Not implemented feature: upload new image", "color: red;");
                        console.log(this.files[0]);
                    }
                });

                var $uploadNewImage = components.buttons.positiveButton({
                    text: "Upload",
                    click: function () {
                        $fileInput.click();
                    }
                });

                var $saveAndClose = components.buttons.saveButton({
                    text: "Save and close",
                    click: closeWindow // fixme: just closing now, should be save and close
                });

                return windowComponents.buildFooter([$showHideFolders, $fileInput, $uploadNewImage, $saveAndClose]);
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
            $foldersContainer = buildFoldersContainer();
            $imagesContainer = contentManagerBEM.buildElement("right-side", "<div>");
            $footer = buildFooter();

            return contentManagerBEM.buildBlock("<div>", [
                {"head": $head},
                {"left-side": $foldersContainer},
                {"right-side": $imagesContainer},
                {"footer": $footer}
            ]).addClass("imcms-editor-window");
        }

        var leftSideBEM = new BEM({
            block: "imcms-left-side",
            elements: {
                "close-button": "",
                "controls": "imcms-main-folders-controls",
                "folders": "imcms-folders"
            }
        });

        function buildContent() {
            imageContentBuilder.loadAndBuildContent({
                foldersContainer: $foldersContainer,
                imagesContainer: $imagesContainer
            });
        }

        return {
            build: function () {
                if (!$contentManager) {
                    $contentManager = buildContentManager().appendTo("body");
                    setTimeout(buildContent);
                }

                $contentManager.css("display", "block");
            }
        };
    }
);