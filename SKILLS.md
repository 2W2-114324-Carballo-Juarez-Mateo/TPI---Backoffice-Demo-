# SKILLS — Cómo se hace (Backoffice · Back + Front)

> Procedimientos paso a paso para las tareas frecuentes del monorepo. Aplican a **Back (BE)** y **Front (FE)**. Son recetas: asumen que leíste el diseño correspondiente. Detalle por área en `sdd/` (fuente de verdad).

## Índice rápido

| Skill | Para qué |
|---|---|
| Compilar, testear y correr | Ver abajo §1 |
| Agregar un endpoint REST (punta a punta) | §2 |
| Publicar/consumir un evento (Outbox + Kafka) | §3 |
| Estructurar un caso de uso (Command) y aplicar un patrón | §4 |
| Seguridad y autorización (2 niveles) | §5 |
| Docker, despliegue y migraciones Flyway | §6 |
| Front: agregar una vista | §7 |
| Front: Nginx, single-flight, sesión | §8 |

---

## 1 · Compilar, testear y correr

**Back (Maven multi-módulo):**
```bash
cd BE && mvn clean verify        # compila + tests de todo el multi-módulo
mvn spring-boot:run -pl BE/administration-service -Dspring-boot.run.profiles=docker
```
- Tests unitarios de dominio/casos de uso + **integración con Testcontainers** (PostgreSQL + Kafka).
- Cobertura objetivo **≥ 90%** en lo posible.

**Front (Angular 21):**
```bash
cd FE && npm install
npm start        # dev server con proxy: /api → http://localhost:8080 (gateway)
npm run build    # genera FE/dist/backoffice-angular (estático)
```

**Infra completa (Back):**
```bash
docker compose -f .compose/docker-compose.yml up -d --build
# Gateway: http://localhost:8080 · Eureka: :8761 · admin: :8092 · reporting: :8093
```

## 2 · Agregar un endpoint REST (punta a punta)

1. **Contrato:** definí el DTO y documentalo en OpenAPI/springdoc.
2. **API:** controller liviano (sin reglas de negocio) → llama al caso de uso.
3. **Application:** caso de uso (Command/Query) que orquesta; valida permisos con **Specification**.
4. **Domain:** entidad/regla de negocio; **nunca** lógica de negocio en controller.
5. **Infrastructure:** repositorio JPA / adapter externo.
6. **Autorización:** verificá **2 niveles** (gateway + servicio) y ámbito (`course_id` si aplica).
7. **Tests:** unitario (caso de uso) + integración (Testcontainers) + 200/403.
8. Sincronizá `sdd/`.

## 3 · Publicar / consumir un evento (Outbox + Kafka)

**Publicar (producer):**
1. Evento en `domain/events` con el **envelope estándar** (`eventId`, `eventType`, `occurredAt`, `correlationId`, `actorId`, `source`, `payload`).
2. En el caso de uso, tras persistir, escribí el `OutboxMessage` **en la misma transacción**.
3. El publicador lee pendientes → publica en el topic (ej. `administration.events`) → marca `PUBLISHED`.
4. `eventId` único y **versión monótona** (base de la idempotencia del consumidor).

**Consumir (consumer, ej. reporting):**
1. Deduplicá por `event_id` (`processed_events`); si ya se procesó → descartá.
2. Transformá el payload en read model.
3. Malformados → **DLT** sin bloquear el partition.
4. Validá **frescura ≤ 15 min** y avisá si un tema se atrasa.

## 4 · Caso de uso (Command) + patrones

- **Command** para operaciones que escriben; **Query** para lecturas (CQRS).
- **Specification** para reglas/permisos compuestos.
- **Adapter** por tema externo (un cliente por dominio ajeno).
- **Null Object / fallback** para degradación.
- **Observer + Outbox** para eventos · **Unit of Work** para tx + outbox · **Idempotency-Key** en operaciones críticas.
- Reglas de negocio en **domain**, nunca en controllers.

## 5 · Seguridad y autorización

- **Validar ≠ autorizar:** el gateway (T01) valida el JWT y propaga contexto; el **microservicio** autoriza localmente (`@PreAuthorize`) por rol y ámbito. No validamos firma/exp del token.
- **Ámbito multitenancy:** `TenantContext` setea `app.current_course` desde el rol validado (nunca del request). RLS filtra por `course_id`; `ALL` se deriva server-side del rol `ADMIN` (no viaja en token/headers) y se audita.
- Roles reales: `ADMIN` (escribe/administra) · `PROFESOR` (solo su curso) · `ALUMNO` · `MS` (service-to-service). **No existe `AUDITOR`**.
- **Secretos:** nada de claves en repo/logs/respuestas; enmascarar (ej. API keys `sk-****`).

## 6 · Docker, despliegue, Flyway

- **Dockerfile 2 etapas** (compila con maven → corre con JRE).
- **Flyway:** cada cambio de esquema es una migración `V{n}__*.sql`; `ddl-auto: validate`.
- **Config por ambiente:** perfiles (`application.yml` / `-docker.yml`); secretos por variables, nunca en el repo.
- Verificación: health del gateway + apps registradas en Eureka.

## 7 · Front: agregar una vista

1. Componente **Standalone**, **OnPush**, **Signals**; UI desde `@tup/ui`.
2. Servicio que consume `/api/...` (vía proxy/BFF); **sin tokens en JS** (cookie httpOnly).
3. Interceptor con **single-flight** (dedupe) + manejo de **429** (`Retry-After`).
4. Estado: **servidor = fuente de verdad**; sin store global cross-app (Custom Events para avisos).
5. Si hay deep-link → verificá el fallback de Nginx (el index de esa app).

## 8 · Front: Nginx y sesión

- **Fallback por prefijo:** `try_files $uri $uri/ /backoffice/index.html` (el index de ESA app).
- **Cache:** `index.html` no-cache · assets con hash → `immutable`.
- **Sesión:** cookie httpOnly + Secure + SameSite; 401 → login conservando el intento.

---

> **Transversal:** tras cada tarea, actualizá `sdd/` y este archivo si cambió un procedimiento. Estimación: **SP (Fibonacci)** en la historia, **horas** en la tarea. Convención de tareas: `[G06] - [ROL] - [Descripción]`.