/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-editors-builder", ["imcms-page-info-builder", "jquery"], function (pageInfoBuilder, $) {
    function buildShadow() {
        var $modal = $(".modal");

        if ($modal.length) {
            $modal.css("display", "block");
            return;
        }

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
    }

    function buildByStrategy(strategy) {
        buildShadow();
        return strategy.build();
    }

    return {
        buildPageInfo: buildByStrategy.bindArgs(pageInfoBuilder)
    }
});
