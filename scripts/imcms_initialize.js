Imcms.define(
    "imcms-start",
    ["imcms", "imcms-buttons", "imcms-date-picker", "imcms-time-picker", "imcms-select"],
    function (imcms, imcmsButtons, imcmsDatePicker, imcmsTimePicker, imcmsSelect) {
        return {
            init: function () {
                imcmsButtons.init();
                imcmsDatePicker.init();
                imcmsTimePicker.init();
                imcmsSelect.init();

                imcms.NumberBox.init();
                imcms.Keyword.init();
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
