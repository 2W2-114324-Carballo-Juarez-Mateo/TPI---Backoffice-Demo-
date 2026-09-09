package ar.edu.utn.frc.tup.p4.backoffice.administration.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Parámetro global de la plataforma (PAR-01..PAR-24).
 */
@Entity
@Table(name = "global_parameter")
public class GlobalParameter {

    @Id
    private UUID id;

    @Column(name = "param_key", unique = true, nullable = false, length = 20)
    private String key;

    @Column(name = "value", nullable = false)
    private String value;

    @Column(name = "version", nullable = false)
    private int version;

    @Column(name = "updated_by", length = 50)
    private String updatedBy;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected GlobalParameter() {
        // requerido por JPA
    }

    public GlobalParameter(String key, String value, int version, String updatedBy, OffsetDateTime updatedAt) {
        this.id = UUID.randomUUID();
        this.key = key;
        this.value = value;
        this.version = version;
        this.updatedBy = updatedBy;
        this.updatedAt = updatedAt;
    }

    public UUID getId() {
        return id;
    }

    public String getKey() {
        return key;
    }

    public String getValue() {
        return value;
    }

    public int getVersion() {
        return version;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}