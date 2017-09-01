/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 01.09.17
 */
Imcms.require(
    [
        "imcms-date-picker", "imcms-time-picker", "imcms-tests", "imcms-components-builder", "imcms-bem-builder",
        "imcms-editors-builder", "imcms-admin-panel-builder", "jquery", "tinyMCE"
    ],
    function (DatePicker, TimePicker, tests, componentsBuilder, BEM, editors, panelBuilder, $, tinyMCE) {
        Imcms.tests = tests;
        console.info("%c Tests loaded.", "color: green");

        panelBuilder.buildPanel();

        var buttons = componentsBuilder.buttons;

        var $chooseImgLink = buttons.positiveButton({
                text: "choose image",
                click: editors.buildContentManager
            }),
            $imageEditorLink = buttons.positiveButton({
                text: "image editor",
                click: editors.buildImageEditor
            }),
            $menuEditorBtn = buttons.positiveButton({
                text: "menu editor",
                click: editors.buildMenuEditor
            }),
            $loopEditorBtn = buttons.positiveButton({
                text: "loop editor",
                click: function () {
                    editors.buildLoopEditor({
                        docId: 1001,
                        loopId: 1
                    });
                }
            }),
            $demoEditorsBtnsContainer = buttons.buttonsContainer("<div>", [
                $chooseImgLink,
                $imageEditorLink,
                $menuEditorBtn,
                $loopEditorBtn
            ])
        ;

        $("#links-as-buttons").append($demoEditorsBtnsContainer);

        // stupid way to get contextPath! todo: receive from server
        var relativePath = window.location.pathname;
        var contextPath = ((relativePath.lastIndexOf("/") === 0) ? "" : "/" + relativePath.split("/")[1]);

        tinyMCE.init({
            skin_url: (contextPath + '/libs/tinymce/skins/white'),
            selector: '.imcms-text-edit-area--inline',
            inline: true,
            skin: 'white',
            plugins: ['autolink link image lists hr code fullscreen save table contextmenu'],
            toolbar: 'code | bold italic underline | bullist numlist | hr | alignleft aligncenter alignright alignjustify | link image | fullscreen | save',
            menubar: false,
            statusbar: false
        });
        tinyMCE.init({
            skin_url: (contextPath + '/libs/tinymce/skins/white'),
            selector: '.imcms-text-edit-area--form',
            skin: 'white',
            plugins: ['autolink link image lists hr code fullscreen save table contextmenu autoresize'],
            toolbar: 'code | bold italic underline | bullist numlist | hr | alignleft aligncenter alignright alignjustify | link image | fullscreen | save',
            autoresize_bottom_margin: 20,
            menubar: false,
            statusbar: false
        });

        console.timeEnd("imCMS JS loaded");
    }
);
