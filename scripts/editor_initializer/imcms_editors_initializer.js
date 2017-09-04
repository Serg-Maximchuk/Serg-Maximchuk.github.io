/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-editors-initializer", ["imcms-text-editor-initializer"], function (textEditorInit) {
    var editors = [
        textEditorInit
    ];

    function initEditor(editor) {
        editor.initEditor();
    }

    return {
        initEditors: function () {
            editors.forEach(initEditor);
        }
    };
});
