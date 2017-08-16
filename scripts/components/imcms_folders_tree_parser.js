/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-folders-tree-parser", [], function () {
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

    function parseFoldersUrl(foldersUrlArray) {
        var root = findFoldersRootUrl(foldersUrlArray);

        return getRelativeFoldersUrl(foldersUrlArray, root).map(function (relUrl) {
            relUrl = relUrl.split("/");
            relUrl.splice(0, 1);
            return relUrl;
        });
    }

    function getFoldersObject(foldersArr) {
        return parseFoldersUrl(foldersArr).map(function (url) {
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

    return {
        parseFoldersTree: function (foldersArr) {
            var foldersObjArray = getFoldersObject(foldersArr),
                pathToFolder = {}
            ;

            foldersObjArray.forEach(function (folder) {
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
    }
});
