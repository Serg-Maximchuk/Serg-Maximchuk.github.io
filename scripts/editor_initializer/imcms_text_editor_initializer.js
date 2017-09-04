/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 01.09.17
 */
Imcms.define("imcms-text-editor-initializer", ["tinyMCE"], function (tinyMCE) {
    // stupid way to get contextPath! todo: receive from server
    var relativePath = window.location.pathname;
    var contextPath = ((relativePath.lastIndexOf("/") === 0) ? "" : "/" + relativePath.split("/")[1]);

    var inlineEditorConfig = {
        selector: '.imcms-editor-content--text',
        skin_url: (contextPath + '/libs/tinymce/skins/white'),
        cache_suffix: '?v=0.0.1',
        branding: false,
        skin: 'white',
        inline: true,
        plugins: ['autolink link image lists hr code fullscreen save table contextmenu'],
        toolbar: 'code | bold italic underline | bullist numlist | hr |' +
        ' alignleft aligncenter alignright alignjustify | link image | fullscreen | save',
        menubar: false,
        statusbar: false
    };

    function setEditorFocus(editor) {
        editor.$()
            .parents('.imcms-editor-area--text')
            .find('.imcms-control--text')
            .on('click', function () {
                editor.focus();
            });
    }

    return {
        initEditor: function () {
            tinyMCE.init(inlineEditorConfig).then(function (editors) {
                editors.forEach(setEditorFocus);
            });
        }
    };
});
