Imcms.define("imcms-input-validator", [], function () {
    /**
     * @param mask inputted mask use next symbols:
     *  1) y - defines one digit for year, should be "yyyy"
     *  2) m - defines one digit for month, should be "mm" or "m" E.g. 10, 01, 1
     *  3) d - defines one digit for day, should be "dd" or "d"
     *  This method validates days count in specific month
     *  @param callback - function
     */
    function dateValidator(mask) {

        var separator = validateMask(mask);

        var $textContainer = this.$textContainer,
            prevValue = '';

        $textContainer
            .keydown(function () {
                prevValue = $textContainer.val();
            })
            .keyup(function () {

                try {
                    var currentValue = $textContainer.val();

                    if (!currentValue || currentValue === prevValue) {
                        return;
                    }

                    var currentValueSplit = currentValue
                        .split(separator)
                        .filter(function (dayPart) {
                            return dayPart !== "";
                        });

                    var startsWithYear = mask.indexOf("yyyy") === 0;
                    if (startsWithYear) {
                        switch (currentValueSplit.length) {
                            case 1:
                                checkYear(currentValueSplit[0]);
                                break;
                            case 2:
                                checkYear(currentValueSplit[0]);
                                checkMonth(currentValueSplit[1]);
                                break;
                            case 3:
                                checkYear(currentValueSplit[0]);
                                checkMonth(currentValueSplit[1]);
                                checkDay(currentValueSplit[2], currentValueSplit[1], currentValueSplit[0]);
                                break;
                            default:
                                cancel();
                        }
                    } else {
                        switch (currentValueSplit.length) {
                            case 1:
                                checkDay(currentValueSplit[0]);
                                break;
                            case 2:
                                checkMonth(currentValueSplit[1]);
                                checkDay(currentValueSplit[0], currentValueSplit[1]);
                                break;
                            case 3:
                                checkMonth(currentValueSplit[1]);
                                checkYear(currentValueSplit[2]);
                                checkDay(currentValueSplit[0], currentValueSplit[1], currentValueSplit[2]);
                                break;
                            default:
                                cancel();
                        }
                    }
                } catch (error) {
                    $textContainer.val(prevValue);
                }

            });

        return $textContainer;

        function checkYear(year) {
            if (!/^([1-9]\d{0,3})$/.test(year)) {
                cancel();
            }
        }

        function checkMonth(month) {
            if (month < 1 || month > 12) {
                cancel();
            }
        }

        function checkDay(day, month, year) {
            if (day < 1 || day > 31) {
                cancel();
            }

            var lastDayOfMonth;

            if (month && !year) {
                var randomYear = 1995;
                lastDayOfMonth = new Date(randomYear, +month, 0).getDate();
                if (day > lastDayOfMonth) {
                    cancel();
                }
            }

            if (month && year) {
                lastDayOfMonth = new Date(+year, +month, 0).getDate();
                if (day > lastDayOfMonth) {
                    cancel();
                }
            }
        }

        function cancel() {
            throw new Error("Validation fails");
        }

        function validateMask(mask) {
            function validate(statement, errorMsg) {
                if (!statement) {
                    throw new Error(errorMsg);
                }
            }


            validate(mask && typeof mask === "string", "Mask is empty or not a string!");

            var separators = ["/", "-", "."];

            var maskProcessed = separators
                .map(function (separator) {
                    return {
                        splitMask: mask.split(separator),
                        separator: separator
                    }
                })
                .filter(function (mask) {
                    return mask.splitMask.length === 3
                })
                .map(function (mask) {
                    mask.maskRegex = "y{1,4}" + mask.separator + "m{1,2}" + mask.separator + "d{1,2}";
                    mask.startsWithYear = mask.splitMask[0] === "yyyy";
                    if (!mask.startsWithYear) {
                        mask.maskRegex = mask.maskRegex
                            .split(mask.separator)
                            .reverse()
                            .join(mask.separator);
                    }
                    return mask;
                });

            validate(maskProcessed.length === 1, "Something wrong with your mask.");

            var maskObj = maskProcessed[0];

            validate(new RegExp("^(" + maskObj.maskRegex + ")$").test(mask), "Something wrong with your mask.");

            return maskObj.separator;
        }

    }

    function timeValidator() {
        return this.$textContainer;
    }

    var InputValidator = function ($textContainer) {
        this.$textContainer = $textContainer;
    };

    InputValidator.prototype.dateValidator = dateValidator;
    InputValidator.prototype.timeValidator = timeValidator;

    return InputValidator;

});
