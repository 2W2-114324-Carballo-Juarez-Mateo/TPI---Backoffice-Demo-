-- V1__init.sql - Administration service
CREATE TABLE IF NOT EXISTS global_parameter (
    id          UUID PRIMARY KEY,
    param_key   VARCHAR(20)  NOT NULL UNIQUE,
    value       TEXT         NOT NULL,
    version     INTEGER      NOT NULL DEFAULT 1,
    updated_by  VARCHAR(50),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outbox_message (
    id          UUID PRIMARY KEY,
    event_type  VARCHAR(80) NOT NULL,
    payload     TEXT        NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_outbox_status ON outbox_message (status);