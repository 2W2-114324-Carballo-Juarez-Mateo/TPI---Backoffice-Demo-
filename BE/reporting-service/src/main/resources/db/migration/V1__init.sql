-- V1__init.sql - Reporting service
CREATE TABLE IF NOT EXISTS processed_event (
    event_id     VARCHAR(80) PRIMARY KEY,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cohort_metrics_snapshot (
    id               UUID PRIMARY KEY,
    course_id        UUID        NOT NULL,
    csat_score       NUMERIC(5,2),
    active_weekly    BIGINT,
    approval_rate    NUMERIC(5,2),
    at_risk_students BIGINT,
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_snapshot_course ON cohort_metrics_snapshot (course_id);