/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "jquery"],
    function (BEM, windowComponents, $) {
        var $editor;

        function closeEditor() {
            // uncomment when builder will be ready
            // $editor.css("display", "none");
        }

        function buildBodyHead() {
            var bodyHeadBEM = new BEM({
                block: "imcms-image-characteristic",
                elements: {
                    "button": "",
                    "img-title": "imcms-title",
                    "img-url": "imcms-title",
                    "img-origin-size": "imcms-title"
                }
            });

            return bodyHeadBEM.buildBlock("<div>", []);
        }

        function buildEditor() {
            var imageEditorBEM = new BEM({
                block: "imcms-image_editor",
                elements: {
                    "head": "imcms-head",
                    "image-characteristics": "imcms-image-characteristic",
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
