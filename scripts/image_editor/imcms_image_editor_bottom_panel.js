Imcms.define("imcms-image-editor-bottom-panel", ["jquery"], function ($) {

    var newAngle = 0;

    function zoom(zoomValue) {
        var editableImage = $("#editableImage"),
            newHeight = editableImage.height() + zoomValue,
            newWidth = editableImage.width() + zoomValue,
            backgroundSizeVal = newWidth + "px " + newHeight + "px"
        ;

        editableImage.animate({
            "width": newWidth + "px",
            "height": newHeight + "px"
        }, 200).css({"background-size": backgroundSizeVal});

        $("#imageAreaLayout").animate({
            "width": newWidth + "px",
            "height": newHeight + "px"
        }, 200);

        $("#cropArea").css({"background-size": backgroundSizeVal});
    }

    function zoomPlus() {
        zoom(50);
    }

    function zoomMinus() {
        zoom(-50);
    }

    function zoomContain() {
        var imageArea = $("#imageArea"),
            newHeight = imageArea.height(),
            newWidth = imageArea.width(),
            backgroundSizeVal = newWidth + "px " + "auto"
        ;

        $("#editableImage").animate({
            "width": newWidth + "px",
            "height": newHeight + "px"
        }, 200).css({"background-size": backgroundSizeVal});

        $("#imageAreaLayout").animate({
            "width": newWidth + "px",
            "height": newHeight + "px"
        }, 200);

        $("#cropArea").css({"background-size": backgroundSizeVal});
    }

    function rotate(angle) {
        newAngle += angle;
        $("#editableImage").css({"transform": "rotate(" + newAngle + "deg)"});
        $("#cropArea").css({"transform": "rotate(" + newAngle + "deg)"});
    }

    function rotateLeft() {
        rotate(-90);
        //todo right logic for rotate -90deg
    }

    function rotateRight() {
        rotate(90);
        //todo right logic for rotate +90deg
    }

    return {
        init: function () {
            $("#editImageZoomPlusBtn").click(zoomPlus);
            $("#editImageZoomMinusBtn").click(zoomMinus);
            $("#editImageZoomContainBtn").click(zoomContain);
            $("#editImageRotateLeftBtn").click(rotateLeft);
            $("#editImageRotateRightBtn").click(rotateRight);
        }
    };
});
