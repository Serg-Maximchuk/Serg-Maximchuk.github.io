/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-flags-builder", ["imcms-bem-builder", "jquery"], function (bemBuilder, $) {
    var FLAGS_CLASS = "imcms-flag",
        FLAG_ACTIVE_CLASS = FLAGS_CLASS + "--" + "active"
    ;

    var flagsBEM = new bemBuilder({
        block: "imcms-flags",
        elements: {
            "flag": FLAGS_CLASS
        }
    });

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

    function buildFlag(tag, attributesObj, modifiers, isActive) {
        if (isActive) {
            modifiers.push("active");
        }

        return flagsBEM.buildElement("flag", tag, attributesObj, modifiers).click(onFlagClick);
    }

    return {
        eng: function (tag, isActive, attributesObj) {
            return buildFlag(tag, attributesObj, ["en"], isActive);
        },
        swe: function (tag, isActive, attributesObj) {
            return buildFlag(tag, attributesObj, ["sw"], isActive);
        },
        container: function (tag, elements, attributesObj) {
            return flagsBEM.buildBlock(tag, elements, attributesObj, "flag");
        }
    }
});
