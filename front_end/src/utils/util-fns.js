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