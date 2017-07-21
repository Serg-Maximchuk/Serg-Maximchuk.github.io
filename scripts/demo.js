/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(["imcms-flags", "imcms-tests", "jquery"], function (imcmsFlags, tests, $) {
    console.info("%c Tests loaded.", "color: green");
    Imcms.tests = tests;
    imcmsFlags.init();
    console.timeEnd("imCMS JS loaded");
});
