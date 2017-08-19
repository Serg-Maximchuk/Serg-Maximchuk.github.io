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
        var ROOT_FOLDER_LEVEL = 0;

        var $foldersContainer, $imagesContainer;

        var viewModel = {
            root: {},
            $folder: [],
            $images: []
        };

        var rootFolderBEM = new BEM({
            block: "imcms-left-side",
            elements: {
                "controls": "imcms-main-folders-controls",
                "folders": "imcms-folders"
            }
        });

        function onFolderCreated(response) {
            console.log(response);
            response.$images = [];
            response.$folder = buildSubFolder(response, this.parentLevel + 1)
                .addClass(SUBFOLDER_CLASS)
                .css("display", "block")
            ;

            this.$block.replaceWith(response.$folder);
        }

        var controlsBuilder = (function () {
            var controlsBEM = new BEM({
                block: "",
                elements: {"control": "imcms-control"}
            });

            function buildControl(modifier, onClick) {
                return controlsBEM.buildElement("control", "<div>", {click: onClick}, [modifier]);
            }

            return {
                move: function (folder) {
                    return buildControl("move", moveFolder.bind(folder));
                },
                remove: function (folder) {
                    return buildControl("remove", removeFolder.bind(folder));
                },
                rename: function (folder) {
                    return buildControl("rename", renameFolder.bind(folder));
                },
                create: function (folder, level) {
                    return buildControl("create", showFolderCreationBlock.bind(folder, level));
                }
            };
        })();

        function buildRootControls(rootFile) {
            var rootFolderControlsBEM = new BEM({
                block: "imcms-main-folders-controls",
                elements: {"control": "imcms-control"}
            });

            var $createFolderControl = controlsBuilder.create(rootFile, ROOT_FOLDER_LEVEL);

            return rootFolderControlsBEM.buildBlock("<div>", [{"control": $createFolderControl}]);
        }

        function buildRootFolder(rootFile) {
            rootFile.$folder = $foldersContainer;
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

        function buildFolderCreationBlock(parentFolder, level) {
            folderCreationBlockId = "imcms-folder-create-block";
            $("#" + folderCreationBlockId).detach();

            var folderCreationBEM = new BEM({
                block: "imcms-panel-named",
                elements: {
                    "input": "imcms-input",
                    "button": "imcms-button"
                }
            });

            var $folderNameInput = primitives.imcmsInput({placeholder: "New folder name"});
            var $confirmBtn = components.buttons.neutralButton({
                text: "add+",
                click: function () {
                    var folderName = $folderNameInput.val();
                    $folderNameInput.val('');

                    if (!folderName) {
                        return;
                    }

                    fileREST.create.call({
                        parentLevel: level,
                        $block: $folderCreationBlock
                    }, {
                        path: parentFolder.path,
                        name: folderName
                    }, onFolderCreated);
                }
            });

            var $folderCreationBlock = folderCreationBEM.buildBlock("<div>", [
                {"input": $folderNameInput},
                {"button": $confirmBtn}
            ], {id: folderCreationBlockId});

            return $folderCreationBlock;
        }

        function showFolderCreationBlock(level) {
            var parentFolder = this; // manually specified context
            var $createFolderBlock = buildFolderCreationBlock(parentFolder, level);
            var $subFolders = parentFolder.$folder.find(".imcms-folders");

            if ($subFolders.length) {
                $subFolders.eq(0).before($createFolderBlock);
                return;
            }

            parentFolder.$folder.append($createFolderBlock);
        }

        function buildControls(subfolder, level) {
            var controlsBEM = new BEM({
                block: "imcms-controls",
                elements: {"control": "imcms-control"}
            });

            var controlsElements = [
                controlsBuilder.move(subfolder),
                controlsBuilder.remove(subfolder),
                controlsBuilder.rename(subfolder),
                controlsBuilder.create(subfolder, level)
            ];

            return controlsBEM.buildBlock("<div>", controlsElements, {}, "control");
        }

        function openSubFolders() {
            var $button = $(this);
            var $subFolders = $button.toggleClass(OPENED_FOLDER_BTN_CLASS)
                .parent() // fixme: bad idea!
                .parent()
                .children("." + SUBFOLDER_CLASS);

            var isOpen = $button.hasClass(OPENED_FOLDER_BTN_CLASS);

            if ($subFolders.length) {
                $subFolders.css("display", isOpen ? "block" : "none");
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

        function buildFolder(subfolder, level) {
            var folderBEM = new BEM({
                block: "imcms-folder",
                elements: {
                    "btn": "",
                    "name": "imcms-title",
                    "controls": "imcms-controls"
                }
            });

            var $controls = buildControls(subfolder, level);
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
            var blockElements = [{"folder": buildFolder(subfolder, level)}];

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
                return subfolder.$folder = buildSubFolder(subfolder, level);
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
            viewModel.root = folders[0];
            buildImages(viewModel.root);
            viewModel.$folder.push(buildRootFolder(viewModel.root));

            var $subfolders = buildSubFolders(viewModel.root, ROOT_FOLDER_LEVEL + 1).map(function ($subfolder) {
                return rootFolderBEM.makeBlockElement("folders", $subfolder);
            });

            viewModel.$folder = viewModel.$folder.concat($subfolders);

            $foldersContainer.append(viewModel.$folder);
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
