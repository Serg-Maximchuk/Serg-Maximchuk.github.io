/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder", ["imcms-bem-builder"], function (BEM) {
    var $editor;

    function buildEditor() {
        var editorBEM = new BEM({
            block: "imcms-loop-editor",
            elements: {
                "head": "imcms-head",
                "body": "imcms-loop-editor-body",
                "footer": "imcms-footer"
            }
        });

        return editorBEM.buildBlock("<div>", [], {"class": "imcms-editor-window"});
    }

    return {
        build: function () {
            if (!$editor) {
                $editor = buildEditor().appendTo("body");
            }

            $editor.css("display", "block");
        }
    }
});
