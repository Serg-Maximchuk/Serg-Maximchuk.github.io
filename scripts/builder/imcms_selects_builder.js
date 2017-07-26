/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 25.07.17.
 */
Imcms.define("imcms-selects-builder", ["imcms-bem-builder", "jquery"], function (BEM, $) {
    var fieldBEM = new BEM({
            block: "imcms-field",
            elements: {
                "select": "imcms-select"
            }
        }),
        selectBEM = new BEM({
            block: "imcms-select",
            elements: {
                "label": "imcms-label",
                "drop-down-list": "imcms-drop-down-list"
            }
        }),
        dropDownListBEM = new BEM({
            block: "imcms-drop-down-list",
            elements: {
                "select-item": "",
                "items": "",
                "item": "",
                "select-item-value": "",
                "button": "imcms-button"
            }
        })
    ;

    function closeSelect(e) {
        if (!$(e.target).parents(".imcms-select").length) {
            $(".imcms-select__drop-down-list").removeClass("imcms-select__drop-down-list--active");
            e.stopPropagation();
        }
    }

    $(document).click(closeSelect);

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

    return {
        select: function (tag, attributes, options) {
            var $itemsArr = options.map(function (option) {
                    return dropDownListBEM.buildBlockElement("item", "<div>", option);
                }),
                $itemsContainer = dropDownListBEM.buildElement("items", "<div>").append($itemsArr),

                $button = dropDownListBEM.buildBlockElement("button", "<button>", {type: "button"}, ["drop-down"]),
                $selectedValue = dropDownListBEM.buildBlockElement("select-item-value", "<span>", {
                    text: (options[0] && options[0].text) || ""
                }),
                $selectItem = dropDownListBEM.buildElement("select-item", "<div>", {click: toggleSelect})
                    .append($selectedValue, $button),

                $dropDownList = dropDownListBEM.buildBlock("<div>", [
                    {"select-item": $selectItem},
                    {"items": $itemsContainer}
                ]),
                $label = selectBEM.buildElement("label", "<label>", {
                    "for": attributes.id, // add opening select on label click
                    text: attributes.text
                })
            ;

            return selectBEM.buildBlock("<div>", [
                    {"label": $label},
                    {"drop-down-list": $dropDownList}
                ], (attributes["class"] ? {"class": attributes["class"]} : {}))
                .append($("<input>", {
                    type: "hidden",
                    id: attributes.id
                }));
        },
        container: function (tag, attributes, options) {
            var clas = (attributes && attributes["class"]) || "";

            if (clas) {
                delete attributes["class"];
            }

            var $select = this.select("<div>", attributes, options);
            return fieldBEM.buildBlock("<div>", [$select], (clas ? {"class": clas} : {}), "select");
        }
    }
});
