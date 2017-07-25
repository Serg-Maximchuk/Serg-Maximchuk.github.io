/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-components-builder",
    ["imcms-buttons-builder", "imcms-flags-builder", "imcms-checkboxes-builder", "imcms-radio-buttons-builder"],
    function (buttons, flags, checkboxes, radios) {
        return {
            buttons: buttons,
            flags: flags,
            checkboxes: checkboxes,
            radios: radios
        };
    }
);
