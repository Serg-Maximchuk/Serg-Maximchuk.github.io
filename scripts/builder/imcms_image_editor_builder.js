/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder",
    ["imcms-bem-builder", "imcms-window-components-builder", "imcms-components-builder", "jquery"],
    function (BEM, windowComponents, components, $) {
        var $editor, $imageContainer;

        function closeEditor() {
            $editor.css("display", "none");
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

                // todo: set image specific width/height !!1!
                $imageContainer = editableImgAreaBEM.buildElement("img", "<div>").css({
                    width: "1436px",
                    height: "773px"
                });
                var $shadow = editableImgAreaBEM.buildElement("layout", "<div>").css({
                    width: "1436px",
                    height: "773px"
                });
                var $cropArea = buildCropArea().css({
                    width: "649px",
                    height: "496px"
                });

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

            function buildSwitchViewControls() {
                var switchViewControlsBEM = new BEM({
                    block: "imcms-editable-img-control-tabs",
                    elements: {"tab": "imcms-title"}
                });

                var $preview = switchViewControlsBEM.buildElement("tab", "<div>", {text: "Preview"});
                var $origin = switchViewControlsBEM.buildElement("tab", "<div>", {text: "Original"});

                return switchViewControlsBEM.buildBlock("<div>", [
                    {
                        "tab": $preview
                    }, {
                        "tab": $origin,
                        modifiers: ["active"]
                    }
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
                var $switchViewControls = buildSwitchViewControls();

                return bottomPanelBEM.buildBlock("<div>", [
                    {"control-size": $editSizeControls},
                    {"control-scale-n-rotate": $scaleAndRotateControls},
                    {"control-view": $switchViewControls}
                ]);
            }

            var $editableImageArea = buildEditableImageArea();
            var $bottomPanel = buildBottomPanel();

            return $("<div>").append($editableImageArea, $bottomPanel);
        }

        function buildRightSide(imageEditorBEM) {

            function buildSelectImageBtnContainer() {
                var $hiddenFileInput = $("<input>", {
                    type: "file",
                    name: "image",
                    "style": "display: none"
                });
                var $selectImageBtn = components.buttons.neutralButton({
                    text: "Select Image",
                    click: function () {
                        $hiddenFileInput.click();
                    }
                });
                return components.buttons.buttonsContainer("<div>", [
                    $hiddenFileInput,
                    $selectImageBtn
                ]);
            }

            function buildAltTextBox() {
                return components.texts.textBox("<div>", {
                    text: "Alt text",
                    name: "altText"
                });
            }

            function buildImageLinkTextBox() {
                return components.texts.textBox("<div>", {
                    text: "Image link",
                    name: "imageLink"
                });
            }

            function buildImageLangFlags() {
                return components.flags.flagsContainer("<div>", [
                    components.flags.eng("<div>", true, {
                        click: function () {
                            // todo: implement!!!
                        }
                    }),
                    components.flags.swe("<div>", false, {
                        click: function () {
                            // todo: implement!!!
                        }
                    })
                ]);
            }

            function buildAllLanguagesCheckbox() {
                return components.checkboxes.checkboxContainer("<div>", [
                    components.checkboxes.imcmsCheckbox("<div>", {
                        name: "allLanguages",
                        text: "All languages"
                    })
                ]);
            }

            function buildAdvancedModeBtn($advancedControls) {
                return components.buttons.buttonsContainer("<div>", [
                    components.buttons.negativeButton({
                        text: "Advanced",
                        "data-state": "false",
                        click: function () {
                            var $btn = $(this);

                            if ($btn.attr("data-state") === "false") {
                                $advancedControls.css("display", "block");
                                $btn.attr("data-state", "true");

                            } else {
                                $advancedControls.css("display", "none");
                                $btn.attr("data-state", "false");
                            }
                        }
                    })
                ]);
            }

            function buildTextAlignmentBtnsContainer() {
                function buildAlignButton(modifiers, onClick) {
                    return components.buttons.imcmsButton({click: onClick}, ["align"].concat(modifiers));
                }

                // todo: implement onClick!
                var $alignNoneBtn = buildAlignButton(["align-none", "align-active"]).text("None");
                var $alignTopBtn = buildAlignButton(["align-top"]);
                var $alignCenterBtn = buildAlignButton(["align-center"]);
                var $alignBottomBtn = buildAlignButton(["align-bottom"]);
                var $alignLeftBtn = buildAlignButton(["align-left"]);
                var $alignRightBtn = buildAlignButton(["align-right"]);

                return components.buttons.buttonsContainer("<div>", [
                    $alignNoneBtn,
                    $alignTopBtn,
                    $alignCenterBtn,
                    $alignBottomBtn,
                    $alignLeftBtn,
                    $alignRightBtn
                ]);
            }

            function buildSpaceAroundImageInputContainer() {
                return components.texts.pluralInput("<div>", [
                    {
                        id: "image-space-top",
                        name: "top",
                        placeholder: "top"
                    }, {
                        id: "image-space-right",
                        name: "right",
                        placeholder: "right"
                    }, {
                        id: "image-space-bottom",
                        name: "bottom",
                        placeholder: "bottom"
                    }, {
                        id: "image-space-left",
                        name: "left",
                        placeholder: "left"
                    }
                ], {text: "Space around image (h-vspace)"});
            }

            function buildCropCoordinatesText(advancedModeBEM) {
                return advancedModeBEM.buildElement("title", "<div>")
                    .append("Crop Coordinates (W:")
                    .append(advancedModeBEM.buildBlockElement("current-crop-width", "<span>", {text: "400"}))
                    .append(" H:")
                    .append(advancedModeBEM.buildBlockElement("current-crop-width", "<span>", {text: "100"}))
                    .append(")");
            }

            function buildCropCoordinatesContainer() {
                var cropCoordinatesBEM = new BEM({
                    block: "imcms-crop-coordinates",
                    elements: {
                        "x": "imcms-number",
                        "y": "imcms-number",
                        "x1": "imcms-number",
                        "y1": "imcms-number"
                    }
                });

                var $xCropCoord = components.texts.textNumber("<div>", {
                    name: "cropX0",
                    placeholder: "X",
                    text: "X",
                    error: "Error text"
                });

                var $yCropCoord = components.texts.textNumber("<div>", {
                    name: "cropY0",
                    placeholder: "Y",
                    text: "Y",
                    error: "Error text"
                });

                var $x1CropCoord = components.texts.textNumber("<div>", {
                    name: "cropX1",
                    placeholder: "X1",
                    text: "X1",
                    error: "Error text"
                });

                var $y1CropCoord = components.texts.textNumber("<div>", {
                    name: "cropY1",
                    placeholder: "Y1",
                    text: "Y1",
                    error: "Error text"
                });

                return cropCoordinatesBEM.buildBlock("<div>", [
                    {"x": $xCropCoord},
                    {"y": $yCropCoord},
                    {"x1": $x1CropCoord},
                    {"y1": $y1CropCoord}
                ]);
            }

            function buildFileFormatSelect() {
                return components.selects.imcmsSelect("<div>", {
                    text: "File format",
                    name: "fileFormat"
                }, [{
                    text: "GIF",
                    "data-value": 0
                }, {
                    text: "PNG",
                    "data-value": 1
                }, {
                    text: "PNG-24",
                    "data-value": 2
                }, {
                    text: "JPG",
                    "data-value": 3
                }]);
            }

            function showExif() {
                // todo: implement!!!
            }

            function buildAdvancedControls() {
                var advancedModeBEM = new BEM({
                    block: "imcms-advanced-mode",
                    elements: {
                        "title": "imcms-title",
                        "buttons": "imcms-buttons",
                        "space-around": "imcms-space-around",
                        "current-crop-width": "imcms-title",
                        "crop-coordinates": "imcms-crop-coordinates",
                        "file-format": "imcms-select",
                        "button": "imcms-button"
                    }
                });

                var $textAlignmentBtnsTitle = advancedModeBEM.buildElement("title", "<div>", {text: "Text alignment"});
                var $textAlignmentBtnsContainer = buildTextAlignmentBtnsContainer();
                var $spaceAroundImageInputContainer = buildSpaceAroundImageInputContainer();
                var $cropCoordinatesText = buildCropCoordinatesText(advancedModeBEM);
                var $cropCoordinatesContainer = buildCropCoordinatesContainer();
                var $fileFormat = buildFileFormatSelect();
                var $showExifBtn = components.buttons.neutralButton({
                    text: "Show exif",
                    click: showExif
                });

                return advancedModeBEM.buildBlock("<div>", [
                    {"title": $textAlignmentBtnsTitle},
                    {"buttons": $textAlignmentBtnsContainer},
                    {"space-around": $spaceAroundImageInputContainer},
                    {"title": $cropCoordinatesText},
                    {"crop-coordinates": $cropCoordinatesContainer},
                    {"file-format": $fileFormat},
                    {"button": $showExifBtn}
                ]);
            }

            function buildEditableControls() {
                var editableControlsBEM = new BEM({
                    block: "imcms-editable-controls-area",
                    elements: {
                        "buttons": "imcms-buttons",
                        "text-box": "imcms-text-box",
                        "flags": "imcms-flags",
                        "checkboxes": "imcms-checkboxes",
                        "advanced-mode": "imcms-advanced-mode"
                    }
                });

                var $selectImageBtnContainer = buildSelectImageBtnContainer();
                var $altTextBox = buildAltTextBox();
                var $imageLinkTextBox = buildImageLinkTextBox();
                var $langFlags = buildImageLangFlags();
                var $allLangs = buildAllLanguagesCheckbox();
                var $advancedControls = buildAdvancedControls();
                var $advancedModeBtn = buildAdvancedModeBtn($advancedControls);

                return editableControlsBEM.buildBlock("<div>", [
                    {"buttons": $selectImageBtnContainer},
                    {"text-box": $altTextBox},
                    {"text-box": $imageLinkTextBox},
                    {"flags": $langFlags},
                    {"checkboxes": $allLangs},
                    {"buttons": $advancedModeBtn},
                    {"advanced-mode": $advancedControls}
                ]);
            }

            function buildFooter() {
                var $removeAndCloseButton = components.buttons.negativeButton({
                    text: "remove and close",
                    click: closeEditor // fixme: just closing for now, should be remove and close
                });

                var $saveAndCloseButton = components.buttons.saveButton({
                    text: "save and close",
                    click: closeEditor // fixme: just closing for now, should be save and close
                });

                return $("<div>").append($removeAndCloseButton, $saveAndCloseButton);
            }

            var $editableControls = buildEditableControls();
            var $footer = imageEditorBEM.makeBlockElement("footer", buildFooter());

            return $("<div>").append($editableControls, $footer);
        }

        function buildEditor() {
            var imageEditorBEM = new BEM({
                block: "imcms-image_editor",
                elements: {
                    "head": "imcms-head",
                    "image-characteristics": "imcms-image-characteristics",
                    "left-side": "",
                    "right-side": "",
                    "footer": "imcms-buttons"
                }
            });

            var $head = windowComponents.buildHead("Image Editor", closeEditor);
            var $bodyHead = buildBodyHead();
            var $leftSide = buildLeftSide();
            var $rightSide = buildRightSide(imageEditorBEM);

            return imageEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"image-characteristics": $bodyHead},
                {"left-side": $leftSide},
                {"right-side": $rightSide}
            ]);
        }

        return {
            build: function () {
                if (!$editor) {
                    $editor = buildEditor().appendTo("body");
                }

                $editor.css("display", "block");
            }
        };
    }
);
