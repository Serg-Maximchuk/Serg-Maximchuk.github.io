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

    function createDateBox(attributes) {
        var $dateInput = dateInputContainerBEM.buildElement("input", "<input>", attributes),
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

    return {
        dateBoxReadOnly: function (attributes) {
            attributes = attributes || {};
            attributes.readonly = "readonly";
            return createDateBox(attributes);
        },
        datePicker: function (attributes) {
            // todo: activate date picker here
            return createDateBox(attributes);
        }
    };
});
