/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-folders-builder", ["imcms-folders-rest-api", "jquery"], function (foldersREST, $) {
    // function findFoldersRootUrl(urlsArray) {
    //     var length = urlsArray[0].length, index = 0;
    //     urlsArray.forEach(function (url) {
    //         if (url.length < length) {
    //             length = url.length;
    //             index = urlsArray.indexOf(url)
    //         }
    //     });
    //
    //     return urlsArray[index];
    // }
    //
    // function getRelativeFoldersUrl(foldersUrlArray, root) {
    //     var relativeFoldersUrlArray = [];
    //
    //     foldersUrlArray.forEach(function (url) {
    //         relativeFoldersUrlArray.push(url.substring(root.length));
    //     });
    //
    //     relativeFoldersUrlArray.forEach(function (relativeUrl) {
    //         if (relativeUrl.length === 0) {
    //             relativeFoldersUrlArray.splice(relativeFoldersUrlArray.indexOf(relativeUrl), 1);
    //         }
    //     });
    //
    //     return relativeFoldersUrlArray;
    // }
    //
    // function parseFoldersUrl(foldersUrlArray) {
    //     var root = findFoldersRootUrl(foldersUrlArray);
    //
    //     return getRelativeFoldersUrl(foldersUrlArray, root).map(function (relUrl) {
    //         relUrl = relUrl.split("/");
    //         relUrl.splice(0, 1);
    //         return relUrl;
    //     });
    // }
    //
    // function parseFoldersObjects(foldersArray) {
    //     return parseFoldersUrl(foldersArray).map(function (url) {
    //         return {
    //             name: url[url.length - 1],
    //             parent: url.slice(0, url.length - 1).join("/"),
    //             path: url.join("/"),
    //             level: url.length,
    //             subfolder: []
    //         }
    //     }).sort(function (a, b) {
    //         return b.level - a.level;
    //     });
    // }
    //
    // function parseFoldersTree(foldersArray) {
    //     var pathToFolder = {},
    //         foldersObjects = parseFoldersObjects(foldersArray)
    //     ;
    //
    //     foldersObjects.forEach(function (folder) {
    //         if (pathToFolder[folder.parent]) {
    //             pathToFolder[folder.parent].push(folder);
    //         } else {
    //             pathToFolder[folder.parent] = [folder];
    //         }
    //
    //         if (pathToFolder[folder.path]) {
    //             folder.subfolder = pathToFolder[folder.path];
    //             delete pathToFolder[folder.path];
    //         }
    //     });
    //
    //     return pathToFolder[""]; // root folder
    // }
    //
    // function createNameInputPanel(folder) {
    //     var panel = $("<div>", {"class": "imcms-panel-named"}),
    //         nameInput = $("<input>", {
    //             "class": "imcms-panel-named__input imcms-text-box__input imcms-input",
    //             "value": folder.find(".imcms-folder__name").text()
    //         }),
    //         submitBtn = $("<button>", {
    //             "class": "imcms-panel-named__button imcms-button--neutral imcms-button",
    //             text: "add+"
    //         });
    //
    //     return panel.append(nameInput).append(submitBtn);
    // }
    //
    // function folderNameValidation(path) {
    //     var foldersUrlArray = getFoldersUrl(),
    //         root = findFoldersRootUrl(foldersUrlArray),
    //         urlsArray = getRelativeFoldersUrl(foldersUrlArray, root),
    //         response = true
    //     ;
    //
    //     urlsArray.forEach(function (url) {
    //         if (url === path) {
    //             response = false;
    //         }
    //     });
    //
    //     return response;
    // }
    //
    // function submitCreate() {
    //     var $btn = $(this),
    //         panel = $btn.closest(".imcms-panel-named"),
    //         currentFolder = panel.prev(),
    //         newName = panel.find("input").val(),
    //         isParentFolder = currentFolder.parent().hasClass("imcms-folders"),
    //         newFolder = {
    //             level: isParentFolder ? parseInt(currentFolder.parent().attr("data-folders-lvl")) + 1 : 1,
    //             name: newName,
    //             parent: isParentFolder ? currentFolder.attr("data-folder-path") : "",
    //             path: isParentFolder ? currentFolder.attr("data-folder-path") + "/" + newName : newName,
    //             subfolder: []
    //         }
    //     ;
    //
    //     console.log(isParentFolder);
    //
    //     var path = "/" + newFolder.path;
    //
    //     if (folderNameValidation(path)) {
    //         var $folderButton = currentFolder.find(".imcms-folder__btn");
    //
    //         if ($folderButton.length === 0) {
    //             currentFolder.prepend($("<div>", {
    //                 "class": "imcms-folder__btn imcms-folder-btn--open",
    //                 click: showHideSubfolders
    //             }));
    //         }
    //
    //         var newFolderClass = ($folderButton.hasClass("imcms-folder-btn--open"))
    //             ? ""
    //             : "imcms-subfolders--close";
    //
    //         var $newFolder = createFolderWrap(newFolder.level)
    //             .addClass(newFolderClass)
    //             .append(createFolder(newFolder));
    //
    //         currentFolder.after($newFolder);
    //         panel.remove();
    //
    //     } else {
    //         panel.find("input").css({"border-color": "red"});
    //     }
    //
    //     currentFolder.find(".imcms-control--create").click(createNewLowLevelFolder);
    //     createFolderOnServer(newFolder);
    // }
    //
    // function createFolderOnServer(folder) {
    //     var urlsArray = getFoldersUrl(),
    //         folderFullPath = findFoldersRootUrl(urlsArray) + "/" + folder.path
    //     ;
    //
    //     imcmsRest.create(folderFullPath);
    // }
    //
    // function createNewFolder($currentFolder) {
    //     var panel = createNameInputPanel($currentFolder);
    //
    //     panel.css({
    //         "position": "relative"
    //     });
    //
    //     panel.find("button").click(submitCreate);
    //     $currentFolder.after(panel);
    //     $currentFolder.find(".imcms-control--create").unbind("click");
    // }
    //
    // function createNewLowLevelFolder() {
    //     var $currentFolder = $(this).closest(".imcms-folder");
    //     createNewFolder($currentFolder);
    // }
    //
    // var controls = [{
    //     name: "create",
    //     click: createNewLowLevelFolder
    // }, {
    //     name: "rename",
    //     click: renameFolder
    // }, {
    //     name: "remove",
    //     click: removeFolder
    // }, {
    //     name: "move",
    //     click: moveFolder
    // }];
    //
    // function createControl(controls) {
    //     controls.forEach(function (control) {
    //         $("<div>", {
    //             "class": "imcms-controls__control imcms-control imcms-control--" + control.name,
    //             click: control.click
    //         }).prependTo(controls);
    //     });
    //
    //     return controls;
    // }
    //
    // function createControls() {
    //     var controls = $("<div>", {
    //         "class": "imcms-folder__controls"
    //     });
    //
    //     return createControl(controls);
    // }
    //
    // function createFolder(folder) {
    //     var newFolder;
    //
    //     newFolder = $("<div>", {
    //         "class": "imcms-folders__folder imcms-folder",
    //         "data-folder-path": folder.path
    //     }).prepend(createControls());
    //     newFolder.prepend(createFolderName(folder.name));
    //     if (folder.subfolder.length !== 0) {
    //         newFolder.prepend(createShowHideBtn(folder.subfolder));
    //     }
    //
    //     return newFolder;
    // }
    //
    // function buildFolder(folder, wrap) {
    //     if (folder.subfolder.length !== 0) {
    //         return createFolder(folder).prepend(buildSubfolder(folder.subfolder, wrap))
    //     } else {
    //         return createFolder(folder);
    //     }
    // }
    //
    // function createFolderWrap(level) {
    //     return $("<div>", {
    //         "class": (level === 1) ? "imcms-left-side__folders imcms-folders" : "imcms-folders",
    //         "data-folders-lvl": level
    //     });
    // }
    //
    // function buildFolderWrap(folder) {
    //     var wrap = createFolderWrap(folder.level);
    //     return wrap.prepend(buildFolder(folder, wrap));
    // }
    //
    // function buildFoldersTree(foldersTree) {
    //     return foldersTree.map(buildFolderWrap);
    // }

    ////
    /////
    ////
    /////
    /////

    var foldersArray;

    // function buildFolders(folders) {
    //     foldersArray = folders;
    //     var foldersTree = parseFoldersTree(folders);
    //     return buildFoldersTree(foldersTree);
    // }

    return {
        loadAndBuildFolders: function (callback) {
            // foldersREST.read("/", function (folders) {
            //     var $foldersTree = buildFolders(folders);
            //     callback.call(null, $foldersTree);
            // });
        }
    };
});
