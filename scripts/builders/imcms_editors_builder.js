/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-editors-builder",
    [
        "imcms-page-info-builder", "imcms-menu-editor-builder", "imcms-document-editor-builder",
        "imcms-content-manager-builder", "imcms-image-editor-builder", "imcms-loop-editor-builder"
    ],
    function (pageInfoBuilder, menuEditorBuilder, documentEditorBuilder, contentManagerBuilder, imageEditorBuilder,
              loopEditorBuilder) {
        return {
            buildMenuEditor: menuEditorBuilder.build.bind(menuEditorBuilder),
            buildPageInfo: pageInfoBuilder.build.bind(pageInfoBuilder),
            buildDocumentEditor: documentEditorBuilder.build.bind(documentEditorBuilder),
            buildContentManager: contentManagerBuilder.build.bind(contentManagerBuilder),
            buildImageEditor: imageEditorBuilder.build.bind(imageEditorBuilder),
            buildLoopEditor: loopEditorBuilder.build.bind(loopEditorBuilder)
        };
    }
);
