Imcms.define("imcms-select", ["jquery"], function ($) {
    function toggleSelect() {
        var $this = $(this),
            select = $this.closest(".imcms-select").find(".imcms-drop-down-list"),
            dropDownItem = select.children(".imcms-drop-down-list__items").find(".imcms-drop-down-list__item")
        ;

        select.toggleClass("imcms-select__drop-down-list--active");
        dropDownItem.click(selectItem);
    }

    function selectItem() {
        var $this = $(this),
            content = $this.text(),
            select = $this.closest(".imcms-select__drop-down-list"),
            itemValue = select.find(".imcms-drop-down-list__select-item-value").html(content),
            selectInput = select.find("input")
        ;

        select.removeClass("imcms-select__drop-down-list--active");
        selectInput.val(content);

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
