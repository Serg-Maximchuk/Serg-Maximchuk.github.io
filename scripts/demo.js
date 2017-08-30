/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.07.17.
 */
Imcms.require(
    [
        "imcms-date-picker", "imcms-time-picker", "imcms-tests", "imcms-components-builder", "imcms-bem-builder",
        "imcms-editors-builder", "imcms-admin-panel-builder", "jquery"
    ],
    function (DatePicker, TimePicker, tests, componentsBuilder, BEM, editors, panelBuilder, $) {
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

        console.timeEnd("imCMS JS loaded");
    }
);
