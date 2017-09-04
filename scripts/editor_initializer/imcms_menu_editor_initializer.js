/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-menu-editor-initializer", ["imcms-editors-builder", "jquery"], function (editorsBuilder, $) {
    var EDITOR_AREA_CLASS = ".imcms-editor-area--menu";

    function openEditor() {
        var $editorArea = $(this).parents(EDITOR_AREA_CLASS);
        var docId = $editorArea.data("docId");
        var menuId = $editorArea.data("menuId");

        editorsBuilder.buildMenuEditor({
            docId: docId,
            menuId: menuId
        });
    }

    return {
        initEditor: function () {
            $(EDITOR_AREA_CLASS).find(".imcms-control--menu").click(openEditor);
        }
    };
});
