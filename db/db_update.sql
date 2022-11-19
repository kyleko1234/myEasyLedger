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