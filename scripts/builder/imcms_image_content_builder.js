/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-image-content-builder",
    ["imcms-files-rest-api", "imcms-bem-builder", "imcms-components-builder", "imcms-primitives-builder", "jquery"],
    function (fileREST, BEM, components, primitives, $) {
        var OPENED_FOLDER_BTN_CLASS = "imcms-folder-btn--open";
        var SUBFOLDER_CLASS = "imcms-folders__subfolder";
        var ACTIVE_FOLDER_CLASS = "imcms-folder--active";

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

        function onFileCreated(response) {
            console.log(response);
        }

        function createNewFolder(parentFile) {
            var folderCreationBEM = new BEM({
                block: "imcms-panel-named",
                elements: {
                    "input": "imcms-input",
                    "button": "imcms-button"
                }
            });

            var $folderNameInput = primitives.imcmsInput();
            var $confirmBtn = components.buttons.neutralButton({
                text: "add+",
                click: function () {
                    var folderName = $folderNameInput.val();

                    if (!folderName) {
                        return;
                    }

                    fileREST.create({
                        path: parentFile.path,
                        name: folderName
                    }, onFileCreated);
                }
            });

            var $createFolderBlock = folderCreationBEM.buildBlock("<div>", [
                {"input": $folderNameInput},
                {"button": $confirmBtn}
            ]);

            console.log(parentFile);
            parentFile.$folders.find(".imcms-folders").eq(0).before($createFolderBlock);
        }

        function buildRootControls(rootFile) {
            var rootFolderControlsBEM = new BEM({
                block: "imcms-main-folders-controls",
                elements: {"control": "imcms-control"}
            });

            var $createFolderControl = rootFolderControlsBEM.buildElement("control", "<div>", {
                click: createNewFolder.bind(null, rootFile)
            }, ["create"]);

            return rootFolderControlsBEM.buildBlock("<div>", [{"control": $createFolderControl}]);
        }

        function buildRootFolder(rootFile) {
            rootFile.$folders = $foldersContainer;
            var $rootControls = buildRootControls(rootFile);

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
            var $subFolder = $button.toggleClass(OPENED_FOLDER_BTN_CLASS)
                .parent()
                .next("." + SUBFOLDER_CLASS);

            var isOpen = $button.hasClass(OPENED_FOLDER_BTN_CLASS);

            while ($subFolder.length) {
                $subFolder.css("display", isOpen ? "block" : "none");
                $subFolder = $subFolder.next("." + SUBFOLDER_CLASS);
            }
        }

        function onFolderClick(folder) {
            $("." + ACTIVE_FOLDER_CLASS).removeClass(ACTIVE_FOLDER_CLASS);
            $(this).addClass(ACTIVE_FOLDER_CLASS);

            viewModel.$images.forEach(function ($image) {
                $image.css("display", "none");
            });
            folder.$images.forEach(function ($image) {
                $image.css("display", "block");
            });
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

            return folderBEM.buildBlock("<div>", folderElements, {
                "data-folder-path": subfolder.path,
                click: function () {
                    onFolderClick.call(this, subfolder);
                }
            });
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
                return subfolder.$folders = buildSubFolder(subfolder, level);
            });
        }

        function onImageDelete(imageFile) {
            fileREST.remove(imageFile.path, function () {
                $(this).parent().parent().detach();
            }.bind(this));
        }

        function buildImageDescription(imageFile) {
            var descriptionBEM = new BEM({
                block: "imcms-choose-img-description",
                elements: {
                    "date": "",
                    "button": "",
                    "img-title": "imcms-title",
                    "img-size": ""
                }
            });

            var $date = descriptionBEM.buildElement("date", "<div>", {text: imageFile.uploaded});
            var $btnDelete = components.buttons.closeButton({
                click: function () {
                    onImageDelete.call(this, imageFile);
                }
            });
            var $title = descriptionBEM.buildElement("img-title", "<div>", {text: imageFile.name + "." + imageFile.format});
            var $size = descriptionBEM.buildElement("img-size", "<div>", {text: imageFile.resolution + imageFile.size});

            return descriptionBEM.buildBlock("<div>", [
                {"date": $date},
                {"button": $btnDelete},
                {"img-title": $title},
                {"img-size": $size}
            ]);
        }

        function buildImage(imageFile) {
            var imageWrapBEM = new BEM({
                block: "imcms-choose-img-wrap",
                elements: {
                    "img": "imcms-choose-img",
                    "description": "imcms-choose-img-description"
                }
            });

            var $image = imageWrapBEM.buildElement("img", "<div>").css({
                "background-image": "url(" + imageFile.path + ")"
            });

            var $description = buildImageDescription(imageFile);

            return imageWrapBEM.buildBlock("<div>", [
                {"img": $image},
                {"description": $description}
            ], {
                style: "display: none"
            });
        }

        function buildImages(folder) {
            folder.$images = folder.files.map(buildImage);
            viewModel.$images = viewModel.$images.concat(folder.$images);
            (folder.folders || []).forEach(buildImages);
        }

        function loadImageFoldersContent(folders) {
            var rootFolderLevel = 1;

            viewModel.root = folders[0];
            buildImages(viewModel.root);
            viewModel.$folders.push(buildRootFolder(viewModel.root));

            var $subfolders = buildSubFolders(viewModel.root, rootFolderLevel).map(function ($subfolder) {
                return rootFolderBEM.makeBlockElement("folders", $subfolder);
            });

            viewModel.$folders = viewModel.$folders.concat($subfolders);

            $foldersContainer.append(viewModel.$folders);
            $imagesContainer.append(viewModel.$images);
            viewModel.root.$images.forEach(function ($image) {
                $image.css("display", "block");
            });
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
