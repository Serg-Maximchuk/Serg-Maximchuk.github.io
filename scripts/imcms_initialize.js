Imcms.define("imcms-initialize",
    ["imcms-flags", "imcms-select", "imcms-numberbox", "imcms-image-editor"],
    function (imcmsFlags, imcmsSelect, imcmsNumberbox, imcmsImageEditor) {
        return {
            init: function () {
                imcmsFlags.init();
                imcmsSelect.init();
                imcmsNumberbox.init();
                imcmsImageEditor.init();
            }
        };
    }
);
