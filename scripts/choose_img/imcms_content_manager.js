Imcms.define("imcms-content-manager", ["jquery"], function ($) {

    function openCloseFolders() {
        var $btn = $(this),
            folders = $(".imcms-content-manager__left-side"),
            contentSide = $(".imcms-content-manager__right-side"),
            footer = $(".imcms-content-manager__footer")
        ;

        if ($btn.attr("data-state") === "close") {
            folders.animate({"left": 0}, 600);
            contentSide.animate({"left": "400px"}, 600);
            footer.animate({"left": "400px"}, 600);
            $btn.attr("data-state", "open");
            $btn.text("hide folders");
        } else {
            folders.animate({"left": "-400px"}, 600);
            contentSide.animate({"left": 0}, 600);
            footer.animate({"left": 0}, 600);
            $btn.attr("data-state", "close");
            $btn.text("show folders");
        }
    }

    function closeFolders() {
        var openCloseBtn = $("#openCloseFolders"),
            folders = $(".imcms-content-manager__left-side"),
            contentSide = $(".imcms-content-manager__right-side"),
            footer = $(".imcms-content-manager__footer")
        ;
        folders.animate({"left": "-100%"}, 600);
        contentSide.animate({"left": 0}, 600);
        footer.animate({"left": 0}, 600);
        openCloseBtn.attr("data-state", "close");
        openCloseBtn.text("show folders");
    }

    return {
        init: function () {
            $("#openCloseFolders").click(openCloseFolders);
            $("#closeFolders").click(closeFolders);
        }
    };
});
