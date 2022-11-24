ALTER TABLE public.organization
    ADD COLUMN initial_retained_earnings numeric DEFAULT 0;

CREATE TABLE public.income_statement_format_position
(
    id bigserial NOT NULL,
    name character varying(64),
    PRIMARY KEY (id)
);

ALTER TABLE public.income_statement_format_position
    OWNER to postgres;

CREATE TABLE public.cash_flow_format_position
(
    id bigserial NOT NULL,
    name character varying(64),
    PRIMARY KEY (id)
);

ALTER TABLE public.cash_flow_format_position
    OWNER to postgres;

CREATE TABLE public.balance_sheet_format_position
(
    id bigserial NOT NULL,
    name character varying(64),
    PRIMARY KEY (id)
);

ALTER TABLE public.balance_sheet_format_position
    OWNER to postgres;

ALTER TABLE public.account
    ADD COLUMN income_statement_format_position_id bigint;

ALTER TABLE public.account
    ADD COLUMN cash_flow_format_position_id bigint;

ALTER TABLE public.account
    ADD COLUMN balance_sheet_format_position_id bigint;

ALTER TABLE public.account
    ADD COLUMN cash_item boolean;

ALTER TABLE public.account
    ADD COLUMN relevant_to_taxes_paid boolean;

ALTER TABLE public.account
    ADD COLUMN relevant_to_interest_paid boolean;

