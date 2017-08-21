/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "jquery"],
    function (BEM, windowComponents, $) {
        var $editor;

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

            return imageEditorBEM.buildBlock("<div>", []);
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