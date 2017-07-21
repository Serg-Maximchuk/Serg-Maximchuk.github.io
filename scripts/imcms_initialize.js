Imcms.define("imcms-initialize",
    [
        "imcms-buttons", "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword",
        "imcms-folders", "imcms-admin-panel", "imcms-choose-image", "imcms-content-manager", "imcms-image-editor",
        "imcms-menu-editor"
    ],
    function (imcmsButtons, imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword,
              imcmsFolders, imcmsAdminPanel, imcmsChooseImg, imcmsContentManager, imcmsImageEditor, imcmsMenuEditor) {
        return {
            init: function () {
                imcmsButtons.init();
                imcmsDatePicker.init();
                imcmsTimePicker.init();
                imcmsSelect.init();
                imcmsNumberbox.init();
                imcmsKeyword.init();
                imcmsFolders.init();
                imcmsAdminPanel.init();
                imcmsChooseImg.init();
                imcmsContentManager.init();
                imcmsImageEditor.init();
                imcmsMenuEditor.init();
            }
        };
    }
);
