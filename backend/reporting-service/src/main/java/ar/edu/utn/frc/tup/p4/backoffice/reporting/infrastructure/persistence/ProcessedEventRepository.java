package ar.edu.utn.frc.tup.p4.backoffice.reporting.infrastructure.persistence;

import ar.edu.utn.frc.tup.p4.backoffice.reporting.domain.model.ProcessedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio de eventos procesados (deduplicación por eventId).
 */
public interface ProcessedEventRepository extends JpaRepository<ProcessedEvent, String> {
}