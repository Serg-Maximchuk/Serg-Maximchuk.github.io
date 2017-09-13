/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-editor-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-loop-rest-api", "imcms-window-builder",
        "imcms-controls-builder", "jquery"
    ],
    function (BEM, components, loopREST, WindowBuilder, controls, $) {
        var $title, $body, $listItems;

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
            function onCreateNewClicked() {
                var newLoopEntry = {
                    no: ++$listItems.children().length,
                    content: "",
                    enabled: true
                };

                loopREST.create(newLoopEntry)
                    .done(function () {
                        $listItems.append(itemsBEM.makeBlockElement("item", buildItem(newLoopEntry)));
                    });
            }

            function onSaveAndCloseClicked() {
                // todo: implement saving, for now it's just closing!!1
                loopWindowBuilder.closeWindow();
            }

            var $head = loopWindowBuilder.buildHead("Loop Editor");
            $title = $head.find(".imcms-title");

            var $footer = loopWindowBuilder.buildFooter([
                components.buttons.positiveButton({
                    text: "Create new",
                    click: onCreateNewClicked
                }),
                components.buttons.saveButton({
                    text: "Save and close",
                    click: onSaveAndCloseClicked
                })
            ]);

            return new BEM({
                block: "imcms-loop-editor",
                elements: {
                    "head": $head,
                    "body": $body = $("<div>", {"class": "imcms-loop-editor-body"}),
                    "footer": $footer
                }
            }).buildBlockStructure("<div>", {"class": "imcms-editor-window"});
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
            }).done(
                removeLoopEntry.bind(this)
            );
        }

        function buildControls(loopEntry) {
            var $remove = controls.remove(function () {
                var $item = $remove.parents(".imcms-loop-item");
                onRemoveLoopEntryClicked.call($item, loopEntry);
            });

            return controls.buildControlsBlock("<div>", [$remove]);
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
            var blockElements = loop.entries.map(function (entry) {
                return {"item": buildItem(entry)};
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
            loopREST.read(opts).done(buildData);
        }

        var loopWindowBuilder = new WindowBuilder({
            factory: buildEditor,
            loadDataStrategy: loadData,
            clearDataStrategy: clearData
        });

        return {
            build: function (opts) {
                loopWindowBuilder.buildWindow.applyAsync(arguments, loopWindowBuilder);
            }
        }
    }
);
