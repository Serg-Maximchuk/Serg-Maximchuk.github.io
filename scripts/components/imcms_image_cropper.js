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

    function Limit(min, shift, max) {
        return {
            forValue: function (value) {
                var maxValue = max - shift + angleBorderSize;
                return Math.min(Math.max(value, min), maxValue);
            }
        }
    }

    function getValidCoordX(coordX) {
        return Limit(imageCoords.left, -imageCoords.left, originImageParams.width).forValue(coordX);
    }

    function getValidCoordY(coordY) {
        return Limit(imageCoords.left, -imageCoords.top, originImageParams.height).forValue(coordY);
    }

    function getValidLeft(left) {
        return Limit(angleBorderSize, croppingAreaParams.width, originImageParams.width).forValue(left);
    }

    function getValidTop(top) {
        return Limit(angleBorderSize, croppingAreaParams.height, originImageParams.height).forValue(top);
    }

    function getValidAngleTop(top) {
        return Limit(0, angleParams.height, originImageParams.height).forValue(top);
    }

    function getValidAngleLeft(left) {
        return Limit(0, angleParams.width, originImageParams.width).forValue(left);
    }

    function getValidCropWidth(width) {
        return Limit(angleBorderSize, parseInt($croppingArea.css("left")), originImageParams.width).forValue(width);
    }

    function getValidCropHeight(height) {
        return Limit(angleBorderSize, parseInt($croppingArea.css("top")), originImageParams.height).forValue(height);
    }

    function moveCropArea(top, left) {
        setElementTopLeft($croppingArea, top, left);
        moveCropImage(top, left);
    }

    function moveCroppingAngle($angle, deltaX, deltaY) {
        var newTop = parseInt($angle.css("top")) - deltaY;
        var newLeft = parseInt($angle.css("left")) - deltaX;

        var legalTop = getValidAngleTop(newTop);
        var legalLeft = getValidAngleLeft(newLeft);

        setElementTopLeft($angle, legalTop, legalLeft);
    }

    function resizeCroppingBottomRight(deltaX, deltaY) {
        var newWidth = (croppingAreaParams.width = $croppingArea.width() - deltaX);
        var newHeight = (croppingAreaParams.height = $croppingArea.height() - deltaY);

        var legalWidth = getValidCropWidth(newWidth);
        var legalHeight = getValidCropHeight(newHeight);

        setElementWidthHeight($croppingArea, legalWidth, legalHeight);
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
            isMouseDown = event.which === 1;
        });

        angleParams = {
            width: $topLeftAngle.width(),
            height: $topLeftAngle.height()
        };

        function moveCroppingAngles(angleIndex, deltaX, deltaY) {
            var angle1X = 0, angle1Y = 0;
            var angle2X = 0, angle2Y = 0;
            var angle3X = 0, angle3Y = 0;
            var angle4X = 0, angle4Y = 0;

            switch (angleIndex) {
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

            moveCroppingAngle($topLeftAngle, angle1X, angle1Y);
            moveCroppingAngle($topRightAngle, angle2X, angle2Y);
            moveCroppingAngle($bottomRightAngle, angle3X, angle3Y);
            moveCroppingAngle($bottomLeftAngle, angle4X, angle4Y);
        }

        var resizeAngle; // top left = 0, top right = 1 and so on...

        $bottomRightAngle.mousedown(function (event) {
            if (event.which === 1) {
                isResizing = true;
                resizeAngle = 2;
                isMouseDown = true;
            }
        });

        $imageEditor.mouseup(function () {
            if (event.which === 1) {
                isMouseDown = false;
                isResizing = false;
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

        var prevX, prevY;

        $imageEditor.mousemove(function (event) {
            if (!isMouseDown) {
                prevX = undefined;
                prevY = undefined;
                return;
            }

            var newX = getValidCoordX(event.clientX);
            var newY = getValidCoordY(event.clientY);

            if (!prevX || !prevY) {
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
                resizeCroppingBottomRight(deltaX, deltaY);

            } else {
                var croppingAreaTop = parseInt($croppingArea.css("top"));
                var croppingAreaLeft = parseInt($croppingArea.css("left"));

                var newLeft = croppingAreaLeft - deltaX;
                var newTop = croppingAreaTop - deltaY;

                newLeft = getValidLeft(newLeft);
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