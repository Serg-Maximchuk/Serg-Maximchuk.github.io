Imcms.define("imcms-admin-panel", ["imcms-pop-up", "jquery"], function (imcmsPopUp, $) {

    function setShowPanelRule() {
        $(document).mousemove(function (event) {
            if (event.pageY >= 0 && event.pageY <= 15) { // fixme: what is 15 ???
                showPanel();
            }
        });
    }

    function setHidePanelRule() {
        $(document).click(function (event) {
            if ($(event.target).closest(".imcms-admin").length) {
                return;
            }

            event.stopPropagation();
            hidePanel();
        });
    }

    function hidePanel() {
        setAdminPanelTop(-90);
    }

    function showPanel() {
        setAdminPanelTop(0);
    }

    function setAdminPanelTop(px) {
        $(".imcms-admin").css({"top": "" + px + "px"});
    }

    function showPageInfo(e) {
        e.preventDefault();

        var $popup = $(".imcms-pop-up-modal[data-menu=pageInfo]").css({"display": "block"});

        imcmsPopUp.init($popup);
    }

    return {
        init: function () {
            setShowPanelRule();
            setHidePanelRule();
            $(".imcms-admin").find(".imcms-menu__item--page-info").click(showPageInfo);
        }
    }
});
