/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-components-builder",
    ["imcms-buttons-builder", "imcms-flags-builder", "imcms-checkboxes-builder"],
    function (buttons, flags, checkboxes) {
        return {
            buttons: buttons,
            flags: flags,
            checkboxes: checkboxes
        };
    }
);
