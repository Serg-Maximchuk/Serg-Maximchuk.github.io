Imcms.define("imcms-time-picker", ["imcms", "jquery"], function (imcms, $) {
    var TIME_PICKER_CLASS = "imcms-time-picker",
        TIME_PICKER_CLASS_SELECTOR = ".imcms-time-picker"
    ;

    function getCurrentTime() {
        var currentDate = new Date(),
            hour = currentDate.getHours(),
            minute = currentDate.getMinutes()
        ;

        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        return hour + ":" + minute;
    }

    function openPicker() {
        var curTime = $(this),
            timePicker = curTime.parents(TIME_PICKER_CLASS_SELECTOR),
            hour = timePicker.find(".imcms-time-picker__hour"),
            minute = timePicker.find(".imcms-time-picker__minute"),
            curHour, curMinute,
            currentTimeInput = timePicker.find(".imcms-current-time__input"),
            currentTimeInputVal = currentTimeInput.val().split(":")
        ;

        if (parseInt(currentTimeInputVal[0]) >= 18) {
            curHour = 18;
        } else {
            curHour = parseInt(currentTimeInputVal[0]);
        }

        if (parseInt(currentTimeInputVal[1]) >= 55) {
            curMinute = 55;
        } else {
            curMinute = parseInt(currentTimeInputVal[1]);
        }

        if (!timePicker.hasClass("imcms-time-picker--active")
            && timePicker.find(".imcms-time-picker__time").length !== 0
        ) {
            timePicker.addClass("imcms-time-picker--active")
        }

        hour.each(function () {
            var $this = $(this);
            $this.click(setSelectTime);
            $this.html(curHour);
            if ($this.hasClass("imcms-time-picker__hour--choose") && $this.html() !== currentTimeInputVal[0]) {
                $this.removeClass("imcms-time-picker__hour--choose");
            }
            if ($this.html() === currentTimeInputVal[0]) {
                $this.addClass("imcms-time-picker__hour--choose");
            }
            curHour++
        });
        minute.each(function () {
            var $this = $(this);
            $this.click(setSelectTime);
            $this.html(curMinute);
            if ($this.hasClass("imcms-time-picker__minute--choose") && $this.html() !== currentTimeInputVal[1]) {
                $this.removeClass("imcms-time-picker__minute--choose");
            }
            if ($this.html() === currentTimeInputVal[1]) {
                $this.addClass("imcms-time-picker__minute--choose");
            }
            curMinute++;
        });
    }

    function closePicker(e) {
        var $target = $(e.target);
        if ($target.closest(".imcms-current-time__input").length
            || $target.hasClass("imcms-current-time__input")
            || $target.hasClass("imcms-time-picker__current-time")
            || $target.parents(".imcms-time-picker__time").length
        ) {
            return;
        }

        $(TIME_PICKER_CLASS_SELECTOR).removeClass("imcms-time-picker--active");
        e.stopPropagation();
    }

    function chooseTime(event) {
        var $btn = $(this),
            hours, hour, minutes, minute, curHour, curMinute,
            timePicker = $btn.parents(TIME_PICKER_CLASS_SELECTOR),
            currentTimeInput = timePicker.find(".imcms-current-time__input"),
            currentTimeInputVal = currentTimeInput.val().split(":")
        ;

        curHour = parseInt(currentTimeInputVal[0]);
        curMinute = parseInt(currentTimeInputVal[1]);

        if ($btn.parent(".imcms-time-picker__hours").length !== 0) {
            hours = $btn.parent();
            hour = hours.find(".imcms-time-picker__hour");

            if ($btn.hasClass("imcms-button--increment") && curHour > 0) {
                curHour -= 1;
                hour.each(function () {
                    $(this).html(curHour);
                    curHour++;
                });
                curHour = parseInt(hour.first().html());
                if (curHour < 10) curHour = "0" + curHour;
                if (curMinute < 10) curMinute = "0" + curMinute;
                currentTimeInput.val(curHour + ":" + curMinute);

            } else if ($btn.hasClass("imcms-button--decrement") && parseInt(hour.last().html()) < 23) {
                curHour += 1;
                hour.each(function () {
                    $(this).html(curHour);
                    curHour++;
                });
                curHour = parseInt(hour.first().html());
                if (curHour < 10) curHour = "0" + curHour;
                if (curMinute < 10) curMinute = "0" + curMinute;
                currentTimeInput.val(curHour + ":" + curMinute);

            } else {
                event.preventDefault();
            }
        } else if ($btn.parent(".imcms-time-picker__minutes").length !== 0) {
            minutes = $btn.parent();
            minute = minutes.find(".imcms-time-picker__minute");

            if ($btn.hasClass("imcms-button--increment") && curMinute > 0) {
                curMinute -= 1;
                minute.each(function () {
                    $(this).html(curMinute);
                    curMinute++;
                });
                curMinute = parseInt(minute.first().html());
                if (curHour < 10) curHour = "0" + curHour;
                if (curMinute < 10) curMinute = "0" + curMinute;
                currentTimeInput.val(curHour + ":" + curMinute);

            } else if ($btn.hasClass("imcms-button--decrement") && parseInt(minute.last().html()) < 60) {
                curMinute += 1;
                minute.each(function () {
                    $(this).html(curMinute);
                    curMinute++;
                });
                curMinute = parseInt(minute.first().html());
                if (curHour < 10) curHour = "0" + curHour;
                if (curMinute < 10) curMinute = "0" + curMinute;
                currentTimeInput.val(curHour + ":" + curMinute);

            } else {
                event.preventDefault();
            }
        }
    }

    function setSelectTime() {
        var $this = $(this),
            hour, minute,
            currentTimeInput = $this.parents(TIME_PICKER_CLASS_SELECTOR).find(".imcms-current-time__input"),
            currentTimeInputVal = currentTimeInput.val().split(":")
        ;

        hour = currentTimeInputVal[0];
        minute = currentTimeInputVal[1];

        $this.parent().children().each(function () {
            if ($(this).hasClass("imcms-time-picker__hour--choose")) {
                $(this).removeClass("imcms-time-picker__hour--choose");
            }
            else if ($(this).hasClass("imcms-time-picker__minute--choose")) {
                $(this).removeClass("imcms-time-picker__minute--choose")
            }
        });

        if ($this.hasClass("imcms-time-picker__hour")) {
            hour = $this.html();
            if (hour < 10) hour = "0" + hour;
            currentTimeInput.val(hour + ":" + currentTimeInputVal[1]);
            $this.addClass("imcms-time-picker__hour--choose");
        }
        if ($this.hasClass("imcms-time-picker__minute")) {
            minute = $this.html();
            if (minute < 10) minute = "0" + minute;
            currentTimeInput.val(currentTimeInputVal[0] + ":" + minute);
            $this.addClass("imcms-time-picker__minute--choose");
        }
    }

    function currentTimeValidation() {
        var currentTimeInputVal = $(this).val().split(":"),
            hours = parseInt(currentTimeInputVal[0]),
            minutes = parseInt(currentTimeInputVal[1])
        ;

        if ((hours < 0)
            || (hours > 23)
            || (minutes < 0)
            || (minutes > 60)
            || (currentTimeInputVal[1].length !== 2)
        ) {
            // todo: do not overwrite valid hours/minutes if minutes/hours are not valid
            $(this).val(getCurrentTime());
        }
    }

    var TimePicker = function ($timePickerContainer) {
        this.$timePicker = $timePickerContainer.hasClass(TIME_PICKER_CLASS)
            ? $timePickerContainer
            : $timePickerContainer.find(TIME_PICKER_CLASS_SELECTOR);

        this.$timePicker.find(".imcms-time-picker__current-time")
            .click(openPicker)
            .end()
            .find(".imcms-time-picker__time .imcms-time-picker__button")
            .click(chooseTime)
            .end()
            .find(".imcms-current-time__input")
            .blur(currentTimeValidation)
            .mask("00:00");
    };
    TimePicker.prototype = {
        setTime: function (setMeAsTime) {
            this.$timePicker.find(".imcms-current-time__input").val(setMeAsTime);
        }
    };

    $(document).click(closePicker);

    return TimePicker;
});
