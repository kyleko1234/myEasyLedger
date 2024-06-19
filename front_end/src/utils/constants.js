export const API_BASE_URL = 'https://api.myeasyledger.com/v0.6.1';
export const ACCESS_TOKEN = 'easyLedgerAccessToken';
export const REFRESH_TOKEN = 'easyLedgerRefreshToken';

export const FIRSTNAME_LASTNAME_LOCALES = ["en-US"];
export const LOCALE_OPTIONS = [
    {value: "en-US", label: "English (US)", defaultCurrency: "USD"},
    {value: "zh-TW", label: "中文 (繁體)", defaultCurrency: "TWD"}
]

export const RESULTS_PER_PAGE_OPTIONS = [
    {value: 10, label: 10},
    {value: 20, label: 20},
    {value: 30, label: 30},
    {value: 50, label: 50},
    {value: 100, label: 100},
]

// cny yen usd twd eur
const CURRENCY_I18N = {
    "en-US": {
        "CNY": "CNY (Chinese Renminbi Yuan)",
        "JPY": "JPY (Japanese Yen)",
        "USD": "USD (United States Dollar)",
        "TWD": "TWD (New Taiwan Dollar)",
        "EUR": "EUR (Euro)"
    },
    "zh-TW": {
        "CNY": "CNY (人民幣)",
        "JPY": "JPY (日幣)",
        "USD": "USD (美金)",
        "TWD": "TWD (台幣)",
        "EUR": "EUR (歐元)"
    }
}

