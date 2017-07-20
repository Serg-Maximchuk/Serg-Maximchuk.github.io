Imcms.define("imcms-image-editor",
    ["imcms-image-editor-crop", "imcms-image-editor-bottom-panel", "jquery"],
    function (imcmsImageEditorCrop, imcmsImageEditorBottomPanel, $) {

        function showHideRightPanel() {
            var $btn = $(this),
                rightSidePanel = $("#rightSidePanel"),
                rightSidePanelWidth = rightSidePanel.width()
            ;

            if ($btn.data("state")) {
                rightSidePanel.animate({
                    "right": "-" + rightSidePanelWidth + "px"
                }, 300);
                $btn.data("state", false);
                $btn.text("show right panel");
            } else {
                rightSidePanel.animate({
                    "right": 0
                }, 300);
                $btn.data("state", true);
                $btn.text("hide right panel");
            }
        }

        function showHideBottomPanel() {
            var $btn = $(this),
                bottomPanel = $("#bottomPanel"),
                bottomSidePanelHeight = bottomPanel.height()
            ;

            if ($btn.data("state")) {
                bottomPanel.animate({
                    "bottom": "-" + bottomSidePanelHeight + "px"
                }, 300);
                $btn.data("state", false);
                $btn.text("show bottom panel");
            } else {
                bottomPanel.animate({
                    "bottom": 0
                }, 300);
                $btn.data("state", true);
                $btn.text("hide bottom panel");
            }
        }

        function chooseMode() {
            var $btn = $(this),
                advancedOptionPanel = $(".imcms-advanced-mode")
            ;

            if ($btn.data("state")) {
                advancedOptionPanel.hide();
                $btn.data("state", false);
                $btn.text("advanced");
            } else {
                advancedOptionPanel.show();
                $btn.data("state", true);
                $btn.text("simple");
            }
        }

        return {
            init: function () {
                $("#showHideRightPanel").click(showHideRightPanel);
                $("#showHideBottomPanel").click(showHideBottomPanel);
                $("#chooseMode").click(chooseMode);
                imcmsImageEditorBottomPanel.init();
                imcmsImageEditorCrop.init();
            }
        };
    }
);
