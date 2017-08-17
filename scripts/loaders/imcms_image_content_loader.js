/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-image-content-loader", //todo: rename to images content builder and move
    ["imcms-files-rest-api", "imcms-bem-builder"],
    function (fileREST, BEM) {
        var $foldersContainer, $imagesContainer;

        var viewModel = {
            root: {},
            $folders: [],
            $images: []
        };

        function createNewFolder() {
            // todo: implement
        }

        function buildRootControls() {
            var rootFolderControlsBEM = new BEM({
                block: "imcms-main-folders-controls",
                elements: {
                    "control": "imcms-control"
                }
            });

            var $createFolderControl = rootFolderControlsBEM.buildElement("control", "<div>", {
                click: createNewFolder
            }, ["create"]);

            return rootFolderControlsBEM.buildBlock("<div>", [{"control": $createFolderControl}]);
        }

        function buildRootFolder(folder) {
            var rootFolderBEM = new BEM({
                block: "imcms-left-side",
                elements: {
                    "controls": "imcms-main-folders-controls",
                    "folders": "imcms-folders"
                }
            });

            var $rootControls = buildRootControls();

            return rootFolderBEM.makeBlockElement("controls", $rootControls);
        }

        function buildImages(folder) {
            return [];
        }

        function loadImageFoldersContent(folders) {
            viewModel.root = folders[0];
            viewModel.$folders.unshift(buildRootFolder(viewModel.root));
            viewModel.$images.unshift(buildImages(viewModel.root));

            $foldersContainer.append(viewModel.$folders);
            $imagesContainer.append(viewModel.$images);
        }

        return {
            loadContent: function (options) {
                $foldersContainer = options.foldersContainer;
                $imagesContainer = options.imagesContainer;

                fileREST.read("/images", loadImageFoldersContent);
            }
        };
    }
);
