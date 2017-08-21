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

        function buildEditor() {
            var imageEditorBEM = new BEM({
                block: "imcms-image_editor",
                elements: {
                    "head": "imcms-head",
                    "image-characteristics": "",
                    "left-side": "",
                    "right-side": ""
                }
            });

            var $head = windowComponents.buildHead("Image Editor", closeEditor);

            return imageEditorBEM.buildBlock("<div>", [{"head": $head}]);
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
