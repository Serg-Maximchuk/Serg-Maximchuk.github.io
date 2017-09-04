/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-documents-rest-api",
        "imcms-page-info-tabs-builder", "jquery"
    ],
    function (BEM, components, documentsRestApi, pageInfoTabs, $) {

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
                }),

                $title = pageInfoHeadBEM.buildElement("title", "<div>", {id: "page-info-title"});

            return pageInfoHeadBEM.buildBlock("<div>", [{"title": $title}]);
        }

        function showPanel(index) {
            $(".imcms-form[data-window-id=" + index + "]").css({"display": "block"});
        }

        function buildPageInfoTabs() {
            function getOnTabClick(index) {
                return function () {
                    $pageInfo.find(".imcms-title--active").removeClass("imcms-title--active");
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

            var $tabs = pageInfoTabs.data.map(function (tabData, index) {
                return pageInfoTabsBEM.buildElement("tab", "<div>",
                    {
                        "data-window-id": index,
                        text: tabData.name,
                        click: getOnTabClick(index)
                    },
                    (index === 0 ? ["active"] : [])
                );
            });

            var $tabsContainer = pageInfoTabsBEM.buildBlock("<div>", $tabs, {}, "tab");

            return pageInfoLeftSideTabsBEM.buildBlock("<div>", [{"tabs": $tabsContainer}]);
        }

        function buildPageInfoPanels(docId) {
            var $forms = pageInfoTabs.data.map(function (tabData, index) {
                return tabData.buildTab(index, docId).css("display", (index === 0 ? "block" : "none"));
            });

            return pageInfoBEM.buildElement("right-side", "<div>").append($forms);
        }

        function buildPageInfoFooter() {
            function closePageInfo() {
                $pageInfo.css({"display": "none"});
                $shadow.css({"display": "none"});
                clearPageInfoData();
            }

            var $saveBtn = components.buttons.positiveButton({
                text: "ok",
                click: function () {
                    // todo: save things
                    closePageInfo.call(this);
                }
            });

            var $cancelBtn = components.buttons.negativeButton({
                text: "cancel",
                click: function () {
                    // todo: cancel things
                    closePageInfo.call(this);
                }
            });

            var $saveAndPublishBtn = components.buttons.saveButton({
                text: "save and publish this version",
                click: function () {
                    // todo: save and publish
                    closePageInfo.call(this);
                }
            });

            return pageInfoBEM.buildElement("footer", "<div>").append($saveAndPublishBtn, $cancelBtn, $saveBtn);
        }

        function buildShadow() {
            var $modal = $(".imcms-modal-layout");

            if ($modal.length) {
                $modal.css("display", "block");
                return $modal;
            }

            return $("<div>", {"class": "imcms-modal-layout"}).appendTo("body");
        }

        var $pageInfo;
        var $shadow;

        function buildPageInfo(docId) {
            var $head = buildPageInfoHead(),
                $tabs = buildPageInfoTabs(),
                $panels = buildPageInfoPanels(docId),
                $footer = buildPageInfoFooter();

            return pageInfoBEM.buildBlock("<div>", [
                    {"head": $head},
                    {"left-side": $tabs},
                    {"right-side": $panels},
                    {"footer": $footer}
                ],
                {"data-menu": "pageInfo"}
            );
        }

        function loadPageInfoDataFromDocumentBy(docId) {
            documentsRestApi.read(docId)
                .done(function (document) {
                    $("#page-info-title").text("document " + document.id);
                    pageInfoTabs.data.forEach(function (tab) {
                        tab.fillTabDataFromDocument(document);
                    });
                });
        }

        function clearPageInfoData() {
            pageInfoTabs.data.forEach(function (tab) {
                tab.clearTabData();
            });
        }

        return {
            build: function (docId) {
                $shadow = buildShadow();

                if (!$pageInfo) {
                    $pageInfo = buildPageInfo(docId).appendTo("body");
                }

                $pageInfo.css({"display": "block"});

                docId && loadPageInfoDataFromDocumentBy(docId);
            }
        }
    }
);
