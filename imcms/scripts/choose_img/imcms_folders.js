(function (Imcms) {
    var viewModel;

    /*response from server*/

    function getFoldersUrl() {
        return [
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018/flowers",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018/flowers/XxX",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018/flowers/XxX/(Y)",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars/bmw",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/holiday",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/holiday",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family/porno",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/img"
        ];
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
            root = findFoldersRootUrl(foldersUrlArray),
            foldersRelativeUrlsArray = []
        ;

        foldersRelativeUrlsArray = getRelativeFoldersUrl(foldersUrlArray, root);

        return foldersRelativeUrlsArray.map(function (relUrl) {
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
            /*if (!folder.parent) {
             return;
             }*/

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

        // var recurs = function () {
        //     foldersArray.forEach(function (folder) {
        //         foldersArray.forEach(function (parent) {
        //             if (folder.parent === parent.path) {
        //                 parent.subfolder.push(folder);
        //                 foldersArray.splice(foldersArray.indexOf(folder), 1);
        //                 recurs();
        //             }
        //         });
        //     });
        //
        // };
        //
        // recurs();

        return pathToFolder;
    }

    /*builderFolder functions*/

    function createFolderWrap(folder) {

        return $("<div>", {
            "class": "imcms-folders",
            "data-folders-lvl": folder.level
        })
    }

    function createControl() {
        var controls = createControls();

        viewModel.controls.forEach(function (control) {
            $("<div>", {
                "class": "imcms-controls__control imcms-control imcms-control--" + control.name,
                click: control.click
            }).prependTo(controls);
        });

        return controls;
    }

    function createControls() {

        return $("<div>", {
            "class": "imcms-folder__controls"
        });
    }

    function createFolderName(name) {

        return $("<div>", {
            "class": "imcms-folder__name imcms-title",
            text: name
        });
    }

    function createShowHideBtn(isSubfolder) {
        if (isSubfolder.length !== 0) {

            return $("<div>", {
                "class": "imcms-folder__btn",
                click: Imcms.Folders.showHideSubfolders
            });
        }
    }

    function createFolder(folder) {

        return $("<div>", {"class": "imcms-folders__folder imcms-folder"})
            .prepend(createControl())
            .prepend(createFolderName(folder.name))
            .prepend(createShowHideBtn(folder.subfolder));
    }


    function findMainFolderInObject(folders) {
        var rootFolders = folders[""];

        rootFolders.forEach(function (folder) {
            viewModel.foldersArea.append(createFolderWrap(folder).append(createFolder(folder)));
            console.log(folder);
        });
    }


    function folderBuilder(folders) {
        findMainFolderInObject(folders);
    }

    Imcms.Folders = {
        init: function () {

            viewModel = {
                foldersArea: $(document).find(".imcms-content-manager__left-side"),
                folders: getFolders(),
                controls: [
                    {
                        name: "create",
                        click: Imcms.Folders.createNewFolder
                    },
                    {
                        name: "rename",
                        click: Imcms.Folders.renameFolder
                    },
                    {
                        name: "remove",
                        click: Imcms.Folders.removeFolder
                    },
                    {
                        name: "move",
                        click: Imcms.Folders.moveFolder
                    }
                ]
            };

            folderBuilder(viewModel.folders);
        },
        showHideSubfolders: function () {
            var $btn = $(this);

            $btn.parents(".imcms-folder").next().slideToggle();
            $btn.toggleClass("imcms-folder-btn--open");
        },
        createNewFolder: function () {

        },
        renameFolder: function () {

        },
        removeFolder: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                subFolder = currentFolder.next(),
                parentFolder = currentFolder.closest(".imcms-folders")
            ;


            if (subFolder.hasClass("imcms-folders")) {
                subFolder.remove();
            }
            currentFolder.remove();

            if (parentFolder.children().length === 0) {
                if (parentFolder.prev().hasClass("imcms-folder")) {
                    parentFolder.prev().find(".imcms-folder__btn").remove();
                }
                parentFolder.remove();
            }
        },
        moveFolder: function () {

        }

    };

    return Imcms.Folders;
})(Imcms);