export const CURRENCY_OPTIONS = (locale) => 
[
    {value: "AED", label: "AED (United Arab Emirates Dirham)"},
    {value: "AFN", label: "AFN (Afghan Afghani)"},
    {value: "ALL", label: "ALL (Albanian Lek)"},
    {value: "AMD", label: "AMD (Armenian Dram)"},
    {value: "ANG", label: "ANG (Netherlands Antillean Gulden)"},
    {value: "AOA", label: "AOA (Angolan Kwanza)"},
    {value: "ARS", label: "ARS (Argentine Peso)"},
    {value: "AUD", label: "AUD (Australian Dollar)"},
    {value: "AWG", label: "AWG (Aruban Florin)"},
    {value: "AZN", label: "AZN (Azerbaijani Manat)"},
    {value: "BAM", label: "BAM (Bosnia & Herzegovina Convertible Mark)"},
    {value: "BBD", label: "BBD (Barbadian Dollar)"},
    {value: "BDT", label: "BDT (Bangladeshi Taka)"},
    {value: "BGN", label: "BGN (Bulgarian Lev)"},
    {value: "BIF", label: "BIF (Burundian Franc)"},
    {value: "BMD", label: "BMD (Bermudian Dollar)"},
    {value: "BND", label: "BND (Brunei Dollar)"},
    {value: "BOB", label: "BOB (Bolivian Boliviano)"},
    {value: "BRL", label: "BRL (Brazilian Real)"},
    {value: "BSD", label: "BSD (Bahamian Dollar)"},
    {value: "BWP", label: "BWP (Botswana Pula)"},
    {value: "BZD", label: "BZD (Belize Dollar)"},
    {value: "CAD", label: "CAD (Canadian Dollar)"},
    {value: "CDF", label: "CDF (Congolese Franc)"},
    {value: "CHF", label: "CHF (Swiss Franc)"},
    {value: "CLP", label: "CLP (Chilean Peso)"},
    {value: "CNY", label: CURRENCY_I18N[locale]["CNY"]},
    {value: "COP", label: "COP (Colombian Peso)"},
    {value: "CRC", label: "CRC (Costa Rican Colón)"},
    {value: "CVE", label: "CVE (Cape Verdean Escudo)"},
    {value: "CZK", label: "CZK (Czech Koruna)"},
    {value: "DJF", label: "DJF (Djiboutian Franc)"},
    {value: "DKK", label: "DKK (Danish Krone)"},
    {value: "DOP", label: "DOP (Dominican Peso)"},
    {value: "DZD", label: "DZD (Algerian Dinar)"},
    {value: "EGP", label: "EGP (Egyptian Pound)"},
    {value: "ETB", label: "ETB (Ethiopian Birr)"},
    {value: "EUR", label: CURRENCY_I18N[locale]["EUR"]},
    {value: "FJD", label: "FJD (Fijian Dollar)"},
    {value: "FKP", label: "FKP (Falkland Islands Pound)"},
    {value: "GBP", label: "GBP (British Pound)"},
    {value: "GEL", label: "GEL (Georgian Lari)"},
    {value: "GIP", label: "GIP (Gibraltar Pound)"},
    {value: "GMD", label: "GMD (Gambian Dalasi)"},
    {value: "GNF", label: "GNF (Guinean Franc)"},
    {value: "GTQ", label: "GTQ (Guatemalan Quetzal)"},
    {value: "GYD", label: "GYD (Guyanese Dollar)"},
    {value: "HKD", label: "HKD (Hong Kong Dollar)"},
    {value: "HNL", label: "HNL (Honduran Lempira)"},
    {value: "HRK", label: "HRK (Croatian Kuna)"},
    {value: "HTG", label: "HTG (Haitian Gourde)"},
    {value: "HUF", label: "HUF (Hungarian Forint)"},
    {value: "IDR", label: "IDR (Indonesian Rupiah)"},
    {value: "ILS", label: "ILS (Israeli New Sheqel)"},
    {value: "INR", label: "INR (Indian Rupee)"},
    {value: "ISK", label: "ISK (Icelandic Króna)"},
    {value: "JMD", label: "JMD (Jamaican Dollar)"},
    {value: "JPY", label: CURRENCY_I18N[locale]["JPY"]},
    {value: "KES", label: "KES (Kenyan Shilling)"},
    {value: "KGS", label: "KGS (Kyrgyzstani Som)"},
    {value: "KHR", label: "KHR (Cambodian Riel)"},
    {value: "KMF", label: "KMF (Comorian Franc)"},
    {value: "KRW", label: "KRW (South Korean Won)"},
    {value: "KYD", label: "KYD (Cayman Islands Dollar)"},
    {value: "KZT", label: "KZT (Kazakhstani Tenge)"},
    {value: "LAK", label: "LAK (Lao Kip)"},
    {value: "LBP", label: "LBP (Lebanese Pound)"},
    {value: "LKR", label: "LKR (Sri Lankan Rupee)"},
    {value: "LRD", label: "LRD (Liberian Dollar)"},
    {value: "LSL", label: "LSL (Lesotho Loti)"},
    {value: "MAD", label: "MAD (Moroccan Dirham)"},
    {value: "MDL", label: "MDL (Moldovan Leu)"},
    {value: "MGA", label: "MGA (Malagasy Ariary)"},
    {value: "MKD", label: "MKD (Macedonian Denar)"},
    {value: "MNT", label: "MNT (Mongolian Tögrög)"},
    {value: "MOP", label: "MOP (Macanese Pataca)"},
    {value: "MRO", label: "MRO (Mauritanian Ouguiya)"},
    {value: "MUR", label: "MUR (Mauritian Rupee)"},
    {value: "MVR", label: "MVR (Maldivian Rufiyaa)"},
    {value: "MWK", label: "MWK (Malawian Kwacha)"},
    {value: "MXN", label: "MXN (Mexican Peso)"},
    {value: "MYR", label: "MYR (Malaysian Ringgit)"},
    {value: "MZN", label: "MZN (Mozambican Metical)"},
    {value: "NAD", label: "NAD (Namibian Dollar)"},
    {value: "NGN", label: "NGN (Nigerian Naira)"},
    {value: "NIO", label: "NIO (Nicaraguan Córdoba)"},
    {value: "NOK", label: "NOK (Norwegian Krone)"},
    {value: "NPR", label: "NPR (Nepalese Rupee)"},
    {value: "NZD", label: "NZD (New Zealand Dollar)"},
    {value: "PAB", label: "PAB (Panamanian Balboa)"},
    {value: "PEN", label: "PEN (Peruvian Nuevo Sol)"},
    {value: "PGK", label: "PGK (Papua New Guinean Kina)"},
    {value: "PHP", label: "PHP (Philippine Peso)"},
    {value: "PKR", label: "PKR (Pakistani Rupee)"},
    {value: "PLN", label: "PLN (Polish Złoty)"},
    {value: "PYG", label: "PYG (Paraguayan Guaraní)"},
    {value: "QAR", label: "QAR (Qatari Riyal)"},
    {value: "RON", label: "RON (Romanian Leu)"},
    {value: "RSD", label: "RSD (Serbian Dinar)"},
    {value: "RUB", label: "RUB (Russian Ruble)"},
    {value: "RWF", label: "RWF (Rwandan Franc)"},
    {value: "SAR", label: "SAR (Saudi Riyal)"},
    {value: "SBD", label: "SBD (Solomon Islands Dollar)"},
    {value: "SCR", label: "SCR (Seychellois Rupee)"},
    {value: "SEK", label: "SEK (Swedish Krona)"},
    {value: "SGD", label: "SGD (Singapore Dollar)"},
    {value: "SHP", label: "SHP (Saint Helenian Pound)"},
    {value: "SLL", label: "SLL (Sierra Leonean Leone)"},
    {value: "SOS", label: "SOS (Somali Shilling)"},
    {value: "SRD", label: "SRD (Surinamese Dollar)"},
    {value: "STD", label: "STD (São Tomé and Príncipe Dobra)"},
    {value: "SVC", label: "SVC (Salvadoran Colón)"},
    {value: "SZL", label: "SZL (Swazi Lilangeni)"},
    {value: "THB", label: "THB (Thai Baht)"},
    {value: "TJS", label: "TJS (Tajikistani Somoni)"},
    {value: "TOP", label: "TOP (Tongan Paʻanga)"},
    {value: "TRY", label: "TRY (Turkish Lira)"},
    {value: "TTD", label: "TTD (Trinidad and Tobago Dollar)"},
    {value: "TWD", label: CURRENCY_I18N[locale]["TWD"]},
    {value: "TZS", label: "TZS (Tanzanian Shilling)"},
    {value: "UAH", label: "UAH (Ukrainian Hryvnia)"},
    {value: "UGX", label: "UGX (Ugandan Shilling)"},
    {value: "USD", label: CURRENCY_I18N[locale]["USD"]},
    {value: "UYU", label: "UYU (Uruguayan Peso)"},
    {value: "UZS", label: "UZS (Uzbekistani Som)"},
    {value: "VND", label: "VND (Vietnamese Đồng)"},
    {value: "VUV", label: "VUV (Vanuatu Vatu)"},
    {value: "WST", label: "WST (Samoan Tala)"},
    {value: "XAF", label: "XAF (Central African Cfa Franc)"},
    {value: "XCD", label: "XCD (East Caribbean Dollar)"},
    {value: "XOF", label: "XOF (West African Cfa Franc)"},
    {value: "XPF", label: "XPF (Cfp Franc)"},
    {value: "YER", label: "YER (Yemeni Rial)"},
    {value: "ZAR", label: "ZAR (South African Rand)"},
    {value: "ZMW", label: "ZMW (Zambian Kwacha)"}
]



