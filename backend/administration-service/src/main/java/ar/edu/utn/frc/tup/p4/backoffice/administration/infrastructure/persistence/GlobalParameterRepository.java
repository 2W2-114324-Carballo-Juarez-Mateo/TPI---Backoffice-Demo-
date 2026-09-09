package ar.edu.utn.frc.tup.p4.backoffice.administration.infrastructure.persistence;

import ar.edu.utn.frc.tup.p4.backoffice.administration.domain.model.GlobalParameter;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio de parámetros globales.
 */
public interface GlobalParameterRepository extends JpaRepository<GlobalParameter, UUID> {

    Optional<GlobalParameter> findByKey(String key);
}