/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder", "jquery"],
    function (BEM, windowComponents, components, $) {
        var $editor, $imageContainer;

        function closeEditor() {
            // uncomment when builder will be ready
            // $editor.css("display", "none");
        }

        function buildBodyHead() {
            var bodyHeadBEM = new BEM({
                block: "imcms-image-characteristics",
                elements: {
                    "button": "imcms-image-characteristic",
                    "img-title": "imcms-title imcms-image-characteristic",
                    "img-url": "imcms-title imcms-image-characteristic",
                    "img-origin-size": "imcms-title imcms-image-characteristic"
                }
            });

            var $showHideBottomPanelBtn = components.buttons.neutralButton({
                "class": "imcms-image-characteristic",
                text: "Show bottom panel"
            });

            var $imageTitle = bodyHeadBEM.buildElement("img-title", "<div>", {text: "img1.jpg"}); // todo: print correct image name

            var $showHideRightPanelBtn = components.buttons.neutralButton({
                "class": "imcms-image-characteristic",
                text: "Show right panel"
            });

            var $imgUrl = bodyHeadBEM.buildElement("img-url", "<div>", {
                text: "Url: "
            }).append($("<span>", {text: "/img/image_editor/img1.jpg"})); // todo: print correct image url

            var characteristicBEM = new BEM({
                block: "imcms-title imcms-image-characteristic",
                elements: {"origin-size": "imcms-img-origin-size"}
            });

            var originSizeBEM = new BEM({
                block: "imcms-img-origin-size",
                elements: {
                    "height-title": "imcms-title",
                    "height-value": "imcms-title",
                    "width-title": "imcms-title",
                    "width-value": "imcms-title"
                }
            });

            var $heightTitle = originSizeBEM.buildElement("height-title", "<span>", {text: "H:"});
            var $heightValue = originSizeBEM.buildElement("height-value", "<span>", {text: "773"});
            var $heightBlock = originSizeBEM.buildBlock("<div>", [
                {"height-title": $heightTitle},
                {"height-value": $heightValue}
            ]);

            var $widthTitle = originSizeBEM.buildElement("width-title", "<span>", {text: "W:"});
            var $widthValue = originSizeBEM.buildElement("width-value", "<span>", {text: "1436"});
            var $widthBlock = originSizeBEM.buildBlock("<div>", [
                {"width-title": $widthTitle},
                {"width-value": $widthValue}
            ]);

            var $heightWidthBlock = characteristicBEM.buildBlock("<div>", [
                {"origin-size": $heightBlock},
                {"origin-size": $widthBlock}
            ], {text: "Orig "});

            return bodyHeadBEM.buildBlock("<div>", [
                {
                    "button": $showHideBottomPanelBtn,
                    modifiers: ["bottom-panel"]
                }, {
                    "img-title": $imageTitle
                }, {
                    "button": $showHideRightPanelBtn,
                    modifiers: ["right-panel"]
                }, {
                    "img-url": $imgUrl
                }, {
                    "img-origin-size": $heightWidthBlock
                }
            ]);
        }

        function buildLeftSide() {
            function buildCropArea() {
                var cropAreaBEM = new BEM({
                    block: "imcms-crop-area",
                    elements: {"angle": "imcms-angle"}
                });

                var $angleTopLeft = cropAreaBEM.buildElement("angle", "<div>", {}, ["top-left"]);
                var $angleTopRight = cropAreaBEM.buildElement("angle", "<div>", {}, ["top-right"]);
                var $angleBottomLeft = cropAreaBEM.buildElement("angle", "<div>", {}, ["bottom-left"]);
                var $angleBottomRight = cropAreaBEM.buildElement("angle", "<div>", {}, ["bottom-right"]);

                return cropAreaBEM.buildBlock("<div>", [
                    {"angle": $angleTopLeft},
                    {"angle": $angleTopRight},
                    {"angle": $angleBottomLeft},
                    {"angle": $angleBottomRight}
                ]);
            }

            function buildEditableImageArea() {
                var editableImgAreaBEM = new BEM({
                    block: "imcms-editable-img-area",
                    elements: {
                        "img": "imcms-editable-img",
                        "layout": "",
                        "crop-area": "imcms-crop-area"
                    }
                });

                $imageContainer = editableImgAreaBEM.buildElement("img", "<div>");
                var $shadow = editableImgAreaBEM.buildElement("layout", "<div>");
                var $cropArea = buildCropArea();

                return editableImgAreaBEM.buildBlock("<div>", [
                    {"img": $imageContainer},
                    {"layout": $shadow},
                    {"crop-area": $cropArea}
                ]);
            }

            function buildEditSizeControls() {
                var editSizeBEM = new BEM({
                    block: "imcms-edit-size",
                    elements: {
                        "title": "imcms-title",
                        "number": "",
                        "button": ""
                    }
                });

                var $title = editSizeBEM.buildElement("title", "<div>", {text: "Display size"});

                var $heightControlInput = components.texts.textNumber("<div>", {
                    name: "height",
                    placeholder: "Height",
                    text: "H",
                    error: "Error text"
                });

                var $proportionsBtn = components.buttons.proportionsButton({
                    "data-state": "active",
                    click: function () {
                        console.log("%c Not implemented: Lock/unlock image proportions!", "color: red");
                    }
                });

                var $widthControlInput = components.texts.textNumber("<div>", {
                    name: "width",
                    placeholder: "Width",
                    text: "W",
                    error: "Error text"
                });

                return editSizeBEM.buildBlock("<div>", [
                    {"title": $title},
                    {"number": $heightControlInput},
                    {"button": $proportionsBtn},
                    {"number": $widthControlInput}
                ]);
            }

            function zoomPlus() {
                // todo: implement!
            }

            function zoomMinus() {
                // todo: implement!
            }

            function zoomContain() {
                // todo: implement!
            }

            function rotateLeft() {
                // todo: implement!
            }

            function rotateRight() {
                // todo: implement!
            }

            function buildScaleAndRotateControls() {
                var scaleAndRotateBEM = new BEM({
                    block: "imcms-edit-image",
                    elements: {"button": ""}
                });

                var $zoomPlusBtn = components.buttons.zoomPlusButton({click: zoomPlus});
                var $zoomMinusBtn = components.buttons.zoomMinusButton({click: zoomMinus});
                var $zoomContainBtn = components.buttons.zoomContainButton({click: zoomContain});
                var $rotateLeftBtn = components.buttons.rotateLeftButton({click: rotateLeft});
                var $rotateRightBtn = components.buttons.rotateRightButton({click: rotateRight});

                return scaleAndRotateBEM.buildBlock("<div>", [
                    {"button": $zoomPlusBtn},
                    {"button": $zoomMinusBtn},
                    {"button": $zoomContainBtn},
                    {"button": $rotateLeftBtn},
                    {"button": $rotateRightBtn}
                ]);
            }

            function buildBottomPanel() {
                var bottomPanelBEM = new BEM({
                    block: "imcms-editable-img-controls",
                    elements: {
                        "control-size": "imcms-edit-size",
                        "control-scale-n-rotate": "imcms-edit-image",
                        "control-view": "imcms-editable-img-control-tabs"
                    }
                });

                var $editSizeControls = buildEditSizeControls();
                var $scaleAndRotateControls = buildScaleAndRotateControls();

                return bottomPanelBEM.buildBlock("<div>", [
                    {"control-size": $editSizeControls},
                    {"control-scale-n-rotate": $scaleAndRotateControls}
                ]);
            }

            var $editableImageArea = buildEditableImageArea();
            var $bottomPanel = buildBottomPanel();

            return $("<div>").append($editableImageArea, $bottomPanel);
        }

        function buildEditor() {
            var imageEditorBEM = new BEM({
                block: "imcms-image_editor",
                elements: {
                    "head": "imcms-head",
                    "image-characteristics": "imcms-image-characteristics",
                    "left-side": "",
                    "right-side": ""
                }
            });

            var $head = windowComponents.buildHead("Image Editor", closeEditor);
            var $bodyHead = buildBodyHead();
            var $leftSide = buildLeftSide();

            return imageEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"image-characteristics": $bodyHead},
                {"left-side": $leftSide}
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
