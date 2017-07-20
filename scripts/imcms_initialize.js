Imcms.define(
    "imcms-start",
    ["imcms", "imcms-buttons", "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword", "imcms-folders"],
    function (imcms, imcmsButtons, imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword, imcmsFolders) {
        return {
            init: function () {
                imcmsButtons.init();
                imcmsDatePicker.init();
                imcmsTimePicker.init();
                imcmsSelect.init();
                imcmsNumberbox.init();
                imcmsKeyword.init();
                imcmsFolders.init();

                imcms.AdminPanel.init();
                imcms.ChooseImg.init();
                imcms.ContentManager.init();
                imcms.ImageEditor.init();
                imcms.MenuEditor.init();
            }
        };
    }
);
