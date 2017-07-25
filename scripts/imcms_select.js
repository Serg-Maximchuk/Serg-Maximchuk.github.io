Imcms.define("imcms-select", ["jquery"], function ($) {
    function toggleSelect() {
        $(this).closest(".imcms-select")
            .find(".imcms-drop-down-list")
            .toggleClass("imcms-select__drop-down-list--active")
            .children(".imcms-drop-down-list__items")
            .find(".imcms-drop-down-list__item")
            .click(onOptionSelected);
    }

    function onOptionSelected() {
        var $this = $(this),
            content = $this.text(),
            select = $this.closest(".imcms-select__drop-down-list"),
            itemValue = select.find(".imcms-drop-down-list__select-item-value").html(content)
        ;

        select.removeClass("imcms-select__drop-down-list--active")
            .find("input")
            .val(content);

        return itemValue;
    }

    function closeSelect(e) {
        if (!$(e.target).parents(".imcms-select").length) {
            $(".imcms-select__drop-down-list").removeClass("imcms-select__drop-down-list--active");
            e.stopPropagation();
        }
    }

    return {
        init: function () {
            $(".imcms-drop-down-list__select-item").click(toggleSelect);
            $(document).click(closeSelect);
        }
    };
});

//todo: add logic for select according to their specifics
