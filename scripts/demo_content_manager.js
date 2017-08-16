/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 16.08.17.
 */
Imcms.require(
    [
        "imcms-editors-builder", "imcms-folders", "imcms-choose-image", "imcms-content-manager"
    ],
    function (editors, imcmsFolders, imcmsChooseImg, imcmsContentManager) {
        // old JS
        imcmsFolders.init();
        imcmsChooseImg.init();
        imcmsContentManager.init();

        // new JS
        editors.buildContentManager();
    }
);
