Imcms.define(
    "imcms-start",
    ["imcms", "imcms-buttons", "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword", "imcms-folders", "imcms-admin-panel"],
    function (imcms, imcmsButtons, imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword, imcmsFolders, imcmsAdminPanel) {
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

                imcms.ChooseImg.init();
                imcms.ContentManager.init();
                imcms.ImageEditor.init();
                imcms.MenuEditor.init();
            }
        };
    }
);
