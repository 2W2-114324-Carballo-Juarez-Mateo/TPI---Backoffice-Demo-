package ar.edu.utn.frc.tup.p4.backoffice.contracts;

/**
 * Evento de cambio de un parámetro global (propagado a los consumidores).
 *
 * @param key         clave del parámetro (PAR-01..PAR-24)
 * @param value       valor vigente
 * @param version     versión del parámetro (descarta v <= local)
 */
public record GlobalConfigurationChanged(
        String key,
        Object value,
        int version) {
}