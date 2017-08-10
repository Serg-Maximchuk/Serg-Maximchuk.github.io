/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 07.08.17.
 */
Imcms.define("imcms-editors-builder", ["imcms-page-info-builder"], function (pageInfoBuilder) {
    return {
        buildPageInfo: pageInfoBuilder.build
    }
});
