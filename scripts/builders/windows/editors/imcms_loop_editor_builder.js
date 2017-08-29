/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-window-components-builder"],
    function (BEM, components, windowComponents) {
        var $editor;

        function buildEditor() {
            function closeEditor() {
                $editor.css("display", "none");
            }

            function buildBody() {
                var bodyBEM = new BEM({
                    block: "imcms-loop-editor-body",
                    elements: {
                        "list": "imcms-loop-list"
                    }
                });

                return bodyBEM.buildBlock("<div>", []);
            }

            var editorBEM = new BEM({
                block: "imcms-loop-editor",
                elements: {
                    "head": "imcms-head",
                    "body": "imcms-loop-editor-body",
                    "footer": "imcms-footer"
                }
            });

            var $head = windowComponents.buildHead("Loop Editor", closeEditor);
            var $body = buildBody();

            return editorBEM.buildBlock("<div>", [
                    {"head": $head},
                    {"body": $body}
                ],
                {"class": "imcms-editor-window"}
            );
        }

        return {
            build: function () {
                if (!$editor) {
                    $editor = buildEditor().appendTo("body");
                }

                $editor.css("display", "block");
            }
        }
    }
);