ALTER TABLE public.account
    ADD CONSTRAINT "account_ income_statement_format_position_id_fkey" FOREIGN KEY (income_statement_format_position_id)
    REFERENCES public.income_statement_format_position (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX "fki_account_ income_statement_format_position_id_fkey"
    ON public.account(income_statement_format_position_id);

ALTER TABLE public.account
    ADD CONSTRAINT account_cash_flow_format_position_id_fkey FOREIGN KEY (cash_flow_format_position_id)
    REFERENCES public.cash_flow_format_position (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX fki_account_cash_flow_format_position_id_fkey
    ON public.account(cash_flow_format_position_id);

ALTER TABLE public.account
    ADD CONSTRAINT account_balance_sheet_format_position_id_fkey FOREIGN KEY (balance_sheet_format_position_id)
    REFERENCES public.balance_sheet_format_position (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX fki_account_balance_sheet_format_position_id_fkey
    ON public.account(balance_sheet_format_position_id);

ALTER TABLE public.account_subtype
    ADD COLUMN income_statement_format_position_id bigint;

ALTER TABLE public.account_subtype
    ADD COLUMN cash_flow_format_position_id bigint;

ALTER TABLE public.account_subtype
    ADD COLUMN balance_sheet_format_position_id bigint;

ALTER TABLE public.account_subtype
    ADD COLUMN cash_item boolean;

ALTER TABLE public.account_subtype
    ADD COLUMN relevant_to_taxes_paid boolean;

ALTER TABLE public.account_subtype
    ADD COLUMN relevant_to_interest_paid boolean;

ALTER TABLE public.account_subtype
    ADD CONSTRAINT account_subtype_income_statement_format_position_id_fkey FOREIGN KEY (income_statement_format_position_id)
    REFERENCES public.income_statement_format_position (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX fki_account_subtype_income_statement_format_position_id_fkey
    ON public.account_subtype(income_statement_format_position_id);

ALTER TABLE public.account_subtype
    ADD CONSTRAINT account_subtype_cash_flow_format_position_id_fkey FOREIGN KEY (cash_flow_format_position_id)
    REFERENCES public.cash_flow_format_position (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX fki_account_subtype_cash_flow_format_position_id_fkey
    ON public.account_subtype(cash_flow_format_position_id);

ALTER TABLE public.account_subtype
    ADD CONSTRAINT account_subtype_balance_sheet_format_position_id_fkey FOREIGN KEY (balance_sheet_format_position_id)
    REFERENCES public.balance_sheet_format_position (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX fki_account_subtype_balance_sheet_format_position_id_fkey
    ON public.account_subtype(balance_sheet_format_position_id);

ALTER TABLE public.account_subtype
    ADD COLUMN relevant_to_dividends_paid boolean;

ALTER TABLE public.account_subtype
    ADD COLUMN relevant_to_depreciation_amortization boolean;

ALTER TABLE public.account
    ADD COLUMN relevant_to_dividends_paid boolean;

ALTER TABLE public.account
    ADD COLUMN relevant_to_depreciation_amortization boolean;

INSERT INTO income_statement_format_position(name)
    VALUES
        ('None'),
        ('Revenue'),
        ('Cost of sales'),
        ('Operating expenses'),
        ('Income/expense from investing'),
        ('Income/expense from financing'),
        ('Other non-operating income/expense'),
        ('Interest expense'),
        ('Tax expense'),
        ('Non-recurring and extraordinary items');

INSERT INTO cash_flow_format_position(name)
    VALUES
        ('None'),
        ('Operating activities'),
        ('Investing activities'),
        ('Financing activities'),
        ('Cash and cash equivalents');

INSERT INTO balance_sheet_format_position(name)
    VALUES
        ('None'),
        ('Current assets'),
        ('Non-current assets'),
        ('Current liabilities'),
        ('Non-current liabilities'),
        ('Paid-in capital'),
        ('Share-based compensation'),
        ('Dividends and equivalents'),
        ('Other equity items');

INSERT INTO account_subtype(name, account_type_id, income_statement_format_position_id, cash_flow_format_position_id, balance_sheet_format_position_id, cash_item, relevant_to_taxes_paid, relevant_to_interest_paid, relevant_to_dividends_paid, relevant_to_depreciation_amortization)
    VALUES 
        ('Interest payable', 2, 1, 2, 4, false, false, true, false, false),
        ('Taxes payable', 2, 1, 2, 4, false, true, false, false, false),
        ('Non-recurring and extraordinary items', 4, 10, 2, 1, true, false, false, false, false); 

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 5,
        balance_sheet_format_position_id = 2,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 1;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 2,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 2;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 2,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id >= 3 AND id <= 5;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 6;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 7;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = true
    WHERE id = 8 OR id = 9;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 10;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 11;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = true, 
        relevant_to_depreciation_amortization = false
    WHERE id = 12;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = true, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 37;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = true, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 38;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 13;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 14;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = true, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 15;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 16;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 5,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 17;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 5,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 18 OR id = 19;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 6,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 20;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 7,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 21;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 8,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = true, 
        relevant_to_depreciation_amortization = false
    WHERE id = 22;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 9,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 23;

UPDATE account_subtype
    SET income_statement_format_position_id = 2,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 24;

UPDATE account_subtype
    SET income_statement_format_position_id = 5,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 25;

UPDATE account_subtype
    SET income_statement_format_position_id = 6,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 26;

UPDATE account_subtype
    SET income_statement_format_position_id = 7,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 36;

UPDATE account_subtype
    SET income_statement_format_position_id = 10,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 39;

UPDATE account_subtype
    SET income_statement_format_position_id = 3,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 27;

UPDATE account_subtype
    SET income_statement_format_position_id = 4,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 28 OR id = 29;

UPDATE account_subtype
    SET income_statement_format_position_id = 4,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = true
    WHERE id = 30;

UPDATE account_subtype
    SET income_statement_format_position_id = 5,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 31;

UPDATE account_subtype
    SET income_statement_format_position_id = 6,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 32;

UPDATE account_subtype
    SET income_statement_format_position_id = 8,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = true, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 33;

UPDATE account_subtype
    SET income_statement_format_position_id = 9,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = true, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 34;

UPDATE account_subtype
    SET income_statement_format_position_id = 10,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 35;


UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 5,
        balance_sheet_format_position_id = 2,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND parent_account.account_subtype_id = 1;
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 5,
        balance_sheet_format_position_id = 2,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE account.account_subtype_id = 1;

UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 2,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND parent_account.account_subtype_id = 2;
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 2,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE account.account_subtype_id = 2;

UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 2,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND parent_account.account_subtype_id >= 3 AND parent_account.account_subtype_id <= 5;
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 2,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE account.account_subtype_id >= 3 AND account.account_subtype_id <= 5;

UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND parent_account.account_subtype_id = 6;
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE account.account_subtype_id = 6;

UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND parent_account.account_subtype_id = 7;
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE account.account_subtype_id = 7;

UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = true
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND (parent_account.account_subtype_id = 8 OR parent_account.account_subtype_id = 9);
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = true
    WHERE account.account_subtype_id = 8 OR account.account_subtype_id = 9;

UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    FROM account AS parent_account 
    WHERE account.parent_account_id = parent_account.id 
    AND parent_account.account_subtype_id = 10;
UPDATE account
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 3,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE account.account_subtype_id = 10;

/**/
UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 11;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = true, 
        relevant_to_depreciation_amortization = false
    WHERE id = 12;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = true, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 37;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = true, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 38;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 13;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 14;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = true, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 15;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 4,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 16;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 5,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 17;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 5,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 18 OR id = 19;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 6,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 20;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 7,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 21;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 8,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = true, 
        relevant_to_depreciation_amortization = false
    WHERE id = 22;

UPDATE account_subtype
    SET income_statement_format_position_id = 1,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 9,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 23;

UPDATE account_subtype
    SET income_statement_format_position_id = 2,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 24;

UPDATE account_subtype
    SET income_statement_format_position_id = 5,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 25;

UPDATE account_subtype
    SET income_statement_format_position_id = 6,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 26;

UPDATE account_subtype
    SET income_statement_format_position_id = 7,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 36;

UPDATE account_subtype
    SET income_statement_format_position_id = 10,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 39;

UPDATE account_subtype
    SET income_statement_format_position_id = 3,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 27;

UPDATE account_subtype
    SET income_statement_format_position_id = 4,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 28 OR id = 29;

UPDATE account_subtype
    SET income_statement_format_position_id = 4,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = false,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = true
    WHERE id = 30;

UPDATE account_subtype
    SET income_statement_format_position_id = 5,
        cash_flow_format_position_id = 3,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 31;

UPDATE account_subtype
    SET income_statement_format_position_id = 6,
        cash_flow_format_position_id = 4,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 32;

UPDATE account_subtype
    SET income_statement_format_position_id = 8,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = true, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 33;

UPDATE account_subtype
    SET income_statement_format_position_id = 9,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = true, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 34;

UPDATE account_subtype
    SET income_statement_format_position_id = 10,
        cash_flow_format_position_id = 2,
        balance_sheet_format_position_id = 1,
        cash_item = true,
        relevant_to_taxes_paid = false, 
        relevant_to_interest_paid = false, 
        relevant_to_dividends_paid = false, 
        relevant_to_depreciation_amortization = false
    WHERE id = 35;
