/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-image-editor-init-data", ["imcms-editors-builder"], function (editorsBuilder) {
    return {
        EDIT_AREA_SELECTOR: ".imcms-editor-area--image",
        CONTROL_SELECTOR: ".imcms-control--image",
        getEditorData: function ($dataContainer) {
            return $dataContainer.data("imageId");
        },
        getEditorBuildStrategy: function () {
            return function (editorData) {
                editorsBuilder.buildImageEditor(editorData);
            }
        }
    }
});