const PERMISSION_TYPE_I18N = {
    "en-US": {
        "VIEW": "VIEW",
        "EDIT": "EDIT",
        "ADMIN": "ADMIN",
        "OWN": "OWN"
    },
    "zh-TW": {
        "VIEW": "有觀看權限",
        "EDIT": "有編修權限",
        "ADMIN": "有管理權限",
        "OWN": "有所有權限"
    } 
}

export const PERMISSION_TYPE_OPTIONS = (locale) => [
    {value: 1, label: PERMISSION_TYPE_I18N[locale]["VIEW"]},
    {value: 2, label: PERMISSION_TYPE_I18N[locale]["EDIT"]},
    {value: 3, label: PERMISSION_TYPE_I18N[locale]["ADMIN"]},
    {value: 4, label: PERMISSION_TYPE_I18N[locale]["OWN"]}
]

//transaction type objects/options to assist with data entry logic for organizations where isEnterprise = false.
//transactions can be thought of as a two LineItem process; moving value the account of the first LineItem to the account of the second LineItem.
//AccountTypeId and isCredit in these objects refer to the AccountType and Credit/Debit status of the second LineItem in this conceptual pairing
//Expense transactions generally decrease personal asset value; therefore the asset/liability account is credited and the expense account is debited
//Income transactions do the opposite, so the asset/liability account is debited and the income account is credited
//Transfers are transactions debiting one asset/liability account and crediting another; in this case they are conceptualized as moving value FROM the first TO the second; ergo the first account is credited and the second is debited.
//If you have an equity account in an organization where isEnterprise = false, you did something wrong
export const PERSONAL_TRANSACTION_TYPES = (locale) => [
    {value: 1, label: PERSONAL_TRANSACTION_TYPES_I18N[locale]["Expense"], accountTypeIds: [5], isCredit: false},
    {value: 2, label: PERSONAL_TRANSACTION_TYPES_I18N[locale]["Income"], accountTypeIds: [4], isCredit: true},
    {value: 3, label: PERSONAL_TRANSACTION_TYPES_I18N[locale]["Transfer"], accountTypeIds: [1, 2], isCredit: false}
]

