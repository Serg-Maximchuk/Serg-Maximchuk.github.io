/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    ["imcms-bem-builder", "imcms-components-builder", "jquery"],
    function (BEM, componentsBuilder, $) {
        var pageInfoBEM = new BEM({
            block: "imcms-pop-up-modal",
            elements: {
                "head": "imcms-head",
                "left-side": "imcms-left-side",
                "right-side": "imcms-right-side",
                "footer": "imcms-footer"
            }
        });

        function buildPageInfoHead() {
            var pageInfoHeadBEM = new BEM({
                block: "imcms-head",
                elements: {
                    "title": "imcms-title"
                }
            });

            var $title = pageInfoHeadBEM.buildElement("title", "<div>", {
                text: "document 1001" // todo: receive correct doc id
            });

            return pageInfoHeadBEM.buildBlock("<div>", [
                {"title": $title}
            ]);
        }

        function showPanel(index) {
            $(".imcms-form[data-window-id=" + index + "]").css({"display": "block"});
        }

        function buildPageInfoTabs() {
            function getOnTabClick(index) {
                return function () {
                    $("[data-menu=pageInfo]").find(".imcms-title--active").removeClass("imcms-title--active");
                    $(this).addClass("imcms-title--active");
                    $(".imcms-form").css("display", "none");
                    showPanel(index);
                }
            }

            var pageInfoLeftSideTabsBEM = new BEM({
                block: "imcms-left-side",
                elements: {
                    "tabs": "imcms-tabs"
                }
            });

            var pageInfoTabsBEM = new BEM({
                block: "imcms-tabs",
                elements: {
                    "tab": "imcms-title"
                }
            });

            var $tabs = [

                "appearance",
                "life cycle",
                "keywords",
                "categories",
                "access",
                "permissions",
                "templates",
                "status"

            ].map(function (tabName, index) {
                return pageInfoTabsBEM.buildElement("tab", "<div>",
                    {
                        "data-window-id": index,
                        text: tabName,
                        click: getOnTabClick(index)
                    },
                    (index === 0 ? ["active"] : [])
                );
            });

            var $tabsContainer = pageInfoTabsBEM.buildBlock("<div>", $tabs, {}, "tab");

            return pageInfoLeftSideTabsBEM.buildBlock("<div>", [{"tabs": $tabsContainer}]);
        }

        function buildPageInfoPanels() {
            return pageInfoBEM.buildElement("right-side", "<div>");
            // todo: finish implementing
        }

        function buildPageInfoFooter() {
            function closePageInfo() {
                $(this).parents(".imcms-pop-up-modal").css({"display": "none"});
                $(".modal").css({"display": "none"});
            }

            var $saveBtn = componentsBuilder.buttons.positiveButton({
                text: "ok",
                click: function () {
                    // todo: save things
                    closePageInfo.call(this);
                }
            });

            var $cancelBtn = componentsBuilder.buttons.negativeButton({
                text: "cancel",
                click: function () {
                    // todo: cancel things
                    closePageInfo.call(this);
                }
            });

            var $saveAndPublishBtn = componentsBuilder.buttons.saveButton({
                text: "save and publish this version",
                click: function () {
                    // todo: save and publish
                    closePageInfo.call(this);
                }
            });

            return pageInfoBEM.buildElement("footer", "<div>").append($saveAndPublishBtn, $cancelBtn, $saveBtn);
        }

        return {
            build: function () {
                var $head = buildPageInfoHead(),
                    $tabs = buildPageInfoTabs(),
                    $panels = buildPageInfoPanels(),
                    $footer = buildPageInfoFooter();

                return pageInfoBEM.buildBlock("<div>", [
                    {"head": $head},
                    {"left-side": $tabs},
                    {"right-side": $panels},
                    {"footer": $footer}
                ], {
                    "data-menu": "pageInfo"
                });
            }
        }
    }
);
