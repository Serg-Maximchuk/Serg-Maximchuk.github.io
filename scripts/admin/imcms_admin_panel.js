Imcms.define("imcms-admin-panel", ["jquery"], function ($) {

    function showPanel() {
        $(document).mousemove(function (event) {
            if (event.pageY >= 0 && event.pageY <= 15) {
                $(".imcms-admin").css({"top": 0});
            }
        });
    }

    function hidePanel(event) {
        if (!$(event.target).closest(".imcms-admin").length) {
            $(".imcms-admin").css({"top": "-90px"});
            event.stopPropagation();
        }
    }

    function menuEvent() {
        var $menuItem = $(this),
            currentPopUp = undefined
        ;

        if ($menuItem.hasClass("imcms-menu__item--page-info")) {
            $(".imcms-pop-up-modal").each(function () {
                if ($(this).attr("data-menu") === "pageInfo") {
                    $(this).css({"display": "block"});
                    currentPopUp = $(this)
                }
            });
        }
        Imcms.PopUp.init(currentPopUp);
    }

    return {
        init: function () {
            showPanel();
            $(document).click(hidePanel);
            $(".imcms-admin").find(".imcms-menu__item").click(menuEvent);
        }
    }
});
