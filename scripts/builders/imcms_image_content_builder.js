/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-image-content-builder",
    [
        "imcms-files-rest-api", "imcms-bem-builder", "imcms-components-builder", "imcms-primitives-builder",
        "imcms-controls-builder", "imcms-modal-window-builder", "jquery"
    ],
    function (fileREST, BEM, components, primitives, controlsBuilder, modalWindow, $) {
        var OPENED_FOLDER_BTN_CLASS = "imcms-folder-btn--open";
        var SUBFOLDER_CLASS = "imcms-folders__subfolder";
        var ACTIVE_FOLDER_CLASS = "imcms-folder--active";
        var FOLDER_CREATION_BLOCK_ID = "imcms-folder-create-block";
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

        function onFolderRenamed(response) {
            var newName = this.$block.find(".imcms-panel-named__input").val();

            console.log("Renaming folder " + newName);
            console.log(response);

            this.$block.prev()
                .find(".imcms-folder__name")
                .text(newName);

            this.$block.detach();
        }

        function onFolderCreated(response) {
            console.log("Created folder: ");
            console.log(response);
            response.$images = [];
            response.$folder = buildSubFolder(response, this.parentLevel + 1)
                .addClass(SUBFOLDER_CLASS)
                .css("display", "block")
            ;

            this.$block.replaceWith(response.$folder);

            var $parent = response.$folder.prev();
            if ($parent.hasClass("imcms-folder") && !$parent.children(".imcms-folder__btn").length) {
                $("<div>", {
                        "class": "imcms-folder__btn imcms-folder-btn--open",
                        click: openSubFolders
                    }
                ).prependTo($parent);
            }
        }

        var folderControlsBuilder = {
            move: function (folder) {
                return controlsBuilder.move(moveFolder.bind(folder));
            },
            remove: function (folder) {
                return controlsBuilder.remove(removeFolder.bind(folder));
            },
            edit: function (folder, level) {
                return controlsBuilder.edit(setRenameFolder(folder, level));
            },
            create: function (folder, level) {
                return controlsBuilder.create(setCreateFolder(folder, level));
            }
        };

        function buildRootControls(rootFile) {
            var rootFolderControlsBEM = new BEM({
                block: "imcms-main-folders-controls",
                elements: {
                    "name": "imcms-title",
                    "control": "imcms-control"
                }
            });

            var $rootFolderTitle = rootFolderControlsBEM.buildElement("name", "<div>", {
                text: rootFile.name,
                click: onFolderClick.bindArgs(rootFile)
            });
            var $createFolderControl = folderControlsBuilder.create(rootFile, ROOT_FOLDER_LEVEL);

            return rootFolderControlsBEM.buildBlock("<div>", [
                {"name": $rootFolderTitle},
                {"control": $createFolderControl}
            ]);
        }

        function buildRootFolder(rootFile) {
            rootFile.$folder = $foldersContainer;
            var $rootControls = buildRootControls(rootFile);

            return rootFolderBEM.makeBlockElement("controls", $rootControls);
        }

        function moveFolder() {
            // todo: implement or delete it's control icon at all
        }

        function removeFolder() { // this == folder
            modalWindow.buildModalWindow("Do you want to remove folder \"" + this.name + "\"?", function (answer) {
                if (answer) {
                    fileREST.remove(this.path + this.name)
                        .done(this.$folder.detach.bind(this.$folder));
                }
            }.bind(this));
        }

        function buildFolderRenamingBlock(folder, level) {
            var currentFolderName = folder.$folder.children(".imcms-folders__folder")
                .find(".imcms-folder__name")
                .text();

            return buildFolderManageBlock({
                    folder: folder,
                    level: level,
                    name: currentFolderName
                },
                fileREST.update,
                onFolderRenamed
            ).css({
                position: "absolute",
                top: "0px",
                left: "0px"
            });
        }

        function setRenameFolder(folder, level) {
            return function renameFolder() {
                var $folderRenamingBlock = buildFolderRenamingBlock(folder, level);
                folder.$folder.children(".imcms-folders__folder").after($folderRenamingBlock);
            };
        }

        function setCreateFolder(folder, level) {
            return function createFolder() {
                showFolderCreationBlock(folder, level);

                var $openFolderBtn = $(this).parent()
                    .parent()
                    .children(".imcms-folder__btn");

                if ($openFolderBtn.hasClass("imcms-folder-btn--open")) {
                    return;
                }

                openSubFolders.call($openFolderBtn[0]);
            }
        }

        function buildFolderManageBlock(opts, onConfirm, onSuccess) {
            $("#" + FOLDER_CREATION_BLOCK_ID).detach();

            var folderCreationBEM = new BEM({
                block: "imcms-panel-named",
                elements: {
                    "input": "imcms-input",
                    "button": "imcms-button"
                }
            });

            var $folderNameInput = primitives.imcmsInput({
                value: opts.name,
                placeholder: "New folder name"
            });
            var $confirmBtn = components.buttons.neutralButton({
                text: "add+",
                click: function () {
                    var folderName = $folderNameInput.val();

                    if (!folderName) {
                        return;
                    }

                    onConfirm({
                        path: opts.folder.path,
                        name: folderName
                    })
                        .done(onSuccess.bind({
                            parentLevel: opts.level,
                            $block: $folderCreationBlock
                        }));
                }
            });

            var $folderCreationBlock = folderCreationBEM.buildBlock("<div>", [
                {"input": $folderNameInput},
                {"button": $confirmBtn}
            ], {id: FOLDER_CREATION_BLOCK_ID});

            return $folderCreationBlock;
        }

        function buildFolderCreationBlock(parentFolder, level) {
            return buildFolderManageBlock({
                folder: parentFolder,
                level: level,
                name: ""
            }, fileREST.create, onFolderCreated);
        }

        function showFolderCreationBlock(parentFolder, level) {
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
                folderControlsBuilder.move(subfolder),
                folderControlsBuilder.remove(subfolder),
                folderControlsBuilder.edit(subfolder, level),
                folderControlsBuilder.create(subfolder, level)
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
            fileREST.remove(imageFile.path)
                .done(function () {
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

                fileREST.read("/images")
                    .done(loadImageFoldersContent);
            }
        };
    }
);