const PERSONAL_TRANSACTION_TYPES_I18N = {
    "en-US": {
        "Expense": "Expense",
        "Income": "Income",
        "Transfer": "Transfer"
    },
    "zh-TW": {
        "Expense": "支出",
        "Income": "收入",
        "Transfer": "轉帳"
    }

}

export const ACCOUNT_TYPE_OPTIONS = locale => [
    {value: 1, label: ACCOUNT_TYPE_OPTIONS_I18N[locale]["Assets"], object: {id: 1, name: "Assets"}},
    {value: 2, label: ACCOUNT_TYPE_OPTIONS_I18N[locale]["Liabilities"], object: {id: 1, name: "Liabilities"}},
    {value: 3, label: ACCOUNT_TYPE_OPTIONS_I18N[locale]["Equity"], object: {id: 1, name: "Owner's Equity"}},
    {value: 4, label: ACCOUNT_TYPE_OPTIONS_I18N[locale]["Income"], object: {id: 1, name: "Income"}},
    {value: 5, label: ACCOUNT_TYPE_OPTIONS_I18N[locale]["Expenses"], object: {id: 1, name: "Expenses"}},
]
const ACCOUNT_TYPE_OPTIONS_I18N = {
    "en-US": {
        "Assets": "Assets",
        "Liabilities": "Liabilities",
        "Equity": "Equity",
        "Income": "Income",
        "Expenses": "Expenses"
    },
    "zh-TW": {
        "Assets": "資產",
        "Liabilities": "負債",
        "Equity": "權益",
        "Income": "收益",
        "Expenses": "費損"
    }
}

export const CALENDAR_MONTH_OPTIONS = locale => [
    {value: "01", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["January"]},
    {value: "02", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["February"]},
    {value: "03", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["March"]},
    {value: "04", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["April"]},
    {value: "05", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["May"]},
    {value: "06", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["June"]},
    {value: "07", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["July"]},
    {value: "08", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["August"]},
    {value: "09", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["September"]},
    {value: "10", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["October"]},
    {value: "11", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["November"]},
    {value: "12", label: CALENDAR_MONTH_OPTIONS_I18N[locale]["December"]},
]
const CALENDAR_MONTH_OPTIONS_I18N = {
    "en-US": {
        "January": "January",
        "February": "February",
        "March": "March",
        "April": "April",
        "May": "May",
        "June": "June",
        "July": "July",
        "August": "August",
        "September": "September",
        "October": "October",
        "November": "November",
        "December": "December",
    },
    "zh-TW": {
        "January": "一月",
        "February": "二月",
        "March": "三月",
        "April": "四月",
        "May": "五月",
        "June": "六月",
        "July": "七月",
        "August": "八月",
        "September": "九月",
        "October": "十月",
        "November": "十一月",
        "December": "十二月",
    },
}

