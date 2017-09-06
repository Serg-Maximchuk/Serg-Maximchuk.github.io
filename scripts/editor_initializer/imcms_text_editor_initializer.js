/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 01.09.17
 */
Imcms.define("imcms-text-editor-initializer",
    ["tinyMCE", "imcms-uuid-generator", "jquery"],
    function (tinyMCE, uuidGenerator, $) {
        // stupid way to get contextPath! todo: receive from server
        var relativePath = window.location.pathname;
        var contextPath = ((relativePath.lastIndexOf("/") === 0) ? "" : "/" + relativePath.split("/")[1]);

        var inlineEditorConfig = {
            // selector: '.imcms-editor-content--text',
            skin_url: (contextPath + '/libs/tinymce/skins/white'),
            cache_suffix: '?v=0.0.1',
            branding: false,
            skin: 'white',
            inline: true,
            toolbar_items_size: 'small',
            // fixed_toolbar_container: '#sss',
            // custom_ui_selector: '.imcms-editor-area--text',
            plugins: ['autolink link image lists hr code fullscreen save table contextmenu'],
            toolbar: 'code | bold italic underline | bullist numlist | hr |' +
            ' alignleft aligncenter alignright alignjustify | link image | fullscreen | save',
            menubar: false,
            statusbar: false
        };

        function setEditorFocus(editor) {
            delete editor.buttons.save.text;

            editor.$()
                .parents('.imcms-editor-area--text')
                .find('.imcms-control--text')
                .on('click', function () {
                    editor.focus();
                });
        }

        return {
            initEditor: function () {
                $(".imcms-editor-content--text").each(function () {
                    var toolbarId = uuidGenerator.generateUUID();
                    var textAreaId = uuidGenerator.generateUUID();

                    $(this).attr("id", textAreaId)
                        .closest(".imcms-editor-area--text")
                        .find(".imcms-editor-area__text-toolbar")
                        .attr("id", toolbarId);

                    var config = $.extend({
                        selector: "#" + textAreaId,
                        fixed_toolbar_container: "#" + toolbarId
                    }, inlineEditorConfig);

                    tinyMCE.init(config).then(function (editors) {
                        editors.forEach(setEditorFocus);
                    });
                });
            }
        };
    }
);
