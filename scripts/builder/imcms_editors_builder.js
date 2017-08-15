/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-editors-builder",
    ["imcms-page-info-builder", "imcms-menu-editor-builder", "imcms-document-editor-builder"],
    function (pageInfoBuilder, menuEditorBuilder, documentEditorBuilder) {
        return {
            buildMenuEditor: menuEditorBuilder.build.bind(menuEditorBuilder),
            buildPageInfo: pageInfoBuilder.build.bind(pageInfoBuilder),
            buildDocumentEditor: documentEditorBuilder.build.bind(documentEditorBuilder)
        };
    }
);
