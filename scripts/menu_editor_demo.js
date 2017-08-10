/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 10.08.17.
 */
Imcms.require(["imcms-editors-builder", "imcms-initialize", "imcms-tests"], function (builder, imcms, tests) {
    builder.buildMenuEditor();

    console.info("%c Tests loaded.", "color: green");
    Imcms.tests = tests;
    imcms.init();
    console.timeEnd("imCMS JS loaded");
});
