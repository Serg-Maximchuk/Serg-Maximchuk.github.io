Imcms.define("imcms-image-editor-crop", ["jquery"], function ($) {
    function cropImg() {
        var cropArea = $("#cropArea"),
            positionTop = cropArea.css("top"),
            positionLeft = cropArea.css("left")
        ;

        $(".ui-icon-gripsmall-diagonal-se").css({
            "bottom": "-5px",
            "right": "-5px",
            "opacity": 0
        });

        cropArea.draggable({
            containment: "parent",
            drag: function () {
                positionTop = cropArea.css("top");
                positionLeft = cropArea.css("left");
                cropArea.css({
                    "background-position-x": "-" + positionLeft,
                    "background-position-y": "-" + positionTop
                });
            }
        });

        cropArea.resizable({
            handles: "all",
            containment: "parent",
            resize: function (event, ui) {
                cropArea.css({
                    "background-position-x": "-" + positionLeft,
                    "background-position-y": "-" + positionTop
                });
            }
        });
    }

    return {
        init: function () {
            $("#cropArea").mouseover(cropImg);
        }
    };
});
