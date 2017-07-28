/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 28.07.17.
 */
Imcms.define("imcms-date-time-builder", ["imcms-bem-builder"], function (BEM) {
    var fieldWrapperBEM = new BEM({
            block: "imcms-field",
            elements: {
                "date-picker": "imcms-date-picker"
            }
        }),
        dateMainContainerBEM = new BEM({
            block: "imcms-date-picker",
            elements: {
                "current-date": "imcms-current-date"
            }
        }),
        dateInputContainerBEM = new BEM({
            block: "imcms-current-date",
            elements: {
                "input": ""
            }
        })
    ;
    return {
        dateBoxReadOnly: function (tag, attributes) {
            var $dateInput = dateInputContainerBEM.buildElement("input", "<input>", {
                    type: "text",
                    title: attributes.title,
                    placeholder: attributes.placeholder,
                    autocomplete: "off",
                    readonly: "readonly"
                }),
                $dateInputContainer = dateInputContainerBEM.buildBlock("<div>", [
                    {"input": $dateInput}
                ]),
                $dateMainContainer = dateMainContainerBEM.buildBlock("<div>", [
                    {"current-date": $dateInputContainer}
                ])
            ;

            return fieldWrapperBEM.buildBlock("<div>", [
                {"date-picker": $dateMainContainer}
            ]);
        }
    };
});
