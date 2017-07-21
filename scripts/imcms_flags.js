Imcms.define("imcms-flags", ["jquery"], function ($) {
    var IMCMS_FLAG_ACTIVE = "imcms-flag--active",
        IMCMS_FLAG = "imcms-flag"
    ;

    function changeNeighborFlag($btn) {
        var neighborFlag = ($btn.next("." + IMCMS_FLAG).length !== 0)
            ? $btn.next("." + IMCMS_FLAG)
            : $btn.prev("." + IMCMS_FLAG);

        neighborFlag.toggleClass(IMCMS_FLAG_ACTIVE);
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
            $("." + IMCMS_FLAG).click(flagBtn);
        }
    };
});
