package ar.edu.utn.frc.tup.p4.backoffice.contracts;

/**
 * Envelope canónico de eventos de la plataforma.
 *
 * @param eventId       identificador único del evento (UUID v4) - idempotencia
 * @param eventType     tipo de evento (ej. GlobalConfigurationChanged)
 * @param occurredAt    fecha/hora de ocurrencia (ISO-8601)
 * @param correlationId identificador de correlación
 * @param actorId       identificador del actor que generó el evento
 * @param source        servicio productor (ej. tema-12-backoffice)
 * @param payload       contenido del evento
 */
public record EventEnvelope(
        String eventId,
        String eventType,
        String occurredAt,
        String correlationId,
        String actorId,
        String source,
        Object payload) {
}