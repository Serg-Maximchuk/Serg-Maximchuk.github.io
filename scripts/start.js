/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(["imcms-initialize", "imcms-tests"], function (imcms, tests) {
    console.info("%c Tests loaded.", "color: green");
    Imcms.tests = tests;
    imcms.init();
    console.timeEnd("imCMS JS loaded");
});
