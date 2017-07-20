Imcms.define("imcms-menu-editor", ["imcms-modal-window", "jquery"], function (imcmsModalWindow, $) {

    function showHideSubmenu() {
        var $btn = $(this),
            level = $btn.parents(".imcms-menu-items").attr("data-menu-items-lvl")
        ;

        level = parseInt(level) + 1;
        $btn.parents(".imcms-menu-items")
            .find(".imcms-menu-items[data-menu-items-lvl=" + level + "]")
            .each(function () {
                $(this).slideToggle()
            });
        $btn.toggleClass("imcms-menu-item-btn--open");
    }

    function removeMenuItem() {
        var $ctrl = $(this),
            currentMenuItem = $ctrl.closest(".imcms-menu-item"),
            currentMenuItemName = currentMenuItem.find(".imcms-menu-item__info-title").text(),
            submenuItem = currentMenuItem.parent().find(".imcms-menu-items"),
            parentMenuItem = currentMenuItem.closest(".imcms-menu-items"),
            currentMenuItemWrap = parentMenuItem.parent()
        ;

        imcmsModalWindow.init("Do you want to remove menu item \""
            + currentMenuItemName
            + "\"?", function (answer) {
            if (answer) {
                submenuItem.remove();
                currentMenuItem.remove();
                parentMenuItem.remove();

                if (currentMenuItemWrap.children().length === 1) {
                    currentMenuItemWrap.find(".imcms-menu-item__btn").remove();
                }
            }
        });
    }

    return {
        init: function () {
            $(".imcms-menu-item__btn").click(showHideSubmenu);
            $(".imcms-menu-item__controls .imcms-control--remove").click(removeMenuItem);
        }
    };
});
