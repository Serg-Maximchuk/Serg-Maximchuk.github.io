Imcms.define("imcms-choose-image", ["jquery"], function ($) {

    function active() {
        $(this).toggleClass("imcms-choose-img-wrap--active");
    }

    function removeImg() {
        $(this).parents(".imcms-choose-img-wrap").remove();
    }

    return {
        init: function () {
            $(".imcms-choose-img-wrap").click(active);
            $(".imcms-choose-img-description__button").click(removeImg);
        }
    };
});
