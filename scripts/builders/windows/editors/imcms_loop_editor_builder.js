/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder"],
    function (BEM, components) {
        var $editor;

        function buildEditor() {
            function closeEditor() {
                $editor.css("display", "none");
            }

            function buildHead() {
                var headBEM = new BEM({
                    block: "imcms-head",
                    elements: {
                        "title": "imcms-title",
                        "button": "imcms-button"
                    }
                });

                var $title = headBEM.buildElement("title", "<div>", {text: "Loop editor"}); // todo: add doc id and loop id
                var $closeBtn = components.buttons.closeButton({click: closeEditor});

                return headBEM.buildBlock("<div>", [
                    {"title": $title},
                    {"button": $closeBtn}
                ]);
            }

            var editorBEM = new BEM({
                block: "imcms-loop-editor",
                elements: {
                    "head": "imcms-head",
                    "body": "imcms-loop-editor-body",
                    "footer": "imcms-footer"
                }
            });

            var $head = buildHead();

            return editorBEM.buildBlock("<div>", [
                    {"head": $head}
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
