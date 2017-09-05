/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-documents-rest-api", "imcms-window-builder",
        "imcms-page-info-tabs-builder", "jquery"
    ],
    function (BEM, components, documentsRestApi, WindowBuilder, pageInfoTabs, $) {

        var panels;

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
            panels.forEach(function ($panel, number) {
                $panel.css({"display": (index === number) ? "block" : "none"});
            });
        }

        function buildPageInfoTabs() {
            function getOnTabClick(index) {
                return function () {
                    $tabsContainer.find(".imcms-title--active").removeClass("imcms-title--active");
                    $(this).addClass("imcms-title--active");
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
            panels = pageInfoTabs.data.map(function (tabData, index) {
                return tabData.buildTab(index, docId).css("display", (index === 0 ? "block" : "none"));
            });

            return pageInfoBEM.buildElement("right-side", "<div>").append(panels);
        }

        function buildPageInfoFooter() {
            function closePageInfo() {
                pageInfoWindowBuilder.closeWindow();
                shadowBuilder.closeWindow();
            }

            function saveAndClose() {
                // todo: save things
                closePageInfo();
            }

            function saveAndPublish() {
                // todo: save and publish
                closePageInfo();
            }

            var $saveBtn = components.buttons.positiveButton({
                text: "ok",
                click: saveAndClose
            });

            var $cancelBtn = components.buttons.negativeButton({
                text: "cancel",
                click: closePageInfo
            });

            var $saveAndPublishBtn = components.buttons.saveButton({
                text: "save and publish this version",
                click: saveAndPublish
            });

            return pageInfoBEM.buildElement("footer", "<div>").append($saveAndPublishBtn, $cancelBtn, $saveBtn);
        }

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

        function loadData(docId) {
            docId && loadPageInfoDataFromDocumentBy(docId);
        }

        var shadowBuilder = new WindowBuilder({
            factory: function () {
                return $("<div>", {"class": "imcms-modal-layout"});
            }
        });

        var pageInfoWindowBuilder = new WindowBuilder({
            factory: buildPageInfo,
            loadDataStrategy: loadData,
            clearDataStrategy: clearPageInfoData
        });

        return {
            build: function (docId) {
                shadowBuilder.buildWindow();
                pageInfoWindowBuilder.buildWindow.applyAsync(arguments, pageInfoWindowBuilder);
            }
        }
    }
);
