/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-loop-editor-initializer", ["imcms-editors-builder", "jquery"], function (editorsBuilder, $) {
    var EDIT_AREA_CLASS = ".imcms-editor-area--loop";

    function openEditor() {
        var $parent = $(this).parents(EDIT_AREA_CLASS);
        var docId = $parent.data("docId");
        var loopId = $parent.data("loopId");

        editorsBuilder.buildLoopEditor({
            docId: docId,
            loopId: loopId
        });
    }

    return {
        initEditor: function () {
            $(EDIT_AREA_CLASS).find(".imcms-control--loop").click(openEditor);
        }
    }
});
