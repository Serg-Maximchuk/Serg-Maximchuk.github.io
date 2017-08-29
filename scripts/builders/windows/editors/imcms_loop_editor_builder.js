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

            function buildTitles() {
                var titlesBEM = new BEM({
                    block: "imcms-loop-list-titles",
                    elements: {"title": ""}
                });

                var $id = titlesBEM.buildElement("title", "<div>", {text: "id"});
                var $content = titlesBEM.buildElement("title", "<div>", {text: "text content"});
                var $isEnabled = titlesBEM.buildElement("title", "<div>", {text: "is enabled"});

                return titlesBEM.buildBlock("<div>", [
                    {
                        "title": $id,
                        modifiers: ["col-1"]
                    }, {
                        "title": $content,
                        modifiers: ["col-10"]
                    }, {
                        "title": $isEnabled,
                        modifiers: ["col-1"]
                    }
                ]);
            }

            function buildLoopList() {
                var listBEM = new BEM({
                    block: "imcms-loop-list",
                    elements: {
                        "titles": "imcms-loop-list-titles",
                        "items": "imcms-loop-items"
                    }
                });

                var $titles = buildTitles();

                return listBEM.buildBlock("<div>", [
                    {"titles": $titles}
                ]);
            }

            function buildBody() {
                var bodyBEM = new BEM({
                    block: "imcms-loop-editor-body",
                    elements: {
                        "list": "imcms-loop-list"
                    }
                });

                var $list = buildLoopList();

                return bodyBEM.buildBlock("<div>", [{"list": $list}]);
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
