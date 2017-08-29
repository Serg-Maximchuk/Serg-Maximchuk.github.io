/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder",
    ["imcms-bem-builder", "imcms-components-builder", "imcms-window-components-builder", "imcms-loop-rest-api"],
    function (BEM, components, windowComponents, loopREST) {
        var $editor, $title, $body;

        function buildEditor() {
            function closeEditor() {
                $editor.css("display", "none");
                clearData();
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

            var $head = windowComponents.buildHead("Loop Editor", closeEditor);
            $title = $head.find(".imcms-title");
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

        function buildData(loop) {
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

            function buildItems(loop) {
                var itemsBEM = new BEM({
                    block: "imcms-loop-items",
                    elements: {
                        "item": "imcms-loop-item"
                    }
                });

                return itemsBEM.buildBlock("<div>", []);
            }

            function buildLoopList(loop) {
                var listBEM = new BEM({
                    block: "imcms-loop-list",
                    elements: {
                        "titles": "imcms-loop-list-titles",
                        "items": "imcms-loop-items"
                    }
                });

                var $titles = buildTitles();
                var $items = buildItems(loop);

                return listBEM.buildBlock("<div>", [
                    {"titles": $titles},
                    {"items": $items}
                ]);
            }

            addHeadData(loop);

            var bodyBEM = new BEM({
                block: "imcms-loop-editor-body",
                elements: {
                    "list": "imcms-loop-list"
                }
            });

            var $list = bodyBEM.makeBlockElement("list", buildLoopList(loop));
            $body.append($list);
        }

        function addHeadData(loop) {
            $title.append(": " + loop.docId + "-" + loop.loopId);
        }

        function clearData() {
            $title.text("Loop Editor");
        }

        function loadData(opts) {
            loopREST.read(opts, buildData);
        }

        return {
            build: function (opts) {
                if (!$editor) {
                    $editor = buildEditor().appendTo("body");
                }

                loadData.applyAsync([opts]);
                $editor.css("display", "block");
            }
        }
    }
);
