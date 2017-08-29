/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-window-components-builder", "imcms-loop-rest-api",
        "imcms-controls-builder"
    ],
    function (BEM, components, windowComponents, loopREST, controls) {
        var $editor, $title, $body, $listItems;

        var modifiers = {
            ID: ["col-1"],
            CONTENT: ["col-10"],
            CONTROLS: ["col-1"]
        };

        var docId, loopId;

        var itemsBEM = new BEM({
            block: "imcms-loop-items",
            elements: {
                "item": "imcms-loop-item"
            }
        });

        function buildEditor() {
            function closeEditor() {
                $editor.css("display", "none");
                clearData();
            }

            function onCreateNewClicked() {
                var newLoopEntry = {
                    no: ++$listItems.children().length,
                    content: "",
                    enabled: true
                };

                loopREST.create(newLoopEntry, function (response) {
                    if (response.code !== 200) {
                        return;
                    }

                    $listItems.append(itemsBEM.makeBlockElement("item", buildItem(newLoopEntry)));
                });
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
                    modifiers: modifiers.ID
                }, {
                    "title": $content,
                    modifiers: modifiers.CONTENT
                }, {
                    "title": $isEnabled,
                    modifiers: modifiers.CONTROLS
                }
            ]);
        }

        function removeLoopEntry(response) {
            if (response.code !== 200) {
                return;
            }

            this.detach();
        }

        function onRemoveLoopEntryClicked(loopEntry) {
            loopREST.remove({
                    docId: docId,
                    loopId: loopId,
                    entryNo: loopEntry.no
                },
                removeLoopEntry.bind(this)
            );
        }

        function buildControls(loopEntry) {
            var controlsBEM = new BEM({
                block: "imcms-controls",
                elements: {
                    "control": "imcms-control"
                }
            });

            var $remove = controls.remove(function () {
                var $item = $remove.parents(".imcms-loop-item");
                onRemoveLoopEntryClicked.call($item, loopEntry);
            });

            return controlsBEM.buildBlock("<div>", [{"control": $remove}])
        }

        function buildItem(loopEntry) {
            var itemBEM = new BEM({
                block: "imcms-loop-item",
                elements: {
                    "info": "imcms-title",
                    "controls": "imcms-controls"
                }
            });

            var $no = itemBEM.buildElement("info", "<div>", {text: loopEntry.no});
            var $content = itemBEM.buildElement("info", "<div>", {text: loopEntry.content});
            var $isEnabled = components.checkboxes.imcmsCheckbox("<div>", {
                name: "isEnabled" + loopEntry.no,
                checked: loopEntry.enabled ? "checked" : undefined
            });
            var $deleteBtn = buildControls(loopEntry);

            return itemBEM.buildBlock("<div>", [
                {
                    "info": $no,
                    modifiers: modifiers.ID
                }, {
                    "info": $content,
                    modifiers: modifiers.CONTENT
                }, {
                    "info": $isEnabled,
                    modifiers: modifiers.CONTROLS
                }, {
                    "controls": $deleteBtn
                }
            ]);
        }

        function buildItems(loop) {
            var blockElements = loop.entries.map(buildItem)
                .map(function ($item) {
                    return {"item": $item};
                });

            return itemsBEM.buildBlock("<div>", blockElements);
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
            $listItems = buildItems(loop);

            return listBEM.buildBlock("<div>", [
                {"titles": $titles},
                {"items": $listItems}
            ]);
        }

        function buildData(loop) {
            docId = loop.docId;
            loopId = loop.loopId;

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
            $body.empty();
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
