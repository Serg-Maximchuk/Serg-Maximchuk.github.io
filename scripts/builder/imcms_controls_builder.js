/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 19.08.17.
 */
Imcms.define("imcms-controls-builder", ["imcms-bem-builder"], function (BEM) {
    var controlsBEM = new BEM({
        // no block here
        elements: {"control": "imcms-control"}
    });

    function buildControl(modifier, onClick) {
        return controlsBEM.buildElement("control", "<div>", {click: onClick}, [modifier]);
    }

    return {
        move: function (onClick) {
            return buildControl("move", onClick);
        },
        remove: function (onClick) {
            return buildControl("remove", onClick);
        },
        rename: function (onClick) {
            return buildControl("rename", onClick);
        },
        create: function (onClick) {
            return buildControl("create", onClick);
        }
    };
});
