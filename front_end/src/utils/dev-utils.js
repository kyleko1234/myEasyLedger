import axios from 'axios';
import { API_BASE_URL } from './constants';

/**
 * Utility script for populating empty db with sample data. This can be more convenient than backing up sample data
 * from the db layer, since it takes advantage of PostgreSQL triggers and java logging utilities to create realistic data while 
 * avoiding tedious math or json formatting when changing, adding, or reformatting sample data.
 * 
 * Assumes a database with metadata populated, and a user created with username "kyleko1234@gmail.com" and password "admin".
 * Assumes that the sample user owns an organization with ID of 1, and that no other data exists in the database, with all
 * ID auto-incrementers are in the default positions, i.e. nothing else has been created or deleted in the database.
 */
export async function populateSampleUserWithSampleData() {
    const axiosInstance = axios.create();

    //************************** DATA ****************************/
    const loginData = {
        email: "kyleko1234@gmail.com",
        password: "admin" 
    }

    const parentAccounts = [
        {
            accountName: "Cash",
            accountCode: "110100",
            accountSubtypeId: 1,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Accounts Receivable",
            accountCode: "130100",
            accountSubtypeId: 3,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Inventories",
            accountCode: "140100",
            accountSubtypeId: 4,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Property, plant, and equipment",
            accountCode: "180100",
            accountSubtypeId: 8,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Accounts Payable",
            accountCode: "210100",
            accountSubtypeId: 11,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Paid-in Capital",
            accountCode: "310100",
            accountSubtypeId: 20,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Dividends and equivalents declared",
            accountCode: "320100",
            accountSubtypeId: 22,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Revenue",
            accountCode: "410100",
            accountSubtypeId: 24,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Selling, general, and administration",
            accountCode: "530100",
            accountSubtypeId: 29,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Dividends payable",
            accountCode: "220100",
            accountSubtypeId: 12,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Short-term debt",
            accountCode: "240100",
            accountSubtypeId: 14,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        }
    ]

    const childAccounts = [
        {
            accountName: "Office supplies",
            accountCode: "430101",
            parentAccountId: 9,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Office equipment",
            accountCode: "180101",
            parentAccountId: 4,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Vehicles",
            accountCode: "180102",
            parentAccountId: 4,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Notes payable",
            accountCode: "240101",
            parentAccountId: 11,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Service revenue",
            accountCode: "410101",
            parentAccountId: 8,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Office Rent",
            accountCode: "530102",
            parentAccountId: 9,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Payroll",
            accountCode: "530103",
            parentAccountId: 9,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        },
        {
            accountName: "Utilities",
            accountCode: "530104",
            parentAccountId: 9,
            organizationId: 1,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        }
    ]

    const journalEntries = [
        {
            "journalEntryDate": "2020-11-01",
            "description": "Issued 20,000 shares of common stock at $20 per share",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 6,
                    "amount": 400000,
                    "description": "Issued 20000 shares of common at 20 per",
                    "isCredit": true,
                },
                {
                    "accountId": 1,
                    "amount": 400000,
                    "description": "Cash influx from initial offering",
                    "isCredit": false,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-03",
            "description": "Paid office rent for the month of November $500",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 17,
                    "amount": 500,
                    "description": "Office rent expense, November",
                    "isCredit": false,
                },
                {
                    "accountId": 1,
                    "amount": 500,
                    "description": "Paid office rent november in cash",
                    "isCredit": true,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-06",
            "description": "Purchased office supplies $250",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 12,
                    "amount": 250,
                    "description": "Purchase of office supplies",
                    "isCredit": false,
                },
                {
                    "accountId": 1,
                    "amount": 250,
                    "description": "Purchase of office supplies",
                    "isCredit": true,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-12",
            "description": "Purchased office equipment on account $4,500",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 13,
                    "amount": 4500,
                    "description": "Purchased office equipment on account",
                    "isCredit": false,
                },
                {
                    "accountId": 5,
                    "amount": 4500,
                    "description": "Purchased office equipment on account",
                    "isCredit": true,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-16",
            "description": "Purchased business car for $25,000. Paid $10,000 cash and issued a note for the balance.",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 14,
                    "amount": 25000,
                    "description": "Purchased company vehicle",
                    "isCredit": false,
                },
                {
                    "accountId": 15,
                    "amount": 15000,
                    "description": "Issued 15000 note payable for vehicle",
                    "isCredit": true,
                },
                {
                    "accountId": 1,
                    "amount": 10000,
                    "description": "Paid 10000 down for vehicle",
                    "isCredit": true,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-21",
            "description": "Billed clients $24,000 on account.",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 16,
                    "amount": 24000,
                    "description": "Billed clients on account",
                    "isCredit": true,
                },
                {
                    "accountId": 2,
                    "amount": 24000,
                    "description": "Billed clients on account",
                    "isCredit": false,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-25",
            "description": "Declared dividends $3,000. The amount of dividends will be distributed in December",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 7,
                    "amount": 3000,
                    "description": "Dividends declared to be distributed in december",
                    "isCredit": false,
                },
                {
                    "accountId": 10,
                    "amount": 3000,
                    "description": "Dividends declared to be distributed in december",
                    "isCredit": true,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-28",
            "description": "Paid utility bills for the month of November $180.",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 19,
                    "amount": 180,
                    "description": "November utilities paid in cash",
                    "isCredit": false,
                },
                {
                    "accountId": 1,
                    "amount": 180,
                    "description": "November utilities paid in cash",
                    "isCredit": true,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-29",
            "description": "Received $20,000 cash from clients billed on November 21.",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 2,
                    "amount": 20000,
                    "description": "Collected cash from clients billed on November 21",
                    "isCredit": true,
                },
                {
                    "accountId": 1,
                    "amount": 20000,
                    "description": "Collected cash from clients billed on November 21",
                    "isCredit": false,
                }
            ],
        },
        {
            "journalEntryDate": "2020-11-30",
            "description": "Paid salary for the month of November $7,500",
            "organizationId": 1,
            "lineItems": [
                {
                    "accountId": 18,
                    "amount": 7500,
                    "description": "Paid salary expense for November",
                    "isCredit": false,
                },
                {
                    "accountId": 1,
                    "amount": 7500,
                    "description": "Paid salary expense for November",
                    "isCredit": true,
                }
            ],
        }
    ]
    /********************************** END DATA **************************************/

    /********************************** API CALLS *************************************/
    async function postAccount(account) {
        await axiosInstance.post(`${API_BASE_URL}/account`, account)
    }

    async function postJournalEntry(journalEntry) {
        await axiosInstance.post(`${API_BASE_URL}/journalEntry`, journalEntry);
    }

    await axiosInstance.post(`${API_BASE_URL}/auth/signin`, loginData).then(response => {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.accessToken;
    })

    for (let i = 0; i < parentAccounts.length; i++) {
        await (postAccount(parentAccounts[i]));
    }
    for (let i = 0; i < childAccounts.length; i++) {
        await (postAccount(childAccounts[i]));
    }
    for (let i = 0; i < journalEntries.length; i++) {
        await (postJournalEntry(journalEntries[i]));
    }

}