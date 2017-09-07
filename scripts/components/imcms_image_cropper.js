/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.09.17
 */
Imcms.define("imcms-image-cropper", ["jquery"], function ($) {
    function init(imageCropComponents) {
        var $imageEditor = imageCropComponents.$imageEditor,
            $croppingArea = imageCropComponents.$croppingArea,
            $cropImg = imageCropComponents.$cropImg,
            $originImg = imageCropComponents.$originImg,
            $topLeftAngle = imageCropComponents.$topLeftAngle,
            $topRightAngle = imageCropComponents.$topRightAngle,
            $bottomRightAngle = imageCropComponents.$bottomRightAngle,
            $bottomLeftAngle = imageCropComponents.$bottomLeftAngle,
            isMouseDown = false,
            isResizing = false
        ;

        var BORDER_WIDTH = parseInt($topLeftAngle.css("border-width")) || 0;

        $cropImg.css({
            "width": $originImg.css("width"),
            "height": $originImg.css("height")
        });

        function positioningCroppImg(newTop, newLeft) {
            var cropImgTop = -newTop,
                cropImgLeft = -newLeft
            ;
            $cropImg.css({
                "top": cropImgTop + "px",
                "left": cropImgLeft + "px"
            });
        }

        function positioningSquares(square, newTop, newLeft) {
            square.css({
                "top": newTop,
                "left": newLeft
            });
        }

        var originImageParams = {
            height: parseFloat($originImg.css("height")),
            width: parseFloat($originImg.css("width"))
        };

        var croppingAreaParams = {
            height: parseFloat($croppingArea.css("height")),
            width: parseFloat($croppingArea.css("width"))
        };

        function getMaxLegalTop() {
            return originImageParams.height - croppingAreaParams.height;
        }

        function getMaxLegalLeft() {
            return originImageParams.width - croppingAreaParams.width;
        }

        function getValidLeft(left) {
            return Math.min(Math.max(left, 0), getMaxLegalLeft());
        }

        function getValidTop(top) {
            return Math.min(Math.max(top, 0), getMaxLegalTop());
        }

        function moveCropArea(top, left) {
            var legalLeft = getValidLeft(left);
            var legalTop = getValidTop(top);

            $croppingArea.css({"left": legalLeft});
            $croppingArea.css({"top": legalTop});

            positioningCroppImg(legalTop, legalLeft);
        }

        $croppingArea.mousedown(function (event) {
            isMouseDown = event.which === 1;
        });

        $croppingArea.mouseup(function () {
            if (event.which === 1) {
                isMouseDown = false;
            }
        });

        var angleParams = {
            width: $topLeftAngle.width(),
            height: $topLeftAngle.height()
        };

        function getMaxLegalAngleTop() {
            return originImageParams.height - angleParams.height;
        }

        function getMaxLegalAngleLeft() {
            return originImageParams.width - angleParams.width - BORDER_WIDTH;
        }

        function getValidAngleTop(top) {
            return Math.min(Math.max(top, 0), getMaxLegalAngleTop());
        }

        function getValidAngleLeft(left) {
            return Math.min(Math.max(left, 0), getMaxLegalAngleLeft());
        }

        function moveCroppingAngle(angle, deltaX, deltaY) {
            var newTop = parseInt(angle.css("top")) - deltaY;
            var newLeft = parseInt(angle.css("left")) - deltaX;

            var legalTop = getValidAngleTop(newTop);
            var legalLeft = getValidAngleLeft(newLeft);

            angle.css({
                top: legalTop,
                left: legalLeft
            });
        }

        function moveCroppingAngles2(angleIndex, deltaX, deltaY) {
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

        $(document).mouseup(function () {
            if (event.which === 1) {
                isMouseDown = false;
                isResizing = false;
            }
        });

        (function setStartCroppingAngles() {
            moveCroppingAngles(0, 0);
        })();

        var angleSize = $topRightAngle.width();

        function moveCroppingAngles(top, left) {
            positioningSquares($topLeftAngle, top - BORDER_WIDTH, left - BORDER_WIDTH);
            positioningSquares($topRightAngle, top - BORDER_WIDTH, croppingAreaParams.width + left - angleSize);
            positioningSquares($bottomRightAngle, croppingAreaParams.height + top - angleSize, croppingAreaParams.width + left - angleSize);
            positioningSquares($bottomLeftAngle, croppingAreaParams.height + top - angleSize, left - BORDER_WIDTH);
        }

        function getMaxLegalCropWidth() {
            return originImageParams.width - parseInt($croppingArea.css("left"));
        }

        function getMaxLegalCropHeight() {
            return originImageParams.height - parseInt($croppingArea.css("top"));
        }

        function getValidCropWidth(width) {
            return Math.min(Math.max(width, 0), getMaxLegalCropWidth());
        }

        function getValidCropHeight(height) {
            return Math.min(Math.max(height, 0), getMaxLegalCropHeight());
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

        var imageCoords = $originImg.offset();
        var prevX, prevY;

        $($imageEditor).mousemove(function (event) {
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
                moveCroppingAngles2(resizeAngle, deltaX, deltaY);
                resizeCroppingBottomRight(deltaX, deltaY);

            } else {
                var croppingAreaTop = parseInt($croppingArea.position().top);
                var croppingAreaLeft = parseInt($croppingArea.position().left);

                var newLeft = croppingAreaLeft - deltaX;
                var newTop = croppingAreaTop - deltaY;

                newLeft = getValidLeft(newLeft);
                newTop = getValidTop(newTop);

                moveCropArea(newTop, newLeft);
                moveCroppingAngles(newTop, newLeft);
            }
        });

        $($imageEditor).on("dragstart", function () {
            return false;
        });
    }

    return {
        initImageCropper: init
    };
});
