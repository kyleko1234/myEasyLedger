INSERT INTO role(name)
    VALUES
        ('ROLE_USER'),
        ('ROLE_ADMIN');
/**
    id | name
     1 | ROLE_USER
     2 | ROLE_ADMIN
*/

INSERT INTO account_type(name)
    VALUES 
        ('Assets'),
        ('Liabilities'),
        ('Owner''s Equity'),
        ('Income'),
        ('Expenses');
/** id | name
     1 | 'Assets'
     2 | 'Liabilities'
     3 | 'Owner's Equity'
     4 | 'Income'
     5 | 'Expenses' **/

INSERT INTO account_subtype(name, account_type_id)
    VALUES
        ('Cash and cash equivalents', 1),
        ('Current marketable securities', 1),
        ('Receivables', 1),
        ('Inventories', 1),
        ('Other current assets', 1),
        ('Property', 1),
        ('Plant and Equipment', 1),
        ('Non-current marketable securities', 1),
        ('Other non-current assets', 1),
        ('Cash and cash equivalents', 1),
        ('Payables', 2),
        ('Deferred revenue', 2),
        ('Commercial paper', 2),
        ('Current term debt', 2),
        ('Deferred tax', 5),
        ('Other current liabilities', 2),
        ('Non-current term debt', 2),
        ('Other non-current liabilities', 2),
        ('Paid-in capital', 3),
        ('Dividends and equivalents', 3),
        ('Other equity items', 3),
        ('Revenue', 4),
        ('Other income', 4),
        ('Cost of sales', 5),
        ('Research and development', 5),
        ('Selling, general, and administration', 5),
        ('Depreciation', 5),
        ('Amortization', 5),
        ('Other expenses', 5),
        ('Income taxes', 5);

    /** 1  ('Cash and cash equivalents', 1),
        2  ('Current marketable securities', 1),
        3  ('Receivables', 1),
        4  ('Inventories', 1),
        5  ('Other current assets', 1),
        6  ('Property', 1),
        7  ('Plant and Equipment', 1),
        8  ('Non-current marketable securities', 1),
        9  ('Other non-current assets', 1),
        10 ('Cash and cash equivalents', 1),
        11 ('Payables', 2),
        12 ('Deferred revenue', 2),
        13 ('Commercial paper', 2),
        14 ('Current term debt', 2),
        15 ('Deferred tax', 5),
        16 ('Other current liabilities', 2),
        17 ('Non-current term debt', 2),
        18 ('Other non-current liabilities', 2),
        19 ('Paid-in capital', 3),
        20 ('Dividends and equivalents', 3),
        21 ('Other equity items', 3),
        22 ('Revenue', 4),
        23 ('Other income', 4),
        24 ('Cost of sales', 5),
        25 ('Research and development', 5),
        26 ('Selling, General, and Administration', 5),
        27 ('Depreciation', 5),
        28 ('Amortization', 5),
        29 ('Other expenses', 5),
        30 ('Income taxes', 5); **/





INSERT INTO person(first_name, last_name, email, password, enabled)
    VALUES
        ('Kyle', 'Ko', 'kyleko1234@gmail.com', '$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG', TRUE);

/** id | first_name | last_name | email             | password
     1 | 'Kyle'   | 'Ko'    | kyleko1234@gmail.com  | $2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG (bcrypted 'admin')
     2 | 'Kyle'   | 'Ko'    | thesock339@gmail.com  | $2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG (bcrypted 'admin') **/

INSERT INTO person_role(person_id, role_id)
    VALUES
        (1, 1);
/** person_id | role_id
            1 | 1      
            2 | 1      */

INSERT INTO organization(name)
    VALUES
        ('Sample organization');
/** id | name
     1 | 'Sample organization'
     2 | 'Moon Services, Inc (SAMPLE DATA)' **/


INSERT INTO organization_person(person_id, organization_id)
    VALUES
        (1, 1);
/** person_id | organization_id
            1 | 1           
            2 | 2           **/




INSERT INTO account_group(name, account_subtype_id, organization_id)
    VALUES
        ('Cash', 1, 1),
        ('Accounts Receivable', 3, 1),
        ('Inventories', 4, 1),
        ('Equipment', 7, 1),
        ('Payables', 11, 1),
        ('Paid-in Capital', 19, 1),
        ('Dividends and equivalents', 20, 1),
        ('Revenue', 22, 1),
        ('Selling, general, and administration', 26, 1);

/**     1    ('Cash', 1, 1),
        2    ('Accounts Receivable', 3, 1),
        3    ('Inventories', 4, 1),
        4    ('Equipment', 7, 1),
        5    ('Payables', 11, 1),
        6    ('Paid-in Capital', 19, 1),
        7    ('Dividends and equivalents', 20, 1)
        8    ('Revenue', 22, 1),
        9    ('Selling, general, and administration', 26, 1); */

