/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-window-components-builder"],
    function (BEM, components, windowComponents) {
        var $editor, $head, $body;

        function buildEditor() {
            function closeEditor() {
                $editor.css("display", "none");
            }

            function onCreateNewClicked() {
                // todo: implement!!!1!
            }

            function onSaveAndCloseClicked() {
                closeEditor();
                // todo: implement saving, for now it's just closing!!1
            }

            var editorBEM = new BEM({
                block: "imcms-loop-editor",
                elements: {
                    "head": "imcms-head",
                    "body": "imcms-loop-editor-body",
                    "footer": "imcms-footer"
                }
            });

            $head = windowComponents.buildHead("Loop Editor", closeEditor);
            $body = editorBEM.buildElement("body", "<div>");
            var $footer = windowComponents.buildFooter([
                components.buttons.positiveButton({
                    text: "Create new",
                    click: onCreateNewClicked
                }),
                components.buttons.saveButton({
                    text: "Save and close",
                    click: onSaveAndCloseClicked
                })
            ]);

            return editorBEM.buildBlock("<div>", [
                    {"head": $head},
                    {"body": $body},
                    {"footer": $footer}
                ],
                {"class": "imcms-editor-window"}
            );
        }

        function loadData(opts) {
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
                // todo: build items here

                return listBEM.buildBlock("<div>", [
                    {"titles": $titles}
                ]);
            }

            $head.find(".imcms-title").append(": " + opts.docId + "-" + opts.loopId);

            var bodyBEM = new BEM({
                block: "imcms-loop-editor-body",
                elements: {
                    "list": "imcms-loop-list"
                }
            });

            var $list = bodyBEM.makeBlockElement("list", buildLoopList());
            $body.append($list);
        }

        return {
            build: function (opts) {
                if (!$editor) {
                    $editor = buildEditor().appendTo("body");
                }

                loadData(opts);
                $editor.css("display", "block");
            }
        }
    }
);
