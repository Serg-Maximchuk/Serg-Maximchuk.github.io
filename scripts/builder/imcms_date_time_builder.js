/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 28.07.17.
 */
Imcms.define("imcms-date-time-builder", ["imcms-bem-builder", "imcms-buttons-builder"], function (BEM, buttons) {
    var fieldWrapperBEM = new BEM({
            block: "imcms-field",
            elements: {
                "date-picker": "imcms-date-picker"
            }
        }),
        dateMainContainerBEM = new BEM({
            block: "imcms-date-picker",
            elements: {
                "current-date": "imcms-current-date",
                "calendar": "imcms-calendar"
            }
        }),
        dateInputContainerBEM = new BEM({
            block: "imcms-current-date",
            elements: {
                "input": ""
            }
        }),
        calendarContainerBEM = new BEM({
            block: "imcms-calendar",
            elements: {
                "header": "",
                "button": "",
                "title": "",
                "body": "",
                "day-names": "",
                "day-name": "",
                "weeks": "",
                "week": "",
                "day": "imcms-day"
            }
        }),
        weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    ;

    function createEmptyDays(howManyDays) {
        var days = [];

        for (var i = 0; i < howManyDays; i++) {
            days.push(calendarContainerBEM.buildBlockElement("day", "<div>"));
        }

        return days;
    }

    function createEmptyWeeks(howManyWeeks) {
        var weeks = [];

        for (var i = 0; i < howManyWeeks; i++) {
            var $week = calendarContainerBEM.buildBlockElement("week", "<div>");
            $week.append(createEmptyDays(7));

            weeks.push($week);
        }

        return weeks;
    }

    function createCalendar() {
        var $prevMonthButton = calendarContainerBEM.makeBlockElement("button", buttons.prevButton()),
            $title = calendarContainerBEM.buildBlockElement("title", "<div>"),
            $nextMonthButton = calendarContainerBEM.makeBlockElement("button", buttons.nextButton()),
            $header = calendarContainerBEM.buildElement("header", "<div>").append(
                $prevMonthButton,
                $title,
                $nextMonthButton
            ),

            dayNames = weekDays.map(function (weekDay) {
                return calendarContainerBEM.buildBlockElement("day-name", "<div>", {
                    text: weekDay
                });
            }),
            $dayNames = calendarContainerBEM.buildBlockElement("day-names", "<div>").append(dayNames),

            weeks = createEmptyWeeks(6),
            $weeks = calendarContainerBEM.buildBlockElement("weeks", "<div>").append(weeks),
            $body = calendarContainerBEM.buildElement("body", "<div>").append($dayNames, $weeks)
        ;

        return calendarContainerBEM.buildBlock("<div>", [
            {"header": $header},
            {"body": $body}
        ]);
    }

    function createDateBox(attributes, withCalendar) {
        var $dateInput = dateInputContainerBEM.buildElement("input", "<input>", attributes),
            $dateInputContainer = dateInputContainerBEM.buildBlock("<div>", [
                {"input": $dateInput}
            ]),
            mainContainerElements = [{"current-date": $dateInputContainer}]
        ;

        if (withCalendar) {
            mainContainerElements.push({"calendar": createCalendar()});
        }

        var $dateMainContainer = dateMainContainerBEM.buildBlock("<div>", mainContainerElements);

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
            return createDateBox(attributes);
        },
        datePickerCalendar: function (attributes) {
            return createDateBox(attributes, true);
        }
    };
});
