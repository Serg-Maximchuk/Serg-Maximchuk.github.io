Imcms.define("imcms-buttons", ["jquery"], function ($) {
    var IMCMS_FLAG_ACTIVE = "imcms-flag--active",
        IMCMS_FLAG_ENG = "imcms-flag--en",
        IMCMS_FLAG_SWE = "imcms-flag--swe",
        IMCMS_FLAG = "imcms-flag"
    ;

    function changeNeighborFlag($btn) {
        var neighborFlag = ($btn.next().length !== 0) ? $btn.next() : $btn.prev();

        if (neighborFlag.hasClass(IMCMS_FLAG_ENG)) {
            neighborFlag.toggleClass(IMCMS_FLAG_ACTIVE);

        } else if (neighborFlag.hasClass(IMCMS_FLAG_SWE)) {
            neighborFlag.removeClass(IMCMS_FLAG_ACTIVE);

        } else {
            neighborFlag.addClass(IMCMS_FLAG_ACTIVE);
        }
    }

    function flagBtn(event) {
        var $btn = $(this);

        if (!$btn.hasClass(IMCMS_FLAG)) {
            return;
        }

        if ($btn.hasClass(IMCMS_FLAG_ACTIVE)) {
            event.preventDefault();

        } else {
            $btn.addClass(IMCMS_FLAG_ACTIVE);
            changeNeighborFlag($btn);
        }
    }

    return {
        init: function () {
            $(".imcms-flags__flag").click(flagBtn);
            $("#goHome").click(function () {
                window.location.href = "./index.html";
            });
        }
    };
});

//todo: add logic for other buttons according to their specifics
