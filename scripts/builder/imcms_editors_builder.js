/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-editors-builder",
    [
        "imcms-page-info-builder", "imcms-menu-editor-builder", "imcms-document-editor-builder",
        "imcms-content-manager-builder"
    ],
    function (pageInfoBuilder, menuEditorBuilder, documentEditorBuilder, contentManagerBuilder) {
        return {
            buildMenuEditor: menuEditorBuilder.build.bind(menuEditorBuilder),
            buildPageInfo: pageInfoBuilder.build.bind(pageInfoBuilder),
            buildDocumentEditor: documentEditorBuilder.build.bind(documentEditorBuilder),
            buildContentManager: contentManagerBuilder.build.bind(contentManagerBuilder)
        };
    }
);
