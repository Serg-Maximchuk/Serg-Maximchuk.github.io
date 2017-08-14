/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 10.08.17.
 */
Imcms.require(["imcms-editors-builder", "imcms-tests"], function (builder, tests) {
    builder.buildMenuEditor();

    console.info("%c Tests loaded.", "color: green");
    Imcms.tests = tests;
    console.timeEnd("imCMS JS loaded");
});
