ALTER TABLE journal_entry ADD COLUMN description_search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', description)) STORED;

CREATE INDEX journal_entry_description_search_index ON journal_entry USING GIN (description_search_vector);


ALTER TABLE line_item ADD COLUMN description_search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', description)) STORED;

CREATE INDEX line_item_description_search_index ON line_item USING GIN (description_search_vector);
