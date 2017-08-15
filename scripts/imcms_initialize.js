Imcms.define("imcms-initialize",
    [
        "imcms-flags", "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword",
        "imcms-folders", "imcms-choose-image", "imcms-content-manager", "imcms-image-editor"
    ],
    function (imcmsFlags, imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword,
              imcmsFolders, imcmsChooseImg, imcmsContentManager, imcmsImageEditor) {
        return {
            init: function () {
                imcmsFlags.init();
                imcmsDatePicker.init();
                imcmsTimePicker.init();
                imcmsSelect.init();
                imcmsNumberbox.init();
                imcmsKeyword.init();
                imcmsFolders.init();
                imcmsChooseImg.init();
                imcmsContentManager.init();
                imcmsImageEditor.init();
            }
        };
    }
);