INSERT INTO account(name, account_group_id)
    VALUES
        ('Cash', 1),
        ('Accounts receivable', 2),
        ('Office supplies', 3),
        ('Office equipment', 4),
        ('Vehicles', 4),
        ('Notes payable', 5),
        ('Accounts payable', 5),
        ('Dividends payable', 5),
        ('Capital stock', 6),
        ('Dividends', 7),
        ('Service revenue', 8),
        ('Office Rent', 9),
        ('Payroll', 9),
        ('Utilities', 9);

/*      1     ('Cash', 1),
        2     ('Accounts receivable', 2),
        3     ('Office supplies', 3),
        4     ('Office equipment', 4),
        5     ('Vehicles', 4),
        6     ('Notes payable', 5),
        7     ('Accounts payable', 5),
        8     ('Dividends payable', 5),
        9     ('Capital stock', 6),
        10    ('Dividends', 7),
        11    ('Service revenue', 8),
        12    ('Office Rent', 9),
        13    ('Payroll', 9),
        14    ('Utilities', 9); */

    -----------------END SETUP DATA-------------------
    -----------------BEGIN ENTRY DATA-----------------

INSERT INTO journal_entry(journal_entry_date, organization_id, person_id, description, year_month)
    VALUES
        ('2020-11-01', 1, 1, 'Issued 20,000 shares of common stock at $20 per share', 202011),
        ('2020-11-03', 1, 1, 'Paid office rent for the month of November $1500', 202011),
        ('2020-11-06', 1, 1, 'Purchased office supplies $250', 202011),
        ('2020-11-12', 1, 1, 'Purchased office equipment on account $4,500', 202011),
        ('2020-11-16', 1, 1, 'Purchased business car for $25,000. Paid $10,000 cash and issued a note for the balance.', 202011),
        ('2020-11-21', 1, 1, 'Billed clients $24,000 on account.', 202011),
        ('2020-11-25', 1, 1, 'Declared dividends $3,000. The amount of dividends will be distributed in December', 202011),
        ('2020-11-28', 1, 1, 'Paid utility bills for the month of November $180.', 202011),
        ('2020-11-29', 1, 1, 'Received $20,000 cash from clients billed on November 21.', 202011),
        ('2020-11-30', 1, 1, 'Paid salary for the month of November $7,500', 202011);

/** 1         ('2020-04-11', 1, 1, 'Issued 20,000 shares of common stock at $20 per share'),
    2         ('2020-04-18', 1, 1, 'Paid office rent for the month of November $1500'),
    3         ('2020-04-18', 1, 1, 'Purchased office supplies $250'),
    4         ('2020-04-19', 1, 1, 'Purchased office equipment on account $4,500'),
    5         ('2020-04-20', 1, 1, 'Purchased business car for $25,000. Paid $10,000 cash and issued a note for the balance.'),
    6         ('2020-04-21', 1, 1, 'Billed clients $24,000 on account.'),
    7         ('2020-04-21', 1, 1, 'Declared dividends $3,000. The amount of dividends will be distributed in December'),
    8         ('2020-04-21', 1, 1, 'Paid utility bills for the month of November $180.'),
    9         ('2020-04-21', 1, 1, 'Received $20,000 cash from clients billed on November 21.'),
    10        ('2020-04-21', 1, 1, 'Paid salary for the month of November $7,500'); */




INSERT INTO line_item(journal_entry_id, account_id, is_credit, amount, description)
    VALUES
        (1, 1, FALSE, 400000, 'Cash influx from initial offering'),
        (1, 9, TRUE, 400000, 'Issued 20000 shares of common at 20 per'),

        (2, 12, FALSE, 500, 'Office rent expense, November'),
        (2, 1, TRUE, 500, 'Paid office rent november in cash'),

        (3, 3, FALSE, 250, 'Purchase of office supplies'),
        (3, 1, TRUE, 250, 'Purchase of office supplies'),

        (4, 4, FALSE, 4500, 'Purchased office equipment on account'),
        (4, 7, TRUE, 4500, 'Purchased office equipment on account'),

        (5, 5, FALSE, 25000, 'Purchased company vehicle'),
        (5, 1, TRUE, 10000, 'Paid 10000 down for vehicle'),
        (5, 6, TRUE, 15000, 'Issued 15000 note payable for vehicle'),

        (6, 2, FALSE, 24000, 'Billed clients on account'),
        (6, 11, TRUE, 24000, 'Billed clients on account'),

        (7, 10, FALSE, 3000, 'Dividends declared to be distributed in december'),
        (7, 8, TRUE, 3000, 'Dividends declared to be distributed in december'),

        (8, 14, FALSE, 180, 'November utilities paid in cash'),
        (8, 1, TRUE, 180, 'November utilities paid in cash'),

        (9, 1, FALSE, 20000, 'Collected cash from clients billed on November 21'),
        (9, 2, TRUE, 20000, 'Collected cash from clients billed on November 21'),

        (10, 13, FALSE, 7500, 'Paid salary expense for November'),
        (10, 1, TRUE, 7500, 'Paid salary expense for November');


