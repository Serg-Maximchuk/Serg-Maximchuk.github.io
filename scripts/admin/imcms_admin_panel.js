Imcms.define("imcms-admin-panel", ["imcms-pop-up", "jquery"], function (imcmsPopUp, $) {

    function logNotImplementedFeature(feature) {
        console.log("%c Not implemented feature: " + feature, "color: red;");
    }

    function setShowPanelRule() {
        $(document).mousemove(function (event) {
            if (event.pageY >= 0 && event.pageY <= 15) { // fixme: what is 15 ??? why 15?
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

    function showPageInfo() {
        var $popup = $(".imcms-pop-up-modal[data-menu=pageInfo]").css({"display": "block"});
        imcmsPopUp.init($popup);
    }

    var viewModel = {
        adminPanelElements: [
            {
                name: "flags",
                selector: ".imcms-flags__flag.imcms-flag",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("flags click");
                }
            },
            {
                name: "public view",
                selector: ".imcms-menu__item.imcms-menu__item--public",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("public view click");
                }
            },
            {
                name: "edit",
                selector: ".imcms-menu__item.imcms-menu__item--edit",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("edit click");
                }
            },
            {
                name: "preview",
                selector: ".imcms-menu__item.imcms-menu__item--preview",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("preview click");
                }
            },
            {
                name: "publish offline version",
                selector: ".imcms-menu__item.imcms-menu__item--publish-of",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("publish offline version click");
                }
            },
            {
                name: "page info",
                selector: ".imcms-menu__item.imcms-menu__item--page-info",
                onClick: function (e) {
                    e.preventDefault();
                    showPageInfo();
                }
            },
            {
                name: "document editor",
                selector: ".imcms-menu__item.imcms-menu__item--document",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("document editor click");
                }
            },
            {
                name: "admin",
                selector: ".imcms-menu__item.imcms-menu__item--admin",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("admin click");
                }
            },
            {
                name: "admin",
                selector: ".imcms-menu__item.imcms-menu__item--logout .imcms-button",
                onClick: function (e) {
                    e.preventDefault();
                    logNotImplementedFeature("logout click");
                }
            }
        ]
    };

    function setPanelClicks($panel) {
        viewModel.adminPanelElements.forEach(function (panelData) {
            $panel.find(panelData.selector).click(panelData.onClick);
        });
    }

    return {
        init: function () {
            setShowPanelRule();
            setHidePanelRule();
            setPanelClicks($(".imcms-admin-panel"));
        }
    }
});
