/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder", ["imcms-bem-builder", "jquery"], function (BEM, $) {
    var $editor;

    function buildEditor() {
        var imageEditorBEM = new BEM({
            block: "imcms-image_editor",
            elements: {
                "head": "imcms-head",
                "image-characteristics": "",
                "left-side": "",
                "right-side": ""
            }
        });

        return $("<div>");
    }

    return {
        build: function () {
            if (!$editor) {
                $editor = buildEditor().prependTo("body");
            }

            $editor.css("display", "block");
        }
    };
});
