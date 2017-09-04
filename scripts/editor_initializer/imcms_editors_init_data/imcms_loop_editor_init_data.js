/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-loop-editor-init-data", ["imcms-editors-builder"], function (editorsBuilder) {
    return {
        EDIT_AREA_SELECTOR: ".imcms-editor-area--loop",
        CONTROL_SELECTOR: ".imcms-control--loop",
        getEditorData: function ($dataContainer) {
            var docId = $dataContainer.data("docId");
            var loopId = $dataContainer.data("loopId");

            return {
                docId: docId,
                loopId: loopId
            };
        },
        getEditorBuildStrategy: function () {
            return function (editorData) {
                editorsBuilder.buildLoopEditor(editorData);
            }
        }
    }
});
