/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-image-editor-initializer", ["imcms-editors-builder", "jquery"], function (editorsBuilder, $) {
    var IMAGE_EDIT_AREA_CLASS = ".imcms-editor-area--image";

    function openEditor() {
        var imageId = $(this).parents(IMAGE_EDIT_AREA_CLASS).data("imageId");

        editorsBuilder.buildImageEditor(imageId);
    }

    return {
        initEditor: function () {
            $(IMAGE_EDIT_AREA_CLASS).find(".imcms-control--image").click(openEditor);
        }
    }
});
