/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-editors-builder",
    ["imcms-page-info-builder", "imcms-menu-editor-builder"],
    function (pageInfoBuilder, menuEditorBuilder) {
        return {
            buildMenuEditor: menuEditorBuilder.build,
            buildPageInfo: pageInfoBuilder.build
        };
    }
);