export const CATEGORY_ACCOUNT_TYPES = [4, 5];
export const NON_CATEGORY_ACCOUNT_TYPES = [1, 2];
export const DEBIT_ACCOUNT_TYPES = [1, 5];
export const CREDIT_ACCOUNT_TYPES = [2, 3, 4];

export const PIE_CHART_BORDER_COLORS = [
    //"rgba(37, 137, 189, 1)", "rgba(176, 124, 158, 1)", "rgba(205, 198, 174, 1)", "rgba(56, 104, 106, 1)", "rgba(219, 216, 240, 1)", "rgba(163, 180, 162, 1)", "rgba(181, 145, 148, 1)", "rgba(54, 17, 52, 1)", "rgba(10, 35, 66, 1)", "rgba(80, 61, 66, 1)", 
    //"rgba(255, 228, 94, 1)", "rgba(32, 191, 85, 1)", "rgba(119, 135, 139, 1)", "rgba(190, 255, 199, 1)", "rgba(55, 62, 64, 1)", "rgba(72, 130, 134, 1)", "rgba(183, 213, 212, 1)", "rgba(255, 133, 82, 1)", "rgba(236, 145, 146, 1)", "rgba(255, 32, 110, 1)"

    //"rgba(83, 183, 208, 1)", "rgba(236, 90, 65, 1)", "rgba(239, 138, 72, 1)", "rgba(247, 202, 74, 1)", "rgba(25, 55, 150, 1)", "rgba(214, 225, 241, 1)"
    "rgba(55, 173, 242, 1)", "rgba(185, 221, 255, 1)", "rgba(255, 220, 204, 1)", "rgba(255, 206, 92, 1)", "rgba(254, 154, 8, 1)", "rgba(255, 73, 60, 1)", "rgba(254, 7, 51, 1)", "rgba(236, 108, 164, 1)", "rgba(201, 14, 143, 1)", "rgba(131, 59, 133, 1)", "rgba(73, 59, 121, 1)"
]
export const PIE_CHART_BACKGROUND_COLORS = [
    //"rgba(37, 137, 189, 0.7)", "rgba(176, 124, 158, 0.7)", "rgba(205, 198, 174, 0.7)", "rgba(56, 104, 106, 0.7)", "rgba(219, 216, 240, 0.7)", "rgba(163, 180, 162, 0.7)", "rgba(181, 145, 148, 0.7)", "rgba(54, 17, 52, 0.7)", "rgba(10, 35, 66, 0.7)", "rgba(80, 61, 66, 0.7)", 
    //"rgba(255, 228, 94, 0.7)", "rgba(32, 191, 85, 0.7)", "rgba(119, 135, 139, 0.7)", "rgba(190, 255, 199, 0.7)", "rgba(55, 62, 64, 0.7)", "rgba(72, 130, 134, 0.7)", "rgba(183, 213, 212, 0.7)", "rgba(255, 133, 82, 0.7)", "rgba(236, 145, 146, 0.7)", "rgba(255, 32, 110, 0.7)"
    
    //"rgba(83, 183, 208, 0.7)", "rgba(236, 90, 65, 0.7)", "rgba(239, 138, 72, 0.7)", "rgba(247, 202, 74, 0.7)", "rgba(25, 55, 150, 0.7)", "rgba(214, 225, 241, 0.7)"
    "rgba(55, 173, 242, 0.7)", "rgba(185, 221, 255, 0.7)", "rgba(255, 220, 204, 0.7)", "rgba(255, 206, 92, 0.7)", "rgba(254, 154, 8, 0.7)", "rgba(255, 73, 60, 0.7)", "rgba(254, 7, 51, 0.7)", "rgba(236, 108, 164, 0.7)", "rgba(201, 14, 143, 0.7)", "rgba(131, 59, 133, 0.7)", "rgba(73, 59, 121, 0.7)"
]

export const LOGIN_BG_URL = "url(/assets/img/login-bg/login-bg-11.jpg)";
export const REGISTER_BG_URL = "url(/assets/img/login-bg/login-bg-12.jpg)";