/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 04.09.17
 */
Imcms.define("imcms-loop-editor-initializer", ["imcms-editors-builder", "jquery"], function (editorsBuilder, $) {
    function openEditor() {
        var $parent = $(this).parents(".imcms-editor-area--loop");
        var docId = $parent.data("docId");
        var loopId = $parent.data("loopId");
        editorsBuilder.buildLoopEditor({
            docId: docId,
            loopId: loopId
        });
    }

    return {
        initEditor: function () {
            $(".imcms-editor-area--loop").find(".imcms-control--loop").click(openEditor);
        }
    }
});
