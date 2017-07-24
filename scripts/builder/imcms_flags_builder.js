/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-flags-builder", ["jquery"], function ($) {
    var FLAGS_CLASS = "imcms-flag",
        CONTAINER_CLASS = "imcms-flags",
        FLAG_ACTIVE_CLASS = FLAGS_CLASS + "--" + "active"
    ;

    function changeNeighborFlag($btn) {
        var $neighborFlag = ($btn.next("." + FLAGS_CLASS).length !== 0)
            ? $btn.next("." + FLAGS_CLASS)
            : $btn.prev("." + FLAGS_CLASS);

        $neighborFlag.toggleClass(FLAG_ACTIVE_CLASS);
    }

    function onFlagClick(event) {
        var $clickedFlag = $(this);

        if (!$clickedFlag.hasClass(FLAGS_CLASS)) {
            return;
        }

        if ($clickedFlag.hasClass(FLAG_ACTIVE_CLASS)) {
            event.preventDefault();

        } else {
            $clickedFlag.addClass(FLAG_ACTIVE_CLASS);
            changeNeighborFlag($clickedFlag);
        }
    }

    function flagsBuilder(lang) {
        return function (tag, attributesObj) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = FLAGS_CLASS + " " + FLAGS_CLASS + "--" + lang
                + (attributesObj.active ? " " + FLAG_ACTIVE_CLASS : "")
                + (attributesObj["class"] ? " " + attributesObj["class"] : "");

            delete attributesObj.active;
            return $(tag, attributesObj).click(onFlagClick);
        };
    }

    return {
        "class": FLAGS_CLASS,
        "container-class": CONTAINER_CLASS,
        eng: flagsBuilder("en"),
        swe: flagsBuilder("sw"),
        container: function (tag, attributesObj, elements) {
            attributesObj = attributesObj || {};
            attributesObj["class"] = CONTAINER_CLASS + (attributesObj["class"] ? " " + attributesObj["class"] : "");

            elements = elements.map(function (element) {
                return element.addClass(CONTAINER_CLASS + "__flag");
            });

            return $(tag, attributesObj).append(elements);
        }
    }
});
