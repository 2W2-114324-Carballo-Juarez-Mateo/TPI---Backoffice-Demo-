# BackOffice · Tema 12 — TPI (G06)

Trabajo Práctico Integrador de **Programación IV / Metodología de Sistemas II** (UTN · FRC · TUP).
Módulo **Backoffice Institucional, Analítica y Configuración Global**.

## Estructura

```
BE/
├── contracts/                    # DTOs y envelope de eventos compartidos
├── infrastructure/
│   ├── eureka-server/            # Service Discovery · :8761
│   ├── config-server/            # Config Server · :8888
│   └── gateway-local/            # Gateway SIMULADO (el real es de T01) · :8080
├── administration-service/       # Administration & Configuration · :8092
└── reporting-service/            # Reporting & Analytics · :8093
.compose/docker-compose.yml       # Infra (BD, Kafka, Eureka, Config, Gateway) + servicios
.code_quality/                    # Checkstyle + PMD
.github/workflows/                # CI: verify (PR) · build-and-push (main) · branching check
docs/                             # api_doc (Swagger) · app_doc · java_doc
config/                           # Configuración del Config Server (perfiles)
```

## Tecnologías
Java 21 · Spring Boot 4 · Maven (mono-módulo) · PostgreSQL (1 datasource, 2 esquemas: `administration`/`reporting`) · Kafka · Eureka (Discovery) · Flyway · Testcontainers · GitHub Actions · Checkstyle/PMD.
> Este repo (Demo) conserva la estructura multi-módulo anterior; la **entrega** es mono-módulo en el repo oficial (espejo `tpi-backoffice-espejo/`).

## Estado del scaffold (para arrancar el Sprint 1)

> **Arquitectura acordada:** mono-módulo con **1 datasource + 2 esquemas** (`administration` y `reporting`), alineado al repo oficial `2026-P4-BE/tpi-backoffice` (espejo en `Repositorio DEMO/tpi-backoffice-espejo/`, `mvn verify` verde). **Frontend canónico:** la carpeta `FE/` de este repo. Las tareas del Sprint 1 **completan/implementan** sobre este esqueleto (no "crean de cero"). Ya existe:

| Ya en el scaffold | Dónde |
|---|---|
| Mono-módulo Boot 4 (1 datasource + 2 esquemas: `administration`/`reporting`) | `tpi-backoffice-espejo/` (espejo del repo oficial) |
| Migración `V1__init.sql` (`global_parameter`, `outbox_message` en `administration`; `processed_event`, `cohort_metrics_snapshot`, `report_template` en `reporting`) | `src/main/resources/db/migration/` |
| Envelope y evento `EventEnvelope`, `GlobalConfigurationChanged` (a alinear con el DTO oficial de cátedra, pendiente) | `BE/contracts/` |
| Flyway único + DataSource único + Kafka (KRaft) | `.compose/` (1 PG + Kafka) |
| Health endpoint | `BE/api/HealthController.java` |

**Naming de tabla Outbox:** usar **`outbox_message`** (como el scaffold), no `outbox_events`. Las tareas referencian `outbox_events` en algunos docs → se está alineando a `outbox_message`.

## Flujo de ramas (obligatorio)

```
feature/<tema>  (rama propia de cada dev, desde develop)
      │ PR con ≥1 review
      ▼
   develop  ← acá se integra el trabajo del sprint
      │ (solo al final/entrega)
      ▼
    main
```

- Cada dev trabaja en **su propia rama** `feature/...` y al terminar hace **PR a `develop`**.
- **`main` solo al final** (entrega). 
- **Excepción actual:** los cambios de **scaffolding** (esta etapa inicial) van a `main` directo; cuando arranque el desarrollo, todo pasa por `develop`.
- Detalle completo: `RULES.md` (sección "Flujo de ramas").

## Puertos internos
| Servicio | Puerto |
|---|---|
| gateway-local | 8080 |
| eureka-server | 8761 |
| config-server | 8888 |
| administration-service | 8092 |
| reporting-service | 8093 |
| kafka | 9092 |
| postgres administration-db | 5432 |
| postgres reporting-db | 5433 |

## Comandos rápidos
Ver `COMMANDS.md`. Build del backend: `mvn clean verify` (desde la raíz).

> Los puertos para comunicarnos con **otros microservicios** (gateway real de T01, broker compartido) se acuerdan con los demás equipos.