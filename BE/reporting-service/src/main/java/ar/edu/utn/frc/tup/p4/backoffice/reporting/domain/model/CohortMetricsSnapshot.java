package ar.edu.utn.frc.tup.p4.backoffice.reporting.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Snapshot de métricas por curso-cohorte (tenant = course_id, RLS).
 */
@Entity
@Table(name = "cohort_metrics_snapshot")
public class CohortMetricsSnapshot {

    @Id
    private UUID id;

    @Column(name = "course_id", nullable = false)
    private UUID courseId;

    @Column(name = "csat_score", precision = 5, scale = 2)
    private BigDecimal csatScore;

    @Column(name = "active_weekly")
    private Long activeWeekly;

    @Column(name = "approval_rate", precision = 5, scale = 2)
    private BigDecimal approvalRate;

    @Column(name = "at_risk_students")
    private Long atRiskStudents;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected CohortMetricsSnapshot() {
        // requerido por JPA
    }

    public UUID getId() {
        return id;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public BigDecimal getCsatScore() {
        return csatScore;
    }

    public Long getActiveWeekly() {
        return activeWeekly;
    }

    public BigDecimal getApprovalRate() {
        return approvalRate;
    }

    public Long getAtRiskStudents() {
        return atRiskStudents;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}