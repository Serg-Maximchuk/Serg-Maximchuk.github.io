Imcms.define(
    "imcms-start",
    ["imcms", "imcms-buttons", "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword"],
    function (imcms, imcmsButtons, imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword) {
        return {
            init: function () {
                imcmsButtons.init();
                imcmsDatePicker.init();
                imcmsTimePicker.init();
                imcmsSelect.init();
                imcmsNumberbox.init();
                imcmsKeyword.init();

                imcms.AdminPanel.init();
                imcms.Folders.init();
                imcms.ChooseImg.init();
                imcms.ContentManager.init();
                imcms.ImageEditor.init();
                imcms.MenuEditor.init();
            }
        };
    }
);
