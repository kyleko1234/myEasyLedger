INSERT INTO role(name)
    VALUES
        ('ROLE_USER'),
        ('ROLE_ADMIN');
/**
    id | name
     1 | ROLE_USER
     2 | ROLE_ADMIN
*/

INSERT INTO person(first_name, last_name, email, password, enabled)
    VALUES
        ('Kyle', 'Ko', 'kyleko1234@gmail.com', '$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG', TRUE); 
/** id | first_name | last_name | email             | password
     1 | 'Kyle'   | 'Ko'    | kyleko1234@gmail.com  | $2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG (bcrypted 'admin') **/


INSERT INTO person_role(person_id, role_id)
    VALUES
        (1, 2);
/** person_id | role_id
            1 | 2      */

INSERT INTO organization(name)
    VALUES
        ('Sample organization');
/** id | name
     1 | 'Sample organization' **/

INSERT INTO organization_person(person_id, organization_id)
    VALUES
        (1, 1);
/** person_id | organization_id
            1 | 1           **/

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

INSERT INTO account_subtype(name, account_type_id, organization_id)
    VALUES
        ('Cash', 1, 1),
        ('Checking Account', 1, 1),
        ('Savings Account', 1, 1),
        ('Mobile Payment Account', 1, 1),
        ('Investment Account', 1, 1),
        ('Mortgage', 2, 1),
        ('Line of Credit', 2, 1),
        ('Accounts Payable', 2, 1),
        ('Accounts Receivable', 1, 1);
/** id | name                     | account_type_id | organization_id
     1 | 'Cash'                   | 1               | 1
     2 | 'Checking Account'       | 1               | 1
     3 | 'Savings Account'        | 1               | 1
     4 | 'Mobile Payment Account' | 1               | 1
     5 | 'Investment Account'     | 1               | 1
     6 | 'Mortgage'               | 2               | 1
     7 | 'Line of Credit'         | 2               | 1 
     8 | 'Accounts Payable'       | 2               | 1 
     9 | 'Accounts Receivable'    | 1               | 1 **/

INSERT INTO account(name, account_subtype_id, account_type_id, organization_id)
    VALUES
        ('Personal Cash', 1, 1, 1),
        ('Personal Checking', 2, 1, 1),
        ('Personal Venmo', 4, 1, 1),
        ('Personal BOA Credit Card', 7, 2, 1),
        ('Personal Expenses', NULL, 5, 1),

        ('Business Cash', 1, 1, 1),
        ('Business Expenses', NULL, 5, 1),
        ('Business Income', NULL, 4, 1),
        ('Accounts Payable', 8, 2, 1),
        ('Accounts Receivable', 9, 1, 1),
        ('Business Equity', NULL, 3, 1);

        
/** id  | name                       | account_subtype_id    | account_type_id   | organization_id
     1  | "Personal Cash"            |   1                   |   1               | 1
     2  | "Personal Checking"        |   2                   |   1               | 1
     3  | "Personal Venmo"           |   4                   |   1               | 1
     4  | "Personal BOA Credit Card" |   7                   |   2               | 1
     5  | "Personal Expenses"        |   NULL                |   5               | 1
     6  | "Business Cash"            |   1                   |   1               | 1 
     7  | "Business Expenses"        |   NULL                |   5               | 1 
     8  | "Business Income"          |   NULL                |   4               | 1 
     9  | "Accounts Payable"         |   8                   |   2               | 1 
     10 | "Accounts Receivable"      |   9                   |   1               | 1 
     11 | "Business Equity"          |   NULL                |   3               | 1**/    

INSERT INTO category(name, account_id)
    VALUES
        ('Grocery', 5),
        ('Dining', 5),
        ('Rent', 7),
        ('Supplies and Equipment', 7),
        ('Revenue from operations', 8),
        ('Utilities', 8),
        ('Dividends', 8),
        ('Employee Salary', 7);
/** id  | name                      | account_type_id   | organization_id
     1  | "Grocery"                 |  5                | 1
     2  | "Dining"                  |  5                | 1 
     3  | "Rent"                    |  5                | 1
     4  | "Supplies and Equipment"  |  5                | 1
     5  | "Revenue from operations" |  4                | 1
     6  | "Utilities"               |  5                | 1
     7  | "Dividends"               |  5                | 1
     8  | "Employee Salary"         |  5                | 1 */

    -----------------END SETUP DATA-------------------
    -----------------BEGIN ENTRY DATA-----------------

INSERT INTO journal_entry(journal_entry_date, organization_id, person_id, description)
    VALUES
        ('2020-04-11', 1, 1, 'Grocery for the week'),
        ('2020-04-18', 1, 1, 'Group lunch'),
        ('2020-04-18', 1, 1, 'Receive money from friend'),
        ('2020-04-19', 1, 1, 'Transfer venmo balance to bank'),
        ('2020-04-20', 1, 1, 'Pay credit card balance'),
        ('2020-04-21', 1, 1, 'Lunch at Whole Foods');

/** id  | entry_date    | organization_id  | last_modified_by   | description
    1   | "2020-04-11"  |  1               | 1                  | 'Grocery for the week'
    2   | "2020-04-18"  |  1               | 1                  | 'Group lunch'
    3   | "2020-04-18"  |  1               | 1                  | 'Receive money from friend'
    4   | "2020-04-19"  |  1               | 1                  | 'Transfer venmo balance to bank'
    5   | "2020-04-20"  |  1               | 1                  | 'Pay credit card balance'
    6   | "2020-04-21"  |  1               | 1                  | 'Lunch at Whole Foods' **/

INSERT INTO line_item(journal_entry_id, account_id, is_credit, amount, description, category_id)
    VALUES
        (1, 5, FALSE, 40.00, 'Grocery expenses', 1),
        (1, 1, TRUE, 40.00, 'Cash payment for groceries', NULL),

        (2, 5, FALSE, 20.00, 'Dining expenses', 2),
        (2, 3, FALSE, 10.00, 'Friend venmoed back at table', NULL),
        (2, 4, TRUE, 30.00, 'Card payment for lunch', NULL),

        (3, 3, FALSE, 10.00, 'other friend paid back', NULL),
        (3, 5, TRUE, 10.00, 'dining expenses paid back', 2),

        (4, 2, FALSE, 30.00, 'venmo transfer to bank', NULL),
        (4, 3, TRUE, 30.00, 'venmo transfer to bank', NULL),

        (5, 4, FALSE, 30.00, 'paid credit balance', NULL),
        (5, 2, TRUE, 30.00, 'paid credit balance from checking acc', NULL),

        (6, 5, FALSE, 20.00, 'bought lunch at whole foods', 2),
        (6, 5, FALSE, 20.00, 'bought an stick of celery at whole foods', 1),
        (6, 1, TRUE, 40.00, 'whole foods drained my whole wallet', NULL);
