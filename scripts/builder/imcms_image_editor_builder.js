/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder", ["jquery"], function ($) {
    var $editor;

    function buildEditor() {
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
