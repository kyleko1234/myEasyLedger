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
 * @param {*} number 
 * @returns {number}
 */
const customRound = number => Math.sign(number) * Math.round(Math.abs(number));

/**
 * Takes a locale, currency, and a number and returns a formatted string representing the number as a currency. 
 * @param {String} locale 
 * @param {String} currency 
 * @param {Number} amount
 * @returns {String}
 */
export const formatCurrency = (locale, currency, amount) => {
    switch (locale) {
        case "zh-TW":
            switch (currency) {
                case "TWD":
                    return `$${customRound(amount)}`
                default: 
                    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
            }
        default: 
            switch (currency) {
                case "TWD":
                    return `NT$${customRound(amount)}`
                default:
                    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
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
 * Takes in a date in the format yyyy-mm-dd and returns a date in the same format with the same month and date, but with the year replaced with the current year.
 * @param {String} date 
 * @returns {String}
 */
export const getDateInCurrentYear = date => {
    let dateComponentArray = date.split('-');
    return (dateToday.getFullYear() + "-" + dateComponentArray[1] + "-" + dateComponentArray[2]);
}