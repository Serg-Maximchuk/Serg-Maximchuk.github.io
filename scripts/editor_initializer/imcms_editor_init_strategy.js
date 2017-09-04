/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-editor-init-strategy", ["jquery"], function ($) {
    return {
        initEditor: function (editorInitData) {
            var openEditor = function () {
                var $dataContainer = $(this).parents(editorInitData.EDIT_AREA_SELECTOR),
                    editorData = editorInitData.getEditorData($dataContainer),
                    editorBuildStrategy = editorInitData.getEditorBuildStrategy()
                ;
                editorBuildStrategy(editorData);
            };

            $(editorInitData.EDIT_AREA_SELECTOR).find(editorInitData.CONTROL_SELECTOR).click(openEditor);
        }
    };
});
