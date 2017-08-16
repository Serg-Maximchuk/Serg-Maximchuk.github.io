/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.define("imcms-image-content-loader",
    ["imcms-folders-rest-api", "imcms-folders-tree-parser", "imcms-folders"],
    function (foldersREST, foldersTreeParser, imcmsFolders) {
        var $foldersContainer, $imagesContainer;

        function loadFoldersContent(foldersArr) {
            var foldersTree = foldersTreeParser.parseFoldersTree(foldersArr);
            var $folders = imcmsFolders.buildFolders(foldersTree);
            $foldersContainer.append($folders);

            // todo: implement images load!!!!1!
        }

        return {
            loadContent: function (options) {
                $foldersContainer = options.foldersContainer;
                $imagesContainer = options.imagesContainer;

                foldersREST.read("/", loadFoldersContent);
            }
        };
    }
);
