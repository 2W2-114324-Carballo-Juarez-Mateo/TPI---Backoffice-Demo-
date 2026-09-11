# UTN FRC — Backoffice Institucional (Tema 12)

> **Cátedra:** Programación IV / Trabajo Práctico Integrador (TPI)  
> **Institución:** Universidad Tecnológica Nacional — Facultad Regional Córdoba  
> **Comisión / Grupo:** 2W2 — Grupo 6  
> **Stack:** Angular 21.2 Standalone · Signals & OnPush · Tailwind CSS (Material 3 Tokens) · Nginx  

---

## 📌 Descripción del Módulo

Esta aplicación constituye la **Single Page Application (SPA)** de administración, observabilidad y reportería de la *Plataforma de Aprendizaje Gamificado de Programación y Desarrollo de Software*.

El **Tema 12** es un **Consumidor Puro y Orquestador de Parámetros** sin dominio operativo propio: no compite con otros temas ni altera entidades de negocio ajenas, centralizando la configuración global, la gobernanza de modelos LLM y la visibilidad del rendimiento académico.

---

## 🧭 Las 9 Vistas de la SPA

1. **Dashboard Consolidado (`/dashboard-consolidado`):** Gráfico semanal SVG de volumen transaccional, alertas del sistema por severidad y monitoreo de APIs.
2. **Observabilidad Institucional (`/observabilidad-institucional`):** Los 4 KPIs del PRD (CSAT Global 86.4%, CSAT Cursos 82.1% con N ≥ 5, Aprobación/Abandono 74.8%/8.4%, Promoción P90 8.9%), monitor de deriva LLM y feed de seguridad mitigada.
3. **Gestión de Cátedras (`/gestion-catedras`):** Matriz de permisos a microservicios (1 al 6), Lista Blanca Docente (`RF-USR-02`) y catálogo de versiones de contratos OpenAPI.
4. **Panel del Profesor (`/panel-profesor`):** Vista confidencial de cohorte (`RF-RPT-07`), Alumnos en Riesgo Académico (`RF-RPT-03`), SLA de datos en tiempo real (4 min), nómina anonimizada y exportación CSV (`RF-RNK-13`).
5. **Reportes Analíticos (`/reportes-analiticos`):** Distribución de XP en 5 niveles, Donut de retención vs desafíos (88.3%) y rendimiento por asignatura.
6. **Parámetros Globales (`/parametros-globales`):** Consola de negocio de los 18 parámetros (`PAR-01` a `PAR-18`), módulos consumidores e inmutabilidad hacia adelante (`RF-CFG-06`).
7. **Motor de Configuración (`/motor-configuracion`):** Estado de sincronización técnica en clúster y bitácora de auditoría forense `AdminAuditLog` (`RF-AUD-02`).
8. **Gobernanza LLM (`/gobernanza-llm`):** Asignación inmutable del Evaluador Único Activo (`RF-IA-25`: Claude 3.5 Sonnet) y calibración ciega *Golden Set* en 5 dimensiones con tolerancia $\le \pm 5$ pts (`PAR-14`).
9. **Salud y Trazabilidad (`/salud-trazabilidad`):** Bento cards con telemetría de CPU y latencia en tiempo real, junto a trazas distribuidas cross-service con Trace IDs.

---

## 📚 Documentación de Arquitectura y Contratos

Para consultar el marco teórico completo y los acuerdos de integración entre temas:

- 📘 [**Guía Integral de Arquitectura y Especificación (Tema 12)**](../Backoffice-TPI-main/Backoffice-TPI-main/GUIA_INTEGRAL_BACKOFFICE_TEMA12.md)
- 🛡️ [**Delimitación de Dominio, Límites y Contratos Inter-Grupos**](../Backoffice-TPI-main/Backoffice-TPI-main/DELIMITACION_DOMINIO_LIMITES_Y_CONTRATOS.md)
- 🗺️ [**Mapa de Temas e Integración de Plataforma**](../Backoffice-TPI-main/Backoffice-TPI-main/Temas.md)

---

## 🚀 Desarrollo Local

### Requisitos
- Node.js 20+ o 22+
- npm 10+

### Servidor de Desarrollo
```bash
npm start
# O alternativamente:
ng serve
```
Navegar a `http://localhost:4200/`. La aplicación recarga automáticamente ante cualquier cambio.

### Verificación Estática de Tipos (TypeScript)
```bash
node ./node_modules/typescript/bin/tsc --noEmit
```
*(Cero errores de compilación garantizados).*
