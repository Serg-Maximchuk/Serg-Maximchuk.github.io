/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 21.08.17
 */
Imcms.define("imcms-image-editor-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-window-builder", "imcms-content-manager-builder",
        "imcms-image-rest-api", "jquery"
    ],
    function (BEM, components, WindowBuilder, contentManager, imageRestApi, $) {
        var $rightSidePanel, $bottomPanel;

        var imageDataContainers = {};

        function buildBodyHead() {
            function showHidePanel(panelOpts) {
                var panelAnimationOpts = {};

                if (panelOpts.$btn.data("state")) {
                    panelAnimationOpts[panelOpts.panelSide] = "-" + panelOpts.newPanelSideValue + "px";
                    panelOpts.$panel.animate(panelAnimationOpts, 300);
                    panelOpts.$btn.data("state", false);
                    panelOpts.$btn.text("show bottom panel");

                } else {
                    panelAnimationOpts[panelOpts.panelSide] = 0;
                    panelOpts.$panel.animate(panelAnimationOpts, 300);
                    panelOpts.$btn.data("state", true);
                    panelOpts.$btn.text("hide bottom panel");
                }
            }

            function showHideRightPanel() {
                showHidePanel({
                    $btn: $(this),
                    newPanelSideValue: $rightSidePanel.width(),
                    $panel: $rightSidePanel,
                    panelSide: "right",
                    textHide: "hide right panel",
                    textShow: "show right panel"
                });
            }

            function showHideBottomPanel() {
                showHidePanel({
                    $btn: $(this),
                    newPanelSideValue: $bottomPanel.height(),
                    $panel: $bottomPanel,
                    panelSide: "bottom",
                    textHide: "hide bottom panel",
                    textShow: "show bottom panel"
                });
            }

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
                text: "Show bottom panel",
                click: showHideBottomPanel
            });

            imageDataContainers.$imageTitle = bodyHeadBEM.buildElement("img-title", "<div>");

            var $showHideRightPanelBtn = components.buttons.neutralButton({
                "class": "imcms-image-characteristic",
                text: "Show right panel",
                click: showHideRightPanel
            });

            var $imgUrl = bodyHeadBEM.buildElement("img-url", "<div>", {
                text: "Url: "
            }).append(imageDataContainers.$imgUrl = $("<span>"));

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
            imageDataContainers.$heightValue = originSizeBEM.buildElement("height-value", "<span>");
            var $heightBlock = originSizeBEM.buildBlock("<div>", [
                {"height-title": $heightTitle},
                {"height-value": imageDataContainers.$heightValue}
            ]);

            var $widthTitle = originSizeBEM.buildElement("width-title", "<span>", {text: "W:"});
            imageDataContainers.$widthValue = originSizeBEM.buildElement("width-value", "<span>");
            var $widthBlock = originSizeBEM.buildBlock("<div>", [
                {"width-title": $widthTitle},
                {"width-value": imageDataContainers.$widthValue}
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
                    "img-title": imageDataContainers.$imageTitle
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
            var $editableImageArea;

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
                ]).append("<img>");
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

                imageDataContainers.$image = editableImgAreaBEM.buildElement("img", "<img>");
                imageDataContainers.$shadow = editableImgAreaBEM.buildElement("layout", "<div>");
                imageDataContainers.$cropArea = buildCropArea();

                return editableImgAreaBEM.buildBlock("<div>", [
                    {"img": imageDataContainers.$image},
                    {"layout": imageDataContainers.$shadow},
                    {"crop-area": imageDataContainers.$cropArea}
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

            function resizeImage(newWidth, newHeight, backgroundSizeVal) {
                imageDataContainers.$image.animate({
                    "width": newWidth + "px",
                    "height": newHeight + "px"
                }, 200).css({"background-size": backgroundSizeVal});

                imageDataContainers.$shadow.animate({
                    "width": newWidth + "px",
                    "height": newHeight + "px"
                }, 200);

                imageDataContainers.$cropArea.css({"background-size": backgroundSizeVal});
            }

            function zoom(zoomCoefficient) {
                var newHeight = ~~(imageDataContainers.$image.height() * zoomCoefficient),
                    newWidth = ~~(imageDataContainers.$image.width() * zoomCoefficient),
                    backgroundSizeVal = "" + newWidth + "px " + newHeight + "px"
                ;
                resizeImage(newWidth, newHeight, backgroundSizeVal);
            }

            function zoomPlus() {
                zoom(1.1);
            }

            function zoomMinus() {
                zoom(0.9);
            }

            function zoomContain() {
                // fixme: save proportions! now image becomes just as editable area
                // only one side should be as area's side and one as needed to save proportions
                var newHeight = $editableImageArea.height(),
                    newWidth = $editableImageArea.width(),
                    backgroundSizeVal = "" + newWidth + "px " + "auto"
                ;
                resizeImage(newWidth, newHeight, backgroundSizeVal);
            }

            var angle = 0;

            function rotate(angleDelta) {
                angle += angleDelta;
                imageDataContainers.$image.css({"transform": "rotate(" + angle + "deg)"});
                imageDataContainers.$cropArea.css({"transform": "rotate(" + angle + "deg)"});
            }

            function rotateLeft() {
                rotate(-90);
            }

            function rotateRight() {
                rotate(90);
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

            $editableImageArea = buildEditableImageArea();
            $bottomPanel = buildBottomPanel();

            return $("<div>").append($editableImageArea, $bottomPanel);
        }

        function buildRightSide(imageEditorBEM) {

            function buildSelectImageBtnContainer() {
                var $selectImageBtn = components.buttons.neutralButton({
                    text: "Select Image",
                    click: contentManager.build
                });
                return components.buttons.buttonsContainer("<div>", [$selectImageBtn]);
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
                                $btn.attr("data-state", "true").text("Simple");

                            } else {
                                $advancedControls.css("display", "none");
                                $btn.attr("data-state", "false").text("Advanced");
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

            function removeAndClose() {
                // fixme: just closing for now, should be remove and close
                imageWindowBuilder.closeWindow();
            }

            function saveAndClose() {
                // fixme: just closing for now, should be save and close
                imageWindowBuilder.closeWindow();
            }

            function buildFooter() {
                var $removeAndCloseButton = components.buttons.negativeButton({
                    text: "remove and close",
                    click: removeAndClose
                });

                var $saveAndCloseButton = components.buttons.saveButton({
                    text: "save and close",
                    click: saveAndClose
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

            var $head = imageWindowBuilder.buildHead("Image Editor");
            var $bodyHead = buildBodyHead();
            var $leftSide = buildLeftSide();
            $rightSidePanel = buildRightSide(imageEditorBEM);

            return imageEditorBEM.buildBlock("<div>", [
                {"head": $head},
                {"image-characteristics": $bodyHead},
                {"left-side": $leftSide},
                {"right-side": $rightSidePanel}
            ]).addClass("imcms-editor-window");
        }

        function fillBodyHeadData(imageData) {
            imageDataContainers.$imageTitle.text(imageData.name + "." + imageData.format);
            imageDataContainers.$imgUrl.text(imageData.path);
            imageDataContainers.$heightValue.text(imageData.height);
            imageDataContainers.$widthValue.text(imageData.width);
        }

        function fillLeftSideData(imageData) {
            imageDataContainers.$image.attr("src", imageData.path);

            imageDataContainers.$shadow.css({
                width: "100%",
                height: "100%"
            });

            // todo: receive correct crop area
            imageDataContainers.$cropArea.find("img")
                .attr("src", imageData.path)
                .css({
                    width: imageData.width + "px",
                    height: imageData.height + "px"
                });
        }

        function fillData(imageData) {
            fillBodyHeadData(imageData);
            fillLeftSideData(imageData);
        }

        function loadData(opts) {
            imageRestApi.read(opts).done(fillData);
        }

        function clearData() {
            // todo: implement
        }

        var imageWindowBuilder = new WindowBuilder({
            factory: buildEditor,
            loadDataStrategy: loadData,
            clearDataStrategy: clearData
        });

        return {
            build: function (opts) {
                imageWindowBuilder.buildWindow.applyAsync(arguments, imageWindowBuilder);
            }
        };
    }
);
