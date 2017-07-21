/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(
    [
        "imcms-flags", "imcms-date-picker", "imcms-time-picker", "imcms-select", "imcms-numberbox", "imcms-keyword",
        "imcms-tests", "jquery"
    ],
    function (imcmsFlags, imcmsDatePicker, imcmsTimePicker, imcmsSelect, imcmsNumberbox, imcmsKeyword, tests, $) {
        console.info("%c Tests loaded.", "color: green");
        Imcms.tests = tests;

        imcmsFlags.init();
        imcmsDatePicker.init();
        imcmsTimePicker.init();
        imcmsSelect.init();
        imcmsNumberbox.init();
        imcmsKeyword.init();

        console.timeEnd("imCMS JS loaded");
    }
);
