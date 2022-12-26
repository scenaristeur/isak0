CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE IF NOT EXISTS "executions"(
    time     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    scenario  TEXT,
    duree     NUMERIC,
    injecteur TEXT,
    status    INTEGER
);

SELECT create_hypertable('executions', 'time');
