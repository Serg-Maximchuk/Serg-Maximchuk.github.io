Imcms.define("init",
    ["imcms", "imcms-buttons", "imcms-date-picker", "imcms-time-picker"],
    function (imcms, imcmsButtons, imcmsDatePicker, imcmsTimePicker) {
        imcmsButtons.init();
        imcmsDatePicker.init();
        imcmsTimePicker.init();

        imcms.Select.init();
        imcms.NumberBox.init();
        // imcms.Button.init();
        // imcms.DatePicker.init();
        // imcms.TimePicker.init();
        imcms.Keyword.init();
        imcms.AdminPanel.init();
        imcms.Folders.init();
        imcms.ChooseImg.init();
        imcms.ContentManager.init();
        imcms.ImageEditor.init();
        imcms.MenuEditor.init();

        return true;
    });
