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

        function buildPageInfoTabs() {
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
                        text: tabName
                    },
                    (index === 0 ? ["active"] : [])
                );
            });

            return pageInfoTabsBEM.buildBlock("<div>", $tabs, {}, "tab");
        }

        function buildPageInfoPanels() {
            return $("<div>"); // todo: finish implementing
        }

        function buildPageInfoFooter() {
            return $("<div>"); // todo: finish implementing
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
