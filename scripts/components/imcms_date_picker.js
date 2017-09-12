Imcms.define("imcms-date-picker",
    ["imcms", "imcms-calendar", "jquery", "jquery-mask"],
    function (imcms, imcmsCalendar, $) {
        var DATE_PICKER_CLASS = "imcms-date-picker",
            DATE_PICKER_CLASS_SELECTOR = ".imcms-date-picker"
        ;

        function openCalendar() {
            imcmsCalendar.init($(this).parents(DATE_PICKER_CLASS_SELECTOR));
        }

        function closeCalendar(e) {
            var $target = $(e.target);
            if ($target.closest(".imcms-current-date__input").length
                || $target.hasClass("imcms-current-date__input")
                || $target.hasClass(".imcms-date-picker__current-date")
                || $target.parents(".imcms-calendar").length
            ) {
                return;
            }

            $(DATE_PICKER_CLASS_SELECTOR).removeClass("imcms-date-picker--active");
            e.stopPropagation();
        }

        function getCurrentDate() {
            var currentDate = new Date(),
                year = currentDate.getFullYear(),
                month = currentDate.getMonth() + 1,
                date = currentDate.getDate()
            ;

            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }

            return year + "-" + month + "-" + date;
        }

        function isDateValid(year, month, day) {
            var currentDate = new Date(year, month, day);

            return ((currentDate.getFullYear() === year)
                && (currentDate.getMonth() === (month - 1))
                && (currentDate.getDate() === day)
            );
        }

        function currentDateValidation() {
            var currentDateInput = $(this),
                currentDate = currentDateInput.val().split('-'),
                year = parseInt(currentDate[0]),
                month = parseInt(currentDate[1]),
                day = parseInt(currentDate[2])
            ;

            if (isDateValid(year, month, day)) {
                var $calendar = currentDateInput.parents(DATE_PICKER_CLASS_SELECTOR)
                    .find(".imcms-calendar");

                if ($calendar.length) {
                    imcmsCalendar.buildCalendar(year, month, day, $calendar);
                }
            } else {
                var cd = getCurrentDate();
                currentDateInput.val(cd);
            }
        }

        function defaultIfFalse(statement, value, defaultValue) {
            return statement ? value : defaultValue;
        }

        function rebuildCalendar() {
            var $currentDateInput = $(this),
                $calendar = $currentDateInput.parents(DATE_PICKER_CLASS_SELECTOR).find(".imcms-calendar")
            ;

            if (!$calendar.length) {
                return;
            }

            var currentDate = new Date();
            var carDate = $currentDateInput.val().split('-'),
                isValid = !$currentDateInput.hasClass("imcms-currrent-date__input--error"),
                year = defaultIfFalse(isValid, carDate[0], currentDate.getFullYear()),
                month = defaultIfFalse(isValid, carDate[1], currentDate.getMonth() + 1),
                day = defaultIfFalse(isValid, carDate[2], currentDate.getDate())
            ;

            imcmsCalendar.buildCalendar(year, month, day, $calendar);
            var fileredByDay = $calendar.find(".imcms-calendar__day")
                .each(function () {
                    $(this).removeClass("imcms-day--today");
                })
                .filter(function () {
                    return $(this).html() === day
                });

            var lastOrFirst = day <= 20 ? fileredByDay.first() : fileredByDay.last();

            lastOrFirst.addClass("imcms-day--today");

        }

        $(document).click(closeCalendar);

        var DatePicker = function ($dateBoxContainer) {
            this.datePicker = $dateBoxContainer.hasClass(DATE_PICKER_CLASS)
                ? $dateBoxContainer
                : $dateBoxContainer.find(DATE_PICKER_CLASS_SELECTOR);

            if (this.datePicker.find(".imcms-calendar").length) {
                this.datePicker.find(".imcms-date-picker__current-date")
                    .click(openCalendar)
                    .end()
                    .find(".imcms-calendar__button")
                    .click(imcmsCalendar.chooseMonth)
                ;
            }

            this.datePicker.find(".imcms-current-date__input")
                .on('blur', currentDateValidation)
                .on('input', rebuildCalendar);
        };
        DatePicker.prototype = {
            setDate: function (date) {
                this.datePicker.find(".imcms-current-date__input").val(date);
                return this;
            }
        };

        return DatePicker
    });
