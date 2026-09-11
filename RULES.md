# RULES — Reglas de trabajo (Backoffice · Back + Front)

> Restricciones **imperativas** para la IA y el equipo. **Tienen prioridad** sobre cualquier preferencia de estilo. Si un `docs/` contradice una rule, manda la rule y reportá la contradicción. Aplican a **Back (BE)** y **Front (FE)**.

## 0 · No negociables

1. **No inventar requerimientos:** todo cambio traza a un RF/PAR del PRD (`RF-XXX`, `PAR-01..18`). Sin RF → preguntar, no codear.
2. **No implementar dominios de otros temas:** el BackOffice es consumidor puro/orquestador; NO crea servicios ni entidades de cursos, desafíos, usuarios o pagos (solo consume eventos). No invocar LLMs (lo hace T07).
3. **Database per Service:** ningún servicio toca la DB de otro; relaciones solo por API/eventos.
4. **Sin secretos** en el repo, logs ni respuestas (enmascarar). No loguear PII ni credenciales.
5. **Sin hard delete** en producción académica: baja lógica (`deleted_at`/`deleted_by`/`deletion_reason`).
6. **Configuración hacia adelante:** un cambio de parámetro global NUNCA recalcula XP/monedas históricos (RF-CFG-06).

## 1 · Arquitectura (Back)

- **Clean Architecture** por módulo: `domain` → `application` → `infrastructure` → `api`. Capa por capa, dependencias hacia adentro. Reglas de negocio en `domain`, orquestación en `application`, controllers livianos.
- **REST + eventos (Kafka, RabbitMQ = alternativa):** escrituras por comando síncrono y/o evento con **Outbox en la misma transacción**; lecturas de otros temas por contratos REST → read models.
- **Idempotencia obligatoria** en consumidores (`event_id` + versión monótona) y soporte `Idempotency-Key` en operaciones críticas.
- **Multitenancy + RLS:** filtro por `course_id` desde `TenantContext` (nunca del request); RLS como refuerzo; `ALL` solo ADMIN y auditado.
- **Validar ≠ autorizar:** gateway valida (T01); el microservicio autoriza por rol y ámbito (`ROLE_ADMIN`/`ROLE_TEACHER`/`ROLE_AUDITOR`).
- **Trazabilidad:** correlationId en logs y trazas distribuidas; logs estructurados.
- Invariantes de negocio (último ADMIN, auto-eliminación, baja reforzada 2FA, evaluador único + calibración PAR-14, auditoría inmutable, anonimato de encuestas): **nunca** se negocian en código.

## 2 · Arquitectura (Front)

- **Angular Standalone, Signals, OnPush;** Tailwind/Material 3 tokens; UI desde `@tup/ui`.
- **Servidor = fuente de verdad:** sin store global cross-app; Custom Events para avisos. Sesión con cookie **httpOnly + Secure + SameSite**; nunca tokens en JS.
- **Nginx:** fallback por prefijo (`try_files ... /backoffice/index.html`), `index.html` no-cache, assets con hash `immutable`.
- No duplicar lógica de negocio en el front: solo presentación + orquestación de vistas (9 vistas de la SPA).

## 3 · Patrones y algoritmos

- **Command/Query (CQRS)** · **Specification** · **Adapter** (un cliente por tema externo) · **Null Object/fallback** · **Observer + Outbox** · **Unit of Work** · **Idempotency Key**.
- **Algoritmos:** dedupe por hash/`event_id` (set/bitmap) para idempotencia; agregados/consultas agregadas para métricas (nunca filas personales); índices sobre `course_id` y columnas de filtro; orden estable (`ORDER BY` determinista) y paginación con cursor para listas grandes.
- **Complejidad:** elegí estructuras/tamaño acordes al volumen (PostgreSQL, Kafka); evitá N+1 (fetch join/`@EntityGraph`); batch en consumidores.
- **Testing:** casos nominales + bordes + fallo (timeout, DLT, concurrencia). Cobertura objetivo **≥ 90%**.

## 4 · Proceso y DoD

- **Repos:** la IA y el equipo trabajan en ramas `feature/<tema>`; **PR con ≥ 1 review** de compañero; `main` protegido. Mensajes de commit en español, formato convencional (ej. `feat(administration): endpoint de parámetros`).
- **Estimación:** historia = **SP (Fibonacci)**, tarea = **horas**. Convención de tareas: `[G06] - [ROL] - [Descripción]`. Roles: BACKEND / FRONTEND / TEST / DOCUMENTACION / REVISION.
- **DoD (3 niveles):** **N0 Tarea** (pasos cumplidos + horas reales) · **N1 Historia** (testeado, cobertura, sin deuda, documentado) · **N2 Entrega** (demo funcionando de punta a punta, docs al día, sin pendientes críticos). Nivel 0 es condición para avanzar.
- **Backlog:** todo lo pendiente vive en el backlog general de Sprint 0; no atar tareas a sprint hasta que la propuesta lo defina.
- **Sync de documentación:** después de CADA tarea, actualizá `sdd/`, `SKILLS.md`/`RULES.md` y la documentación afectada si cambió algo.

## 5 · Comunicación

- Si una tarea parece violar una rule o un RF se contradice → **preguntá antes de codear**.
- Reportá riesgos técnicos (acoplamiento a otro tema, bloqueos de contrato) apenas aparezcan.
- No asumas acceso/contratos de otros equipos: coordiná (contratos OpenAPI, topic names) antes de integrar.