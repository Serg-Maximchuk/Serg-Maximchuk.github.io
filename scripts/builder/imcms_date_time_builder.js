/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 28.07.17.
 */
Imcms.define("imcms-date-time-builder", ["imcms-bem-builder", "imcms-buttons-builder"], function (BEM, buttons) {
    var datePickerBEM = new BEM({
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
        weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        timePickerBEM = new BEM({
            block: "imcms-time-picker",
            elements: {
                "current-time": "imcms-current-time",
                "time": "",
                "button": "",
                "hours": "",
                "hour": "",
                "minutes": "",
                "minute": ""
            }
        }),
        timeInputBEM = new BEM({
            block: "imcms-current-time",
            elements: {
                "input": ""
            }
        }),
        dateTimeBEM = new BEM({
            block: "imcms-date-time",
            elements: {
                "date-picker": "imcms-date-picker",
                "time-picker": "imcms-time-picker"
            }
        })
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
        attributes = attributes || {};
        attributes.placeholder = "yyyy-MM-dd";
        var $dateInput = dateInputContainerBEM.buildElement("input", "<input>", attributes),
            $dateInputContainer = dateInputContainerBEM.buildBlock("<div>", [
                {"input": $dateInput}
            ]),
            datePickerElements = [{"current-date": $dateInputContainer}]
        ;

        if (withCalendar) {
            datePickerElements.push({"calendar": createCalendar()});
        }

        return datePickerBEM.buildBlock("<div>", datePickerElements);
    }

    function createTimePickerBlockElements(elementName, howManyElements) {
        var elements = [];

        for (var i = 0; i < howManyElements; i++) {
            elements.push(timePickerBEM.buildBlockElement(elementName, "<div>"));
        }

        return elements;
    }

    function createClock() {
        var $prevHourButton = timePickerBEM.makeBlockElement("button", buttons.incrementButton()),
            emptyHours = createTimePickerBlockElements("hour", 6),
            $nextHourButton = timePickerBEM.makeBlockElement("button", buttons.decrementButton()),
            $hours = timePickerBEM.buildBlockElement("hours", "<div>").append(
                [$prevHourButton].concat(emptyHours, $nextHourButton)
            ),
            $prevMinuteButton = timePickerBEM.makeBlockElement("button", buttons.incrementButton()),
            emptyMinutes = createTimePickerBlockElements("minute", 6),
            $nextMinuteButton = timePickerBEM.makeBlockElement("button", buttons.decrementButton()),
            $minutes = timePickerBEM.buildBlockElement("minutes", "<div>").append(
                [$prevMinuteButton].concat(emptyMinutes, $nextMinuteButton)
            )
        ;
        return timePickerBEM.buildBlockElement("time", "<div>").append($hours, $minutes);
    }

    function createTimeBox(attributes, withClock) {
        attributes = attributes || {};
        attributes.placeholder = "HH:mm";
        var $timeInput = timeInputBEM.buildElement("input", "<input>", attributes),
            $timeInputContainer = timeInputBEM.buildBlock("<div>", [
                {"input": $timeInput}
            ]),
            timePickerElements = [{"current-time": $timeInputContainer}]
        ;

        if (withClock) {
            timePickerElements.push({"time": createClock()});
        }

        return timePickerBEM.buildBlock("<div>", timePickerElements);
    }

    function createDateTimeBox(attributes) {
        var $datePart = createDateBox(attributes, true),
            $timePart = createTimeBox(attributes, true)
        ;
        return dateTimeBEM.buildBlock("<div>", [
            {"date-picker": $datePart},
            {"time-picker": $timePart}
        ])
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
        },
        timePickerClock: function (attributes) {
            return createTimeBox(attributes, true);
        },
        dateTimePicker: function (attributes) {
            return createDateTimeBox(attributes);
        }
    };
});
