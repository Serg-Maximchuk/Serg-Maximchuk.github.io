Imcms.define("imcms-pop-up", ["jquery"], function ($) {
    function initFormsAndTabs($popup, windowId) {
        $popup.find(".imcms-form").each(function () {
            var $form = $(this);

            if ($form.attr("data-window-id") === windowId) {

                $form.css({"display": "block"})
                    .parents(".imcms-pop-up-modal")
                    .find(".imcms-tab")
                    .each(function () {
                        var $tab = $(this),
                            isCurrentWidowId = ($tab.attr("data-window-id") === windowId)
                        ;
                        $tab.toggleClass("imcms-tab--active", isCurrentWidowId);
                    });
            } else {
                $form.css({"display": "none"});
            }
        });
    }

    function openPopUp($popUp) {
        var $tab = $popUp.find(".imcms-tab"),
            $modal = $("<div>", {
                "class": "modal"
            }).css({
                "position": "absolute",
                "top": 0,
                "left": 0,
                "z-index": 50,
                "display": "block",
                "width": "100vw",
                "height": "100vh",
                "background-color": "rgba(42, 42, 42, 0.8)"
            });

        $modal.appendTo("body");
        initFormsAndTabs($popUp, "1");
        $tab.click(showHideContent);
    }

    function showHideContent() {
        var $tab = $(this),
            windowId = $tab.attr("data-window-id"),
            $popUp = $tab.parents(".imcms-pop-up-modal")
        ;

        initFormsAndTabs($popUp, windowId);
    }

    function closePopUp() {
        $(this).parents(".imcms-pop-up-modal").css({"display": "none"});
        $(".modal").css({"display": "none"});
    }

    return {
        init: function (currentPopUp) {
            openPopUp(currentPopUp);
            currentPopUp && currentPopUp.find(".imcms-button--negative").click(closePopUp)
        }
    };
});
