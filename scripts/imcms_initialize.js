Imcms.define("init", ["imcms", "imcms-buttons", "imcms-date-picker"], function (imcms, imcmsButtons, imcmsDatePicker) {
    imcmsButtons.init();
    imcmsDatePicker.init();

    imcms.Select.init();
    imcms.NumberBox.init();
    // imcms.Button.init();
    // imcms.DatePicker.init();
    imcms.TimePicker.init();
    imcms.Keyword.init();
    imcms.AdminPanel.init();
    imcms.Folders.init();
    imcms.ChooseImg.init();
    imcms.ContentManager.init();
    imcms.ImageEditor.init();
    imcms.MenuEditor.init();

    return true;
});
