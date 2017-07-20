Imcms.define("imcms-folders", ["imcms-rest", "imcms-modal-window", "jquery"], function (imcmsRest, imcmsModalWindow, $) {
    var viewModel;

    /*response from server*/
    function getFoldersUrl() {
        return imcmsRest.read();
    }

    /*create foldersObject function*/
    function findFoldersRootUrl(urlsArray) {
        var length = urlsArray[0].length, index = 0;
        urlsArray.forEach(function (url) {
            if (url.length < length) {
                length = url.length;
                index = urlsArray.indexOf(url)
            }
        });

        return urlsArray[index];
    }

    function getRelativeFoldersUrl(foldersUrlArray, root) {
        var relativeFoldersUrlArray = [];

        foldersUrlArray.forEach(function (url) {
            relativeFoldersUrlArray.push(url.substring(root.length));
        });

        relativeFoldersUrlArray.forEach(function (relativeUrl) {
            if (relativeUrl.length === 0) {
                relativeFoldersUrlArray.splice(relativeFoldersUrlArray.indexOf(relativeUrl), 1);
            }
        });

        return relativeFoldersUrlArray;
    }

    function parseFoldersUrl() {
        var foldersUrlArray = getFoldersUrl(),
            root = findFoldersRootUrl(foldersUrlArray)
        ;

        return getRelativeFoldersUrl(foldersUrlArray, root).map(function (relUrl) {
            relUrl = relUrl.split("/");
            relUrl.splice(0, 1);
            return relUrl;
        });
    }

    function getFoldersObject() {
        return parseFoldersUrl().map(function (url) {
            return {
                name: url[url.length - 1],
                parent: url.slice(0, url.length - 1).join("/"),
                path: url.join("/"),
                level: url.length,
                subfolder: []
            }
        }).sort(function (a, b) {
            return b.level - a.level;
        });
    }

    function getFolders() {
        var foldersArray = getFoldersObject(),
            pathToFolder = {}
        ;

        foldersArray.forEach(function (folder) {
            if (pathToFolder[folder.parent]) {
                pathToFolder[folder.parent].push(folder);
            } else {
                pathToFolder[folder.parent] = [folder];
            }

            if (pathToFolder[folder.path]) {
                folder.subfolder = pathToFolder[folder.path];
                delete pathToFolder[folder.path];
            }
        });

        return pathToFolder[""];
    }

    /*builderFolder functions*/
    function createFolderWrap(level) {
        return $("<div>", {
            "class": (level === 1) ? "imcms-left-side__folders imcms-folders" : "imcms-folders",
            "data-folders-lvl": level
        });
    }

    function createControl(controls) {
        viewModel.controls.forEach(function (control) {
            $("<div>", {
                "class": "imcms-controls__control imcms-control imcms-control--" + control.name,
                click: control.click
            }).prependTo(controls);
        });

        return controls;
    }

    function createControls() {
        var controls = $("<div>", {
            "class": "imcms-folder__controls"
        });

        return createControl(controls);
    }

    function createFolderName(name) {
        return $("<div>", {
            "class": "imcms-folder__name imcms-title",
            text: name,
            click: active
        });
    }

    function createShowHideBtn(isSubfolder) {
        if (isSubfolder.length !== 0) {
            return $("<div>", {
                "class": "imcms-folder__btn",
                click: showHideSubfolders
            });
        }
    }

    function createFolder(folder) {
        var newFolder;

        newFolder = $("<div>", {
            "class": "imcms-folders__folder imcms-folder",
            "data-folder-path": folder.path
        }).prepend(createControls());
        newFolder.prepend(createFolderName(folder.name));
        if (folder.subfolder.length !== 0) {
            newFolder.prepend(createShowHideBtn(folder.subfolder));
        }

        return newFolder;
    }

    function buildSubfolder(subfolders, wrap) {
        subfolders.forEach(function (subfolder) {
            wrap.prepend(buildFolderWrap(subfolder));
        })
    }

    function buildFolder(folder, wrap) {
        if (folder.subfolder.length !== 0) {
            return createFolder(folder).prepend(buildSubfolder(folder.subfolder, wrap))
        } else {
            return createFolder(folder);
        }
    }

    function buildFolderWrap(folder) {
        var wrap = createFolderWrap(folder.level);
        return wrap.prepend(buildFolder(folder, wrap));
    }

    function folderBuilder(folders) {
        folders.forEach(function (folder) {
            $(document).find(".imcms-content-manager__left-side").append(buildFolderWrap(folder));
        })
    }

    /*find and delete element in viewModel.folders array */
    function findAndDeleteFolderInArray(elementPath, arrayOfFolders) {

        arrayOfFolders.forEach(function (folder) {
            if (folder.path === elementPath) {
                arrayOfFolders.splice(arrayOfFolders.indexOf(folder), 1);
            }
            if (folder.subfolder.length !== 0) {
                findAndDeleteFolderInArray(elementPath, folder.subfolder);
            }
        });
    }

    /*action function (remove, rename, move, create)*/
    function removeFolderFromServer(folderId) {
        var urlsArray = getFoldersUrl(),
            folderFullPath = findFoldersRootUrl(urlsArray) + "/" + folderId
        ;

        findAndDeleteFolderInArray(folderId, viewModel.folders);
        imcmsRest.remove(folderFullPath);
    }

    function renameFolderOnServer(folder) {
        var folderPathArray = folder.attr("data-folder-path").split("/"),
            newFolderRelativePath,
            urlsArray = getFoldersUrl(),
            folderFullPath = findFoldersRootUrl(urlsArray)
        ;

        folderPathArray[folderPathArray.length - 1] = folder.find(".imcms-folder__name").text();
        newFolderRelativePath = folderPathArray.join("/");
        folderFullPath = folderFullPath + "/" + newFolderRelativePath;
        folder.attr("data-folder-path", newFolderRelativePath);

        imcmsRest.update(folderFullPath);
    }

    function createFolderOnServer(folder) {
        var urlsArray = getFoldersUrl(),
            folderFullPath = findFoldersRootUrl(urlsArray) + "/" + folder.path
        ;

        imcmsRest.create(folderFullPath);
    }

    function active() {
        $(this).parents(".imcms-content-manager__left-side")
            .find(".imcms-folder")
            .each(function () {
                $(this).removeClass("imcms-folder--active");
            });

        $(this).parents(".imcms-folder").addClass("imcms-folder--active");
    }

    function showHideSubfolders() {
        var $btn = $(this),
            level = $btn.parents(".imcms-folders").attr("data-folders-lvl")
        ;

        level = parseInt(level) + 1;
        $btn.parents(".imcms-folders")
            .find(".imcms-folders[data-folders-lvl=" + level + "]")
            .each(function () {
                $(this).slideToggle()
            });
        $btn.toggleClass("imcms-folder-btn--open");
    }

    function createNameInputPanel(folder) {
        var panel = $("<div>", {"class": "imcms-panel-named"}),
            nameInput = $("<input>", {
                "class": "imcms-panel-named__input imcms-text-box__input imcms-input",
                "value": folder.find(".imcms-folder__name").text()
            }),
            submitBtn = $("<button>", {
                "class": "imcms-panel-named__button imcms-button--neutral imcms-button",
                text: "add+"
            });

        return panel.append(nameInput).append(submitBtn);
    }

    function folderNameValidation(path) {
        var foldersUrlArray = getFoldersUrl(),
            root = findFoldersRootUrl(foldersUrlArray),
            urlsArray = getRelativeFoldersUrl(foldersUrlArray, root),
            response = true
        ;

        urlsArray.forEach(function (url) {
            if (url === path) {
                response = false;
            }
        });

        return response;
    }

    function submitRename() {
        var $btn = $(this),
            panel = $btn.closest(".imcms-panel-named"),
            currentFolder = panel.prev(),
            currentFolderName = currentFolder.find(".imcms-folder__name"),
            newName = panel.find("input").val(),
            path
        ;

        path = currentFolder.attr("data-folder-path").split("/");
        path[path.length - 1] = newName;
        path = "/" + path.join("/");

        imcmsModalWindow.showModalWindow("Do you want to rename folder \""
            + currentFolderName.text()
            + "\" to \""
            + newName
            + "\"?", function (answer) {
            if (answer) {
                if (folderNameValidation(path)) {
                    currentFolderName.text(newName);
                    panel.remove();
                } else {
                    panel.find("input").css({"border-color": "red"});
                }
            } else {
                panel.remove();
            }
        });

        currentFolder.find(".imcms-control--rename").click(renameFolder);

        renameFolderOnServer(currentFolder);
    }

    function submitCreate() {
        var $btn = $(this),
            panel = $btn.closest(".imcms-panel-named"),
            currentFolder = panel.prev(),
            newName = panel.find("input").val(),
            isParentFolder = currentFolder.parent().hasClass("imcms-folders"),
            newFolder = {
                level: isParentFolder ? parseInt(currentFolder.parent().attr("data-folders-lvl")) + 1 : 1,
                name: newName,
                parent: isParentFolder ? currentFolder.attr("data-folder-path") : "",
                path: isParentFolder ? currentFolder.attr("data-folder-path") + "/" + newName : newName,
                subfolder: []
            }
        ;

        console.log(isParentFolder);

        var path = "/" + newFolder.path;

        if (folderNameValidation(path)) {
            var $folderButton = currentFolder.find(".imcms-folder__btn");

            if ($folderButton.length === 0) {
                currentFolder.prepend($("<div>", {
                    "class": "imcms-folder__btn imcms-folder-btn--open",
                    click: showHideSubfolders
                }));
            }

            var newFolderClass = ($folderButton.hasClass("imcms-folder-btn--open"))
                ? ""
                : "imcms-subfolders--close";

            var $newFolder = createFolderWrap(newFolder.level)
                .addClass(newFolderClass)
                .append(createFolder(newFolder));

            currentFolder.after($newFolder);
            panel.remove();

        } else {
            panel.find("input").css({"border-color": "red"});
        }

        currentFolder.find(".imcms-control--create").click(createNewLowLevelFolder);
        createFolderOnServer(newFolder);
    }

    function renameFolder() {
        var currentFolder = $(this).closest(".imcms-folder"),
            panel = createNameInputPanel(currentFolder)
        ;

        panel.css({
            "position": "absolute",
            "top": 0,
            "left": 0
        });

        panel.find("button").click(submitRename);
        currentFolder.after(panel);
        currentFolder.find(".imcms-control--rename").unbind("click");
    }

    function removeFolder() {
        var $ctrl = $(this),
            currentFolder = $ctrl.closest(".imcms-folder"),
            currentFolderName = currentFolder.find(".imcms-folder__name").text(),
            subFolders = currentFolder.parent().find(".imcms-folders"),
            parentFolder = currentFolder.closest(".imcms-folders"),
            currentFolderWrap = parentFolder.parent(),
            currentFolderId = currentFolder.attr("data-folder-path")
        ;

        imcmsModalWindow.showModalWindow("Do you want to remove folder \""
            + currentFolderName
            + "\"?", function (answer) {
            if (answer) {
                subFolders.remove();
                currentFolder.remove();
                parentFolder.remove();

                if (currentFolderWrap.children().length === 1) {
                    currentFolderWrap.find(".imcms-folder__btn").remove();
                }

                removeFolderFromServer(currentFolderId);
            }
        });
    }

    function moveFolder() {
        console.log("Move folder not implemented yet.");
    }

    function createNewLowLevelFolder() {
        var $currentFolder = $(this).closest(".imcms-folder");
        createNewFolder($currentFolder);
    }

    function createNewFirstLevelFolder() {
        var $currentFolder = $(this).closest(".imcms-main-folders-controls");
        createNewFolder($currentFolder);
    }

    function createNewFolder($currentFolder) {
        var panel = createNameInputPanel($currentFolder);

        panel.css({
            "position": "relative"
        });

        panel.find("button").click(submitCreate);
        $currentFolder.after(panel);
        $currentFolder.find(".imcms-control--create").unbind("click");
    }

    return {
        init: function () {
            viewModel = {
                foldersArea: $(document).find(".imcms-content-manager__left-side"),
                folders: getFolders(),
                controls: [
                    {
                        name: "create",
                        click: createNewLowLevelFolder
                    },
                    {
                        name: "rename",
                        click: renameFolder
                    },
                    {
                        name: "remove",
                        click: removeFolder
                    },
                    {
                        name: "move",
                        click: moveFolder
                    }
                ]
            };

            folderBuilder(viewModel.folders);

            $(function () {
                $(".imcms-main-folders-controls .imcms-control--create").click(createNewFirstLevelFolder);
                $(".imcms-content-manager__left-side").find(".imcms-folders")
                    .each(function () {
                        if ($(this).attr("data-folders-lvl") !== "1") {
                            $(this).addClass("imcms-subfolders--close");
                        }
                    });
            });
        }
    };
});
