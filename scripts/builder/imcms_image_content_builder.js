/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-image-content-builder",
    ["imcms-files-rest-api", "imcms-bem-builder", "jquery"],
    function (fileREST, BEM, $) {
        var $foldersContainer, $imagesContainer;

        var viewModel = {
            root: {},
            $folders: [],
            $images: []
        };

        var rootFolderBEM = new BEM({
            block: "imcms-left-side",
            elements: {
                "controls": "imcms-main-folders-controls",
                "folders": "imcms-folders"
            }
        });

        function createNewFolder() {
            // todo: implement
        }

        function buildRootControls() {
            var rootFolderControlsBEM = new BEM({
                block: "imcms-main-folders-controls",
                elements: {"control": "imcms-control"}
            });

            var $createFolderControl = rootFolderControlsBEM.buildElement("control", "<div>", {
                click: createNewFolder
            }, ["create"]);

            return rootFolderControlsBEM.buildBlock("<div>", [{"control": $createFolderControl}]);
        }

        function buildRootFolder() {
            var $rootControls = buildRootControls();

            return rootFolderBEM.makeBlockElement("controls", $rootControls);
        }

        function moveFolder() {
            // todo: implement!
        }

        function removeFolder() {
            // todo: implement!
        }

        function renameFolder() {
            // todo: implement!
        }

        function createFolder() {
            // todo: implement!
        }

        function buildControls(subfolder) {
            var controlsBEM = new BEM({
                block: "imcms-controls",
                elements: {"control": "imcms-control"}
            });

            var controlsElements = [
                controlsBEM.buildElement("control", "<div>", {click: moveFolder}, ["move"]),
                controlsBEM.buildElement("control", "<div>", {click: removeFolder}, ["remove"]),
                controlsBEM.buildElement("control", "<div>", {click: renameFolder}, ["rename"]),
                controlsBEM.buildElement("control", "<div>", {click: createFolder}, ["create"])
            ];

            return controlsBEM.buildBlock("<div>", controlsElements, {}, "control");
        }

        function openSubFolders() {
            var $button = $(this);
            var $subFolder = $button.toggleClass("imcms-folder-btn--open")
                .parent()
                .next(".imcms-folders__subfolder");

            var isOpen = $button.hasClass("imcms-folder-btn--open");

            while ($subFolder.length) {
                $subFolder.css("display", isOpen ? "block" : "none");
                $subFolder = $subFolder.next(".imcms-folders__subfolder");
            }
        }

        function buildFolder(subfolder) {
            var folderBEM = new BEM({
                block: "imcms-folder",
                elements: {
                    "btn": "",
                    "name": "imcms-title",
                    "controls": "imcms-controls"
                }
            });

            var $controls = buildControls(subfolder);
            var $name = folderBEM.buildElement("name", "<div>", {text: subfolder.name});
            var folderElements = [
                {"name": $name},
                {"controls": $controls}
            ];

            if (subfolder.folders && subfolder.folders.length) {
                var $openSubfoldersBtn = folderBEM.buildElement("btn", "<div>", {click: openSubFolders});
                folderElements.unshift({"btn": $openSubfoldersBtn});
            }

            return folderBEM.buildBlock("<div>", folderElements, {"data-folder-path": subfolder.path});
        }

        function buildSubFolder(subfolder, level) {
            var foldersBEM = new BEM({
                block: "imcms-folders",
                elements: {
                    "folder": "imcms-folder",
                    "subfolder": "imcms-folders"
                }
            });

            var isSubLevel = (level > 1);
            var blockElements = [{"folder": buildFolder(subfolder)}];

            if (subfolder.folders && subfolder.folders.length) {
                buildSubFolders(subfolder, level + 1).forEach(function ($subfolder) {
                    var subfolder = {"subfolder": $subfolder};

                    if (isSubLevel) {
                        subfolder.modifiers = ["close"];
                    }

                    blockElements.push(subfolder);
                });
            }

            return foldersBEM.buildBlock("<div>", blockElements, {"data-folders-lvl": level});
        }

        function buildSubFolders(folder, level) {
            return folder.folders.map(function (subfolder) {
                return buildSubFolder(subfolder, level);
            });
        }

        function buildImages(folder) {
            return [];
        }

        function loadImageFoldersContent(folders) {
            var rootFolderLevel = 1;

            viewModel.root = folders[0];
            viewModel.$folders.push(buildRootFolder());

            var $subfolders = buildSubFolders(viewModel.root, rootFolderLevel).map(function ($subfolder) {
                return rootFolderBEM.makeBlockElement("folders", $subfolder);
            });

            viewModel.$folders = viewModel.$folders.concat($subfolders);
            viewModel.$images.unshift(buildImages(viewModel.root));

            $foldersContainer.append(viewModel.$folders);
            $imagesContainer.append(viewModel.$images);
        }

        return {
            loadAndBuildContent: function (options) {
                $foldersContainer = options.foldersContainer;
                $imagesContainer = options.imagesContainer;

                fileREST.read("/images", loadImageFoldersContent);
            }
        };
    }
);
