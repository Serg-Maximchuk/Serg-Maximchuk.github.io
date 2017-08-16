/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-content-manager-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder", "imcms-folders-rest-api", "jquery"],
    function (BEM, windowComponents, components, foldersREST, $) {
        var $contentManager;
        var $folders;
        var $images;
        var $footer;
        var $showHideFolders;
        var $controls;

        function buildContentManager() {
            function closeWindow() {
                $contentManager.css("display", "none");
            }

            function buildHead() {
                return windowComponents.buildHead("Content manager", closeWindow);
            }

            function createNewFolder($currentFolder) {
                // todo: implement this!
            }

            function createNewFirstLevelFolder() {
                createNewFolder($controls);
            }

            function buildControls() {
                var controlsBEM = new BEM({
                    block: "imcms-main-folders-controls",
                    elements: {
                        "control": "imcms-control",
                        "control-close": ""
                    }
                });

                var $closeFoldersBtn = components.buttons.closeButton({
                    id: "closeFolders",
                    click: function () {
                        $showHideFolders.click();
                    }
                });

                var $createFolderBtn = controlsBEM.buildElement("control", "<div>", {
                    click: createNewFirstLevelFolder
                }, ["create"]);

                return controlsBEM.buildBlock("<div>", [
                    {"control-close": $closeFoldersBtn},
                    {"control": $createFolderBtn}
                ]);
            }

            function buildFolders() {
                $controls = buildControls();
                return leftSideBEM.buildBlock("<div>", [{"controls": $controls}]);
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
                        foldersLeft = "-100%";
                        imagesAndFooterLeft = 0;
                        btnState = "close";
                        btnText = "show folders";
                    }

                    $folders.animate({"left": foldersLeft}, 600);
                    $images.add($footer).animate({"left": imagesAndFooterLeft}, 600);
                    $btn.attr("data-state", btnState).text(btnText);
                }

                $showHideFolders = components.buttons.neutralButton({
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

        var leftSideBEM = new BEM({
            block: "imcms-left-side",
            elements: {
                "controls": "imcms-main-folders-controls",
                "folders": "imcms-folders"
            }
        });

        function buildFoldersTrees() {
            return [];
        }

        function buildFolders(folders) {
            var $foldersTrees = buildFoldersTrees(folders);
            $folders.append($foldersTrees);
        }

        function loadFoldersContent() {
            foldersREST.read("/", buildFolders);
        }

        return {
            build: function () {
                if (!$contentManager) {
                    $contentManager = buildContentManager().appendTo("body");
                    setTimeout(loadFoldersContent);
                }

                $contentManager.css("display", "block");
            }
        };
    }
);