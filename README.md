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
Java 21 · Spring Boot 3 · Maven (multi-módulo) · PostgreSQL (una base por servicio) · Kafka · Eureka · Config Server · Spring Cloud Gateway (local) · Flyway · Testcontainers · GitHub Actions · Checkstyle/PMD.

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