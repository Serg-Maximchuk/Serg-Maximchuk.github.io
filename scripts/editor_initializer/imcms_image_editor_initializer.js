/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-image-editor-initializer", ["imcms-editors-builder", "jquery"], function (editorsBuilder, $) {
    function openEditor() {
        var imageId = $(this).parents(".imcms-editor-area--image")
            .find(".imcms-editor-content")
            .data("imageId");

        editorsBuilder.buildImageEditor(imageId);
    }

    return {
        initEditor: function () {
            $(".imcms-editor-area--image").find(".imcms-control--image").click(openEditor);
        }
    }
});
