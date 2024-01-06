ALTER TABLE journal_entry ADD COLUMN description_search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', description)) STORED;

CREATE INDEX description_search_index ON journal_entry USING GIN (description_search_vector);