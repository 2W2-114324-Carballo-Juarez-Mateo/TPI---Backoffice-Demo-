import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard-consolidado', pathMatch: 'full' },
  {
    path: 'dashboard-consolidado',
    loadComponent: () =>
      import('./pages/dashboard-consolidado/dashboard-consolidado').then(
        (m) => m.DashboardConsolidado
      ),
  },
  {
    path: 'observabilidad-institucional',
    loadComponent: () =>
      import('./pages/observabilidad-institucional/observabilidad-institucional').then(
        (m) => m.ObservabilidadInstitucional
      ),
  },
  {
    path: 'gestion-catedras',
    loadComponent: () =>
      import('./pages/gestion-catedras/gestion-catedras').then(
        (m) => m.GestionCatedras
      ),
  },
  {
    path: 'panel-profesor',
    loadComponent: () =>
      import('./pages/panel-profesor/panel-profesor').then(
        (m) => m.PanelProfesor
      ),
  },
  {
    path: 'reportes-analiticos',
    loadComponent: () =>
      import('./pages/reportes-analiticos/reportes-analiticos').then(
        (m) => m.ReportesAnaliticos
      ),
  },
  {
    path: 'parametros-globales',
    loadComponent: () =>
      import('./pages/parametros-globales/parametros-globales').then(
        (m) => m.ParametrosGlobales
      ),
  },
  {
    path: 'motor-configuracion',
    loadComponent: () =>
      import('./pages/motor-configuracion/motor-configuracion').then(
        (m) => m.MotorConfiguracion
      ),
  },
  {
    path: 'gobernanza-llm',
    loadComponent: () =>
      import('./pages/gobernanza-llm/gobernanza-llm').then(
        (m) => m.GobernanzaLlm
      ),
  },
  {
    path: 'salud-trazabilidad',
    loadComponent: () =>
      import('./pages/salud-trazabilidad/salud-trazabilidad').then(
        (m) => m.SaludTrazabilidad
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard-consolidado',
  },
];
