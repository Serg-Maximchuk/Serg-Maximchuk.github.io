/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-page-info-builder",
    ["imcms-bem-builder", "imcms-components-builder", "jquery"],
    function (BEM, componentsBuilder, $) {
        return {
            buildPageInfo: function () {
                return $("<div>", {
                    "class": "imcms-pop-up-modal",
                    "data-menu": "pageInfo"
                });
            }
        }
    }
);
