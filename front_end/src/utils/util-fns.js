/**
 * Takes a string. Returns true if the string is [four digits]-[two digits]-[two digits], 
 * which implies a date in the format yyyy-mm-dd. Else, returns false.
 * @param {String} dateString 
 * @returns {Boolean}
 */
export const validateDate = (dateString) => {
    if (!dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return false;
    }
    return true;
}

/**
 * Custom rounding function because Math.round() sucks
 * @param {Number} number 
 * @returns {Number}
 */
const customRound = number => Math.sign(number) * Math.round(Math.abs(number));

/**
 * Applies commas to a number. Returns a string. 
 * Does not preserve precision of decimal; e.g. -1200.00 will be converted to "-1,200".
 * Does not correct octal numbers to decimal. e.g. 012345 will be converted to "5,349".
 * @param {Number} number 
 * @returns {String}
 */
const applyCommaToNumber = number => {
    let sign;
    if (number < 0) {
        sign = "-";
    } else {
        sign = "";
    }
    let numberComponents = Math.abs(number).toString().split(".");
    let decimal;
    if (numberComponents[1]) {
        decimal = "." + numberComponents[1];
    } else {
        decimal = "";
    }
    let integer = numberComponents[0];
    let returnedInteger = "";
    while (integer.length) {
        let subInteger = integer.substring(integer.length - 3, integer.length);
        if (returnedInteger.length){
            returnedInteger = subInteger + "," + returnedInteger;
        } else {
            returnedInteger = subInteger;
        }
        integer = integer.substring(0, integer.length - 3);
    }
    return sign + returnedInteger + decimal;
}

/**
 * Takes a locale, currency, and a number and returns a formatted string representing the number as a currency. 
 * @param {String} locale 
 * @param {String} currency 
 * @param {Number} amount
 * @returns {String}
 */
export const formatCurrency = (locale, currency, amount) => {
    let saferAmount;
    if (amount == 0) {
        saferAmount = 0;
    } else {
        saferAmount = amount;
    }

    switch (locale) {
        case "zh-TW":
            switch (currency) {
                case "TWD":
                    return `$${applyCommaToNumber(customRound(saferAmount))}`
                default: 
                    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(saferAmount);
            }
        default: 
            switch (currency) {
                case "TWD":
                    return `NT$${applyCommaToNumber(customRound(saferAmount))}`
                default:
                    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(saferAmount);
            }
    }
}

/**
 * Gets today's date in local time as YYYY-mm-dd
 * @returns {String}
 */
export const getTodayAsDateString = () => {
    let todayDateObject = new Date();
    let yearString = todayDateObject.getFullYear().toString();
    let rawMonth = todayDateObject.getMonth() + 1;
    let monthString;
    if (rawMonth >= 10) {
        monthString = rawMonth.toString();
    } else {
        monthString = "0" + rawMonth.toString();
    }
    let rawDate = todayDateObject.getDate();
    let dateString;
    if (rawDate >= 10) {
        dateString = rawDate;
    } else {
        dateString = "0" + rawDate.toString();
    }
    return `${yearString}-${monthString}-${dateString}`
}

/**
 * Gets the first day of the current month in local time as YYYY-mm-dd
 * @returns {String}
 */
export const getFirstDayOfCurrentMonth = () => {
    let todayDateObject = new Date();
    let yearString = todayDateObject.getFullYear().toString();
    let rawMonth = todayDateObject.getMonth() + 1;
    let monthString;
    if (rawMonth >= 10) {
        monthString = rawMonth.toString();
    } else {
        monthString = "0" + rawMonth.toString();
    }
    let date = "01";
    return `${yearString}-${monthString}-${date}`
}

/**
 * Takes in a date in the format yyyy-mm-dd and returns a date in the same format with the same month and date, but with the year replaced with the current year.
 * @param {String} date 
 * @returns {String}
 */
export const getDateInCurrentYear = date => {
    const dateToday = new Date();
    
    let dateComponentArray = date.split('-');
    return (dateToday.getFullYear() + "-" + dateComponentArray[1] + "-" + dateComponentArray[2]);
}

/**
 * Takes a six digit integer representing a year and a month, in the format yyyymm. 
 * Returns the first and last dates of the month represented by yearMonth, in the format yyyy-mm-dd. 
 * The returned object is in the following format: {startDate: String, endDate: String}
 * @param {number} yearMonth 
 * @returns {Object} 
 */
export const getStartAndEndDatesForYearMonth = yearMonth => {
    let month = yearMonth % 100;
    let year = (yearMonth - month) / 100;
    let monthString;
    if (month >= 10) {
        monthString = month.toString();
    } else {
        monthString = "0" + month.toString();
    }
    let lastDateOfMonth = {
        "01": "31",
        "02": "28",
        "03": "31",
        "04": "30",
        "05": "31",
        "06": "30",
        "07": "31",
        "08": "31",
        "09": "30",
        "10": "31",
        "11": "30",
        "12": "31",
    }
    if (year % 4 === 0) {
        lastDateOfMonth["02"] = "29";
    }
    return ({
        startDate: year + "-" + monthString + "-" + "01",
        endDate: year + "-" + monthString + "-" + lastDateOfMonth[monthString]
    })
}

/**
 * Takes two numbers, and returns what percentage the first number is out of the second number (portion / total).
 * Guarantees two decimal precision. Division by zero will result in zero.
 * @param {number} portion 
 * @param {number} total 
 * @returns {number}
 */
export const getPercentage = (portion, total) => {
    let product;
    if (total == 0) {
        product = 0;
    } else {
        product = portion * 100 / total;
    }
    return product.toFixed(2);
}

/**
 * Takes a date in YYYY-MM-DD format and a locale string and returns a localized version of that date string.
 * @param {string} dateString 
 * @param {string} locale 
 * @returns {string}
 */
export const localizeDate = (dateString, locale) => {
    let dateArray = dateString.split("-");
    let year = parseInt(dateArray[0]);
    let month = parseInt(dateArray[1]) - 1;
    let day = parseInt(dateArray[2]);
    let dateObject = new Date(Date.UTC(year, month, day))
    const options = { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" };
    return dateObject.toLocaleDateString(locale, options);
}

/**
 * Takes a year, month, day, and returns it in yyyy-mm-dd form. Year, month, and day should be in number form.
 * Month should be 1=January, NOT the js 0=January
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {string}
 */
export const yearMonthDayToDateString = (year, month, day) => {
    let yearString = year.toString();
    let monthString;
    let dayString;
    if (month < 10) {
        monthString = "0" + month.toString();
    } else {
        monthString = month.toString();
    }
    if (day < 10) {
        dayString = "0" + day.toString();
    } else {
        dayString = day.toString();
    }
    return `${yearString}-${monthString}-${dayString}`;
}

export const isTreatedAsZero = (value) => {
    switch(value) {
        case false:
        case null:
        case undefined:
        case NaN:
        case '':
        case 0:
            return true;
        default:
            return false;
    }
}

export const returnStringToNearestCentPrecisionNumber = string => {
    return parseFloat(parseFloat(string).toFixed(2))
}