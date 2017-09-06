/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 25.07.17.
 */
Imcms.define("imcms-selects-builder",
    ["imcms-bem-builder", "imcms-primitives-builder", "imcms-buttons-builder", "jquery"],
    function (BEM, primitives, buttons, $) {
        var fieldBEM = new BEM({
                block: "imcms-field",
                elements: {
                    "select": "imcms-select"
                }
            }),
            selectBEM = new BEM({
                block: "imcms-select",
                elements: {
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
                value = $this.data("value"),
                select = $this.closest(".imcms-select__drop-down-list"),
                itemValue = select.find(".imcms-drop-down-list__select-item-value").html(content)
            ;

            // todo: implement labeling selected item by [selected] attribute

            select.removeClass("imcms-select__drop-down-list--active")
                .parent()
                .find("input")
                .val(value);

            return itemValue;
        }

        function apiSelectValue(resultImcmsSelect, $selectedValInput) {
            return function (value) {
                var selectCandidate = resultImcmsSelect.find("[data-value='" + value + "']");
                if (selectCandidate.length) {
                    onOptionSelected.call(selectCandidate);
                    $selectedValInput.val(value);
                    return resultImcmsSelect;
                } else {
                    throw new Error("Value '" + value + "' for select doesn't exist");
                }
            }
        }

        function apiSelectFirst(resultImcmsSelect) {
            return function () {
                var selectCandidate = resultImcmsSelect.find(".imcms-drop-down-list__items")
                    .find(".imcms-drop-down-list__item").first();
                if (selectCandidate.length) {
                    onOptionSelected.call(selectCandidate);
                    return resultImcmsSelect;
                } else {
                    throw new Error("Select is empty, nothing to choose");
                }
            }
        }

        function apiGetSelect($select) {
            return function () {
                return $select;
            }
        }

        return {
            imcmsSelect: function (tag, attributes, options) {
                var blockElements = [];

                if (attributes.text) {
                    var $label = primitives.imcmsLabel(attributes.id, attributes.text, {click: toggleSelect});
                    blockElements = [{"label": $label}];
                }

                var $selectElements = [];

                if (options && options.length) {
                    $selectElements.push(this.addOptionsToSelect(options));
                }

                var $selectedValInput = $("<input>", {
                    type: "hidden",
                    id: attributes.id,
                    name: attributes.name
                }); // todo: implement putting selected value into this input from [data-value] attribute

                $selectElements.push($selectedValInput);

                var resultImcmsSelect = selectBEM.buildBlock("<div>", blockElements, (attributes["class"] ? {"class": attributes["class"]} : {}))
                    .append($selectElements);

                resultImcmsSelect.selectValue = apiSelectValue(resultImcmsSelect, $selectedValInput);
                resultImcmsSelect.selectFirst = apiSelectFirst(resultImcmsSelect);
                resultImcmsSelect.selectedValue = function () {

                };

                return resultImcmsSelect;
            },
            addOptionsToSelect: function (options, $select) {
                var $itemsArr = options.map(function (option) {
                        return dropDownListBEM.buildBlockElement("item", "<div>", option);
                    }),
                    $itemsContainer = dropDownListBEM.buildElement("items", "<div>").append($itemsArr),

                    $button = dropDownListBEM.makeBlockElement("button", buttons.dropDownButton()),
                    $selectedValue = dropDownListBEM.buildBlockElement("select-item-value", "<span>", {
                        text: (options[0] && options[0].text) || ""
                    }),
                    $selectItem = dropDownListBEM.buildElement("select-item", "<div>", {click: toggleSelect})
                        .append($selectedValue, $button),

                    $dropDownList = dropDownListBEM.buildBlock("<div>", [
                        {"select-item": $selectItem},
                        {"items": $itemsContainer}
                    ]);

                var selectOptions = selectBEM.makeBlockElement("drop-down-list", $dropDownList);
                return $select ? $select.append(selectOptions).selectFirst() : selectOptions;
            },
            selectContainer: function (tag, attributes, options) {
                var clas = (attributes && attributes["class"]) || "";

                if (clas) {
                    delete attributes["class"];
                }

                var $select = this.imcmsSelect("<div>", attributes, options),
                    resultContainer = fieldBEM.buildBlock("<div>", [$select], (clas ? {"class": clas} : {}), "select");

                resultContainer.getSelect = apiGetSelect($select);

                return resultContainer;
            }
        }
    }
);
