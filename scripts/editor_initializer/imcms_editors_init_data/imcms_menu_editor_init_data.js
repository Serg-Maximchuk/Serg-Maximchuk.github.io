/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-menu-editor-init-data", ["imcms-menu-editor-builder"], function (menuEditorBuilder) {
    return {
        EDIT_AREA_SELECTOR: ".imcms-editor-area--menu",
        CONTROL_SELECTOR: ".imcms-control--menu",
        getEditorData: function ($dataContainer) {
            var docId = $dataContainer.data("docId");
            var menuId = $dataContainer.data("menuId");

            return {
                docId: docId,
                menuId: menuId
            };
        },
        getEditorBuildStrategy: function () {
            return function (editorData) {
                menuEditorBuilder.build(editorData);
            }
        }
    }
});
