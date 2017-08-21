/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.require(["imcms-admin-panel-builder", "imcms-editors-builder", "imcms-initialize"],
    function (panelBuilder, editors, initialize) {
        editors.buildImageEditor();
        initialize.init();
    // panelBuilder.buildPanel();
    }
);
