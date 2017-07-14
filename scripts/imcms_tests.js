/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 14.07.17.
 */
Imcms.define("imcms-tests", ["imcms", "jquery"], function (imcms, $) {
    return imcms.Tests = {
        checkModules: function () {
            var isThereMoreThanOneModule = Object.keys(imcms.modules).length > 1;
            console.assert(isThereMoreThanOneModule, "There should be more modules than only one!");
            return isThereMoreThanOneModule;
        },
        checkJqueryModuleExist: function () {
            var jqueryModuleVersion = $.fn.jquery;
            console.assert(jqueryModuleVersion, "There should be jquery module!");
            return jqueryModuleVersion;
        },
        checkAnonymousDependentModuleDefinition: function () {
            var isLoadedFlag = false;

            imcms.define(["imcms"], function (imcms2) {
                isLoadedFlag = true;
                console.assert(imcms === imcms2, "Anonymous dependent module definition works wrong!");
            });

            setTimeout(function () {
                console.assert(isLoadedFlag, "Anonymous dependent module definition not working!");
            }, 500);

            return true;
        },
        checkAnonymousIndependentModuleDefinition: function () {
            var isLoadedFlag = false;

            imcms.define(function (imcms2) {
                isLoadedFlag = true;
                console.assert(imcms === imcms2, "Anonymous independent module definition works wrong!");
            });

            setTimeout(function () {
                console.assert(isLoadedFlag, "Anonymous independent module definition not working!");
            }, 500);

            return true;
        }
    }
});
