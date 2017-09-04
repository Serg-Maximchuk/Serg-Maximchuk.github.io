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
        cache_suffix: '?v=0.0.1',
        branding: false,
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

    // not used now
    var classicEditorConfig = $.extend(
        {
            plugins: ['autolink link image lists hr code fullscreen save table contextmenu autoresize'],
            autoresize_bottom_margin: 20
        },
        defaultEditorConfig
    );

    function initTextEditor(selector, config) {
        config = $.extend({selector: selector}, config);
        tinyMCE.init(config);
    }

    return {
        initTextEditorInline: function (selector) {
            initTextEditor(selector, inlineEditorConfig);
        }
    };
});
