/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 14.08.17.
 */
Imcms.define("imcms-document-editor-builder", ["imcms-bem-builder"], function (BEM) {
    function buildBodyHead() {
        var bodyHeadBEM = new BEM({
            block: "imcms-document-editor-head",
            elements: {
                "tools": "imcms-document-editor-head-tools imcms-grid-section"
            }
        });
    }

    return {
        buildBody: function () {
            var $head = buildBodyHead();

        },
        build: function () {
            var $body = this.buildBody();
        }
    };
});
