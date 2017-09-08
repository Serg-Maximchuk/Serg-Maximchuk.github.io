/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.09.17
 */
Imcms.define("imcms-image-cropper", [], function () {

    var $croppingArea, $bottomRightAngle, $imageEditor, $cropImg, originImageParams, croppingAreaParams, borderWidth,
        angleParams;

    function moveCropImage(newTop, newLeft) {
        var cropImgTop = -newTop + 2,
            cropImgLeft = -newLeft + 2
        ;

        setElementTopLeft($cropImg, cropImgTop, cropImgLeft);
    }

    function setElementTopLeft($element, newTop, newLeft) {
        $element.css({
            top: newTop,
            left: newLeft
        });
    }

    function getMaxLegalTop() {
        return originImageParams.height - croppingAreaParams.height + 2;
    }

    function getMaxLegalLeft() {
        return originImageParams.width - croppingAreaParams.width + 2;
    }

    function getValidLeft(left) {
        return Math.max(Math.min(left, getMaxLegalLeft()), 2);
    }

    function getValidTop(top) {
        return Math.max(Math.min(top, getMaxLegalTop()), 2);
    }

    function moveCropArea(top, left) {
        var legalLeft = getValidLeft(left);
        var legalTop = getValidTop(top);

        setElementTopLeft($croppingArea, legalTop, legalLeft);
        moveCropImage(legalTop, legalLeft);
    }

    function getMaxLegalAngleTop() {
        return originImageParams.height - angleParams.height + 2;
    }

    function getMaxLegalAngleLeft() {
        return originImageParams.width - angleParams.width + 2;
    }

    function getValidAngleTop(top) {
        return Math.min(Math.max(top, 0), getMaxLegalAngleTop());
    }

    function getValidAngleLeft(left) {
        return Math.min(Math.max(left, 0), getMaxLegalAngleLeft());
    }

    function moveCroppingAngle($angle, deltaX, deltaY) {
        var newTop = parseInt($angle.css("top")) - deltaY;
        var newLeft = parseInt($angle.css("left")) - deltaX;

        var legalTop = getValidAngleTop(newTop);
        var legalLeft = getValidAngleLeft(newLeft);

        setElementTopLeft($angle, legalTop, legalLeft);
    }

    function getMaxLegalCropWidth() {
        return originImageParams.width - parseInt($croppingArea.css("left")) + 2;
    }

    function getMaxLegalCropHeight() {
        return originImageParams.height - parseInt($croppingArea.css("top")) + 2;
    }

    function getValidCropWidth(width) {
        return Math.min(Math.max(width, 2), getMaxLegalCropWidth());
    }

    function getValidCropHeight(height) {
        return Math.min(Math.max(height, 2), getMaxLegalCropHeight());
    }

    function resizeCroppingBottomRight(deltaX, deltaY) {
        var newWidth = (croppingAreaParams.width = $croppingArea.width() - deltaX);
        var newHeight = (croppingAreaParams.height = $croppingArea.height() - deltaY);

        var legalWidth = getValidCropWidth(newWidth);
        var legalHeight = getValidCropHeight(newHeight);

        $croppingArea.css({
            width: legalWidth,
            height: legalHeight
        });
    }

    function init(imageCropComponents) {
        var $originImg = imageCropComponents.$originImg,
            $topLeftAngle = imageCropComponents.$topLeftAngle,
            $topRightAngle = imageCropComponents.$topRightAngle,
            $bottomLeftAngle = imageCropComponents.$bottomLeftAngle,
            borderWidth = imageCropComponents.borderWidth,
            isMouseDown = false,
            isResizing = false
        ;

        $croppingArea = imageCropComponents.$croppingArea;
        $bottomRightAngle = imageCropComponents.$bottomRightAngle;
        $imageEditor = imageCropComponents.$imageEditor;
        $cropImg = imageCropComponents.$cropImg;

        $cropImg.css({
            "width": $originImg.css("width"),
            "height": $originImg.css("height")
        });

        originImageParams = {
            height: parseFloat($originImg.height()),
            width: parseFloat($originImg.width())
        };

        croppingAreaParams = {
            height: parseFloat($croppingArea.height()),
            width: parseFloat($croppingArea.width())
        };

        $croppingArea.mousedown(function (event) {
            isMouseDown = event.which === 1;
        });

        $croppingArea.mouseup(function () {
            if (event.which === 1) {
                isMouseDown = false;
            }
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

        $bottomRightAngle.mouseup(function () {
            if (event.which === 1) {
                isResizing = false;
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
            setCroppingAnglesTopLeft(2, 2);
        }();

        function setCroppingAnglesTopLeft(top, left) {
            setElementTopLeft($topLeftAngle, top - borderWidth, left - borderWidth);
            setElementTopLeft($topRightAngle, top - borderWidth, croppingAreaParams.width + left - angleSize);
            setElementTopLeft($bottomRightAngle, croppingAreaParams.height + top - angleSize, croppingAreaParams.width + left - angleSize);
            setElementTopLeft($bottomLeftAngle, croppingAreaParams.height + top - angleSize, left - borderWidth);
        }

        var imageCoords = $originImg.offset();
        var prevX, prevY;

        $imageEditor.mousemove(function (event) {
            if (!isMouseDown) {
                prevX = undefined;
                prevY = undefined;
                return;
            }

            var newX = Math.min(event.clientX, imageCoords.left + originImageParams.width);
            var newY = Math.min(event.clientY, imageCoords.top + originImageParams.height);

            newX = Math.max(newX, imageCoords.left);
            newY = Math.max(newY, imageCoords.top);

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
                var croppingAreaTop = parseInt($croppingArea.position().top);
                var croppingAreaLeft = parseInt($croppingArea.position().left);

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
        moveCropArea(2, 2);

        removeEventListeners($croppingArea, ["mousedown", "mouseup"]);
        $croppingArea = null;

        removeEventListeners($bottomRightAngle, ["mousedown", "mouseup"]);
        $bottomRightAngle = null;

        removeEventListeners($imageEditor, ["mousemove", "mouseup", "dragstart"]);
        $imageEditor = null;
    }

    return {
        initImageCropper: init,
        destroyImageCropper: destroy
    };
});
