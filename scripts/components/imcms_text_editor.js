/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 01.09.17
 */
Imcms.define("imcms-text-editor", ["tinyMCE", "jquery"], function (tinyMCE, $) {
    // stupid way to get contextPath! todo: receive from server
    var relativePath = window.location.pathname;
    var contextPath = ((relativePath.lastIndexOf("/") === 0) ? "" : "/" + relativePath.split("/")[1]);

    var defaultEditorConfig = {
        skin_url: (contextPath + '/libs/tinymce/skins/white'),
        skin: 'white',
        toolbar: 'code | bold italic underline | bullist numlist | hr | alignleft aligncenter alignright alignjustify | link image | fullscreen | save',
        menubar: false,
        statusbar: false
    };

    var inlineEditorConfig = $.extend(
        {
            inline: true,
            plugins: ['autolink link image lists hr code fullscreen save table contextmenu']
        },
        defaultEditorConfig
    );

    var classicEditorConfig = $.extend(
        {
            plugins: ['autolink link image lists hr code fullscreen save table contextmenu autoresize'],
            autoresize_bottom_margin: 20
        },
        defaultEditorConfig
    );

    return {
        initTextEditor: function (selector, isInline) {
            var config = $.extend({selector: selector}, isInline ? inlineEditorConfig : classicEditorConfig);
            tinyMCE.init(config);
        }
    };
});
