/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.09.17
 */
Imcms.define("imcms-image-cropper", [], function () {

    var $croppingArea, $imageEditor, $cropImg, originImageParams, croppingAreaParams, angleBorderSize, imageCoords,
        angleParams, $originImg, $topLeftAngle, $topRightAngle, $bottomRightAngle, $bottomLeftAngle;

    function moveCropImage(newTop, newLeft) {
        var cropImgTop = -newTop + angleBorderSize,
            cropImgLeft = -newLeft + angleBorderSize
        ;

        setElementTopLeft($cropImg, cropImgTop, cropImgLeft);
    }

    function setElementTopLeft($element, newTop, newLeft) {
        $element.css({
            top: newTop,
            left: newLeft
        });
    }

    function setElementWidthHeight($element, newWidth, newHeight) {
        $element.css({
            width: newWidth,
            height: newHeight
        });
    }

    function Limit(min, max) {
        return {
            forValue: function (value) {
                return Math.min(Math.max(value, min), max);
            }
        }
    }

    function getValidCoordX(coordX) {
        return Limit(imageCoords.left, originImageParams.width + imageCoords.left + angleBorderSize).forValue(coordX);
    }

    function getValidCoordY(coordY) {
        return Limit(imageCoords.top, originImageParams.height + imageCoords.top + angleBorderSize).forValue(coordY);
    }

    function getValidLeftOnMove(left) {
        return Limit(angleBorderSize, originImageParams.width - croppingAreaParams.width + angleBorderSize).forValue(left);
    }

    function getValidLeftOnResize(left) {
        return Limit(angleBorderSize, parseInt($topRightAngle.css("left")) - angleParams.width).forValue(left);
    }

    function getValidTop(top) {
        return Limit(angleBorderSize, originImageParams.height - croppingAreaParams.height + angleBorderSize).forValue(top);
    }

    function getValidTopOnResize(top) {
        return Limit(angleBorderSize, parseInt($croppingArea.css("top")) + $croppingArea.height() - angleParams.height * 2).forValue(top);
    }

    function getValidAngleTop(top) {
        return Limit(0, originImageParams.height - angleParams.height + angleBorderSize).forValue(top);
    }

    function getValidTopAngleY(top) {
        return Limit(0, parseInt($croppingArea.css("top")) + $croppingArea.height() - angleParams.height * 2 - angleBorderSize).forValue(top);
    }

    function getValidBottomAngleY(top) {
        return Limit(parseInt($croppingArea.css("top")) + angleParams.height, originImageParams.height - angleParams.height).forValue(top);
    }

    function getValidAngleLeft(left) {
        return Limit(0, originImageParams.width - angleParams.width + angleBorderSize).forValue(left);
    }

    function getValidLeftAngleX(left) {
        return Limit(0, parseInt($topRightAngle.css("left")) - angleBorderSize - angleParams.width).forValue(left);
    }

    function getValidRightAngleX(left) {
        return Limit(parseInt($croppingArea.css("left")) + angleParams.width, originImageParams.width - angleParams.width + angleBorderSize).forValue(left);
    }

    function getValidLeftCropWidth(width) {
        return Limit(2 * angleParams.width, parseInt($croppingArea.css("left")) + $croppingArea.width() - angleBorderSize).forValue(width);
    }

    function getValidRightCropWidth(width) {
        return Limit(2 * angleParams.width, originImageParams.width - parseInt($croppingArea.css("left")) + angleBorderSize).forValue(width);
    }

    function getValidCropHeightTop(height) {
        return Limit(2 * angleParams.height, parseInt($croppingArea.css("top")) + $croppingArea.height() - angleBorderSize).forValue(height);
    }

    function getValidCropHeightBottom(height) {
        return Limit(2 * angleParams.height, originImageParams.height - parseInt($croppingArea.css("top")) + angleBorderSize).forValue(height);
    }

    function moveCropArea(top, left) {
        setElementTopLeft($croppingArea, top, left);
        moveCropImage(top, left);
    }

    function moveTopLeftCroppingAngle(deltaX, deltaY) {
        var newTop = parseInt($topLeftAngle.css("top")) - deltaY;
        var newLeft = parseInt($topLeftAngle.css("left")) - deltaX;

        var legalTop = getValidTopAngleY(newTop);
        var legalLeft = getValidLeftAngleX(newLeft);

        setElementTopLeft($topLeftAngle, legalTop, legalLeft);
    }

    function moveTopRightCroppingAngle(deltaX, deltaY) {
        var newTop = parseInt($topRightAngle.css("top")) - deltaY;
        var newLeft = parseInt($topRightAngle.css("left")) - deltaX;

        var legalTop = getValidTopAngleY(newTop);
        var legalLeft = getValidRightAngleX(newLeft);

        setElementTopLeft($topRightAngle, legalTop, legalLeft);
    }

    function moveBottomLeftCroppingAngle(deltaX, deltaY) {
        var newTop = parseInt($bottomLeftAngle.css("top")) - deltaY;
        var newLeft = parseInt($bottomLeftAngle.css("left")) - deltaX;

        var legalTop = getValidBottomAngleY(newTop);
        var legalLeft = getValidLeftAngleX(newLeft);

        setElementTopLeft($bottomLeftAngle, legalTop, legalLeft);
    }

    function moveCroppingAngle($angle, deltaX, deltaY) {
        var newTop = parseInt($angle.css("top")) - deltaY;
        var newLeft = parseInt($angle.css("left")) - deltaX;

        var legalTop = getValidAngleTop(newTop);
        var legalLeft = getValidAngleLeft(newLeft);

        setElementTopLeft($angle, legalTop, legalLeft);
    }

    function resizeCroppingTopLeft(deltaX, deltaY) {
        var newWidth = (croppingAreaParams.width = $croppingArea.width() + deltaX);
        var newHeight = (croppingAreaParams.height = $croppingArea.height() + deltaY);

        var newTop = parseInt($croppingArea.css("top")) - deltaY;
        newTop = getValidTopOnResize(newTop);
        var newLeft = parseInt($croppingArea.css("left")) - deltaX;
        newLeft = getValidLeftOnResize(newLeft);

        var legalWidth = getValidLeftCropWidth(newWidth);
        var legalHeight = getValidCropHeightTop(newHeight);

        setElementWidthHeight($croppingArea, legalWidth, legalHeight);
        $cropImg.css("top", angleBorderSize - newTop);
        $cropImg.css("left", angleBorderSize - newLeft);
        $croppingArea.css("top", newTop);
        $croppingArea.css("left", newLeft);
    }

    function resizeCroppingTopRight(deltaX, deltaY) {
        var newWidth = (croppingAreaParams.width = $croppingArea.width() - deltaX);
        var newHeight = (croppingAreaParams.height = $croppingArea.height() + deltaY);

        var newTop = parseInt($croppingArea.css("top")) - deltaY;
        newTop = getValidTopOnResize(newTop);

        var legalWidth = getValidRightCropWidth(newWidth);
        var legalHeight = getValidCropHeightTop(newHeight);

        setElementWidthHeight($croppingArea, legalWidth, legalHeight);
        $cropImg.css("top", angleBorderSize - newTop);
        $croppingArea.css("top", newTop);
    }

    function resizeCroppingBottomRight(deltaX, deltaY) {
        var newWidth = (croppingAreaParams.width = $croppingArea.width() - deltaX);
        var newHeight = (croppingAreaParams.height = $croppingArea.height() - deltaY);

        var legalWidth = getValidRightCropWidth(newWidth);
        var legalHeight = getValidCropHeightBottom(newHeight);

        setElementWidthHeight($croppingArea, legalWidth, legalHeight);
    }

    function resizeCroppingBottomLeft(deltaX, deltaY) {
        var newWidth = (croppingAreaParams.width = $croppingArea.width() + deltaX);
        var newHeight = (croppingAreaParams.height = $croppingArea.height() - deltaY);

        var newLeft = parseInt($croppingArea.css("left")) - deltaX;
        newLeft = getValidLeftOnResize(newLeft);

        var legalWidth = getValidLeftCropWidth(newWidth);
        var legalHeight = getValidCropHeightBottom(newHeight);

        setElementWidthHeight($croppingArea, legalWidth, legalHeight);
        $cropImg.css("left", angleBorderSize - newLeft);
        $croppingArea.css("left", newLeft);
    }

    function moveCroppingAngles(angleMoveIndex, deltaX, deltaY) {
        var angle1X = 0, angle1Y = 0;
        var angle2X = 0, angle2Y = 0;
        var angle3X = 0, angle3Y = 0;
        var angle4X = 0, angle4Y = 0;

        switch (angleMoveIndex) {
            case 0:
                angle1X = angle4X = deltaX;
                angle1Y = angle2Y = deltaY;
                break;
            case 1:
                angle2X = angle3X = deltaX;
                angle2Y = angle1Y = deltaY;
                break;
            case 2:
                angle3X = angle2X = deltaX;
                angle3Y = angle4Y = deltaY;
                break;
            case 3:
                angle4X = angle1X = deltaX;
                angle4Y = angle3Y = deltaY;
                break;
        }

        (angle1X || angle1Y) && moveTopLeftCroppingAngle(angle1X, angle1Y);
        (angle2X || angle2Y) && moveTopRightCroppingAngle(angle2X, angle2Y);
        (angle3X || angle3Y) && moveCroppingAngle($bottomRightAngle, angle3X, angle3Y);
        (angle4X || angle4Y) && moveBottomLeftCroppingAngle(angle4X, angle4Y);
    }

    function resizeCroppingArea(angleIndex, deltaX, deltaY) {
        switch (angleIndex) {
            case 0:
                resizeCroppingTopLeft(deltaX, deltaY);
                break;
            case 1:
                resizeCroppingTopRight(deltaX, deltaY);
                break;
            case 2:
                resizeCroppingBottomRight(deltaX, deltaY);
                break;
            case 3:
                resizeCroppingBottomLeft(deltaX, deltaY);
                break;
        }
    }

    function init(imageCropComponents) {
        var isMouseDown = false,
            isResizing = false
        ;

        angleBorderSize = imageCropComponents.borderWidth;
        $originImg = imageCropComponents.$originImg;
        $topLeftAngle = imageCropComponents.$topLeftAngle;
        $topRightAngle = imageCropComponents.$topRightAngle;
        $bottomRightAngle = imageCropComponents.$bottomRightAngle;
        $bottomLeftAngle = imageCropComponents.$bottomLeftAngle;
        $croppingArea = imageCropComponents.$croppingArea;
        $imageEditor = imageCropComponents.$imageEditor;
        $cropImg = imageCropComponents.$cropImg;
        imageCoords = $originImg.offset();
        imageCoords.top -= angleBorderSize;
        imageCoords.left -= angleBorderSize;

        var originImageWidth = $originImg.width();
        var originImageHeight = $originImg.height();

        setElementWidthHeight($cropImg, originImageWidth, originImageHeight);

        originImageParams = {
            height: originImageHeight,
            width: originImageWidth
        };

        croppingAreaParams = {
            height: $croppingArea.height(),
            width: $croppingArea.width()
        };

        $croppingArea.mousedown(function (event) {
            (isMouseDown = (event.which === 1)) && setCursor("move");
        });

        angleParams = {
            width: $topLeftAngle.width(),
            height: $topLeftAngle.height()
        };

        var resizeAngle; // top left = 0, top right = 1 and so on...

        function getAngleMouseDownEvent(angleIndex, cursor) {
            return function (event) {
                if (event.which === 1) {
                    isResizing = true;
                    resizeAngle = angleIndex;
                    isMouseDown = true;
                    setCursor(cursor);
                }
            }
        }

        $topLeftAngle.mousedown(getAngleMouseDownEvent(0, "nw-resize"));
        $topRightAngle.mousedown(getAngleMouseDownEvent(1, "ne-resize"));
        $bottomRightAngle.mousedown(getAngleMouseDownEvent(2, "se-resize"));
        $bottomLeftAngle.mousedown(getAngleMouseDownEvent(3, "sw-resize"));

        $imageEditor.mouseup(function () {
            if (event.which === 1) {
                isMouseDown = false;
                isResizing = false;
                setCursor("");
            }
        });

        var angleSize = $topRightAngle.width();

        !function setStartCroppingAngles() {
            setCroppingAnglesTopLeft(angleBorderSize, angleBorderSize);
        }();

        function setCroppingAnglesTopLeft(top, left) {
            setElementTopLeft($topLeftAngle, top - angleBorderSize, left - angleBorderSize);
            setElementTopLeft($topRightAngle, top - angleBorderSize, croppingAreaParams.width + left - angleSize);
            setElementTopLeft($bottomRightAngle, croppingAreaParams.height + top - angleSize, croppingAreaParams.width + left - angleSize);
            setElementTopLeft($bottomLeftAngle, croppingAreaParams.height + top - angleSize, left - angleBorderSize);
        }

        function setCursor(cursorValue) {
            [
                $topLeftAngle,
                $topRightAngle,
                $bottomRightAngle,
                $bottomLeftAngle,
                $croppingArea,
                $imageEditor

            ].forEach(function ($element) {
                $element.css("cursor", cursorValue);
            });
        }

        var prevX, prevY;

        $imageEditor.mousemove(function (event) {
            if (!isMouseDown) {
                prevX = undefined;
                prevY = undefined;
                return;
            }

            var newX = getValidCoordX(event.clientX);
            var newY = getValidCoordY(event.clientY);

            if (prevX === undefined || prevY === undefined) {
                prevX = newX;
                prevY = newY;
                return;
            }

            var deltaX = prevX - newX;
            var deltaY = prevY - newY;

            prevX = newX;
            prevY = newY;

            if (isResizing) {
                moveCroppingAngles(resizeAngle, deltaX, deltaY);
                resizeCroppingArea(resizeAngle, deltaX, deltaY);

            } else {
                var croppingAreaTop = parseInt($croppingArea.css("top"));
                var croppingAreaLeft = parseInt($croppingArea.css("left"));

                var newLeft = croppingAreaLeft - deltaX;
                var newTop = croppingAreaTop - deltaY;

                newLeft = getValidLeftOnMove(newLeft);
                newTop = getValidTop(newTop);

                moveCropArea(newTop, newLeft);
                setCroppingAnglesTopLeft(newTop, newLeft);
            }
        });

        $imageEditor.on("dragstart", function () {
            return false;
        });
    }

    function removeEventListeners($element, eventsArr) {
        eventsArr.forEach(function (event) {
            $element.off(event);
        });
    }

    function destroy() {
        moveCropArea(0, 0);

        [
            $cropImg,
            $originImg,
            $topLeftAngle,
            $topRightAngle,
            $bottomRightAngle,
            $bottomLeftAngle,
            $croppingArea
        ].forEach(function ($element) {
            $element.removeAttr("style");
        });

        removeEventListeners($croppingArea, ["mousedown", "mouseup"]);
        removeEventListeners($bottomRightAngle, ["mousedown", "mouseup"]);
        removeEventListeners($imageEditor, ["mousemove", "mouseup", "dragstart"]);
    }

    return {
        initImageCropper: init,
        destroyImageCropper: destroy
    };
});
