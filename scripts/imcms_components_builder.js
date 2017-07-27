/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 24.07.17.
 */
Imcms.define("imcms-components-builder",
    [
        "imcms-buttons-builder", "imcms-flags-builder", "imcms-checkboxes-builder", "imcms-radio-buttons-builder",
        "imcms-selects-builder", "imcms-texts-builder", "imcms-choose-image-builder", "imcms-keywords-builder"
    ],
    function (buttons, flags, checkboxes, radios, selects, texts, chooseImage, keywords) {
        return {
            buttons: buttons,
            flags: flags,
            checkboxes: checkboxes,
            radios: radios,
            selects: selects,
            texts: texts,
            chooseImage: chooseImage,
            keywords: keywords
        };
    }
);
