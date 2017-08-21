/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder", "jquery"],
    function (BEM, windowComponents, components, $) {
        var $editor;

        function closeEditor() {
            // uncomment when builder will be ready
            // $editor.css("display", "none");
        }

        function buildBodyHead() {
            var bodyHeadBEM = new BEM({
                block: "imcms-image-characteristics",
                elements: {
                    "button": "imcms-image-characteristic",
                    "img-title": "imcms-title imcms-image-characteristic",
                    "img-url": "imcms-title imcms-image-characteristic",
                    "img-origin-size": "imcms-title imcms-image-characteristic"
                }
            });

            var $hideBottomPanelBtn = components.buttons.neutralButton({
                text: "Show bottom panel"
            });

            return bodyHeadBEM.buildBlock("<div>", [
                {
                    "button": $hideBottomPanelBtn,
                    modifiers: ["bottom-panel"]
                }
            ]);
        }

        function buildEditor() {
            var imageEditorBEM = new BEM({
                block: "imcms-image_editor",
                elements: {
                    "head": "imcms-head",
                    "image-characteristics": "imcms-image-characteristics",
                    "left-side": "",
                    "right-side": ""
                }
            });

            var $head = windowComponents.buildHead("Image Editor", closeEditor);
            var $bodyHead = buildBodyHead();

            return imageEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"image-characteristics": $bodyHead}
            ]);
        }

        return {
            build: function () {
                if (!$editor) {
                    $editor = buildEditor().prependTo("body");
                }

                $editor.css("display", "block");
            }
        };
    }
);
