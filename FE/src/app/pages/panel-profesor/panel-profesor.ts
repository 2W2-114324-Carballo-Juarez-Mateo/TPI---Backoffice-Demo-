import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface StudentRow {
  readonly legajo: string;
  readonly name: string;
  readonly email: string;
  readonly desafiosRatio: string;
  readonly desafiosPercent: number;
  readonly vidas: number;
  readonly maxVidas: number;
  readonly xp: number;
  readonly level: string;
  readonly status: 'Ritmo Óptimo' | 'Regular' | 'En Riesgo';
  readonly statusDetail: string;
}

@Component({
  selector: 'app-panel-profesor',
  imports: [],
  templateUrl: './panel-profesor.html',
  styleUrl: './panel-profesor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelProfesor {
  readonly selectedCohort = signal<string>('Programación III - Comisión 2W2 (2026)');
  readonly filterSegment = signal<'todos' | 'riesgo' | 'optimo' | 'regular'>('todos');
  readonly searchTerm = signal<string>('');
  readonly freshnessMinutes = signal<number>(4);
  readonly isSyncingFreshness = signal<boolean>(false);
  readonly toastMessage = signal<string>('');

  readonly students = signal<readonly StudentRow[]>([
    {
      legajo: '100001',
      name: 'Estudiante 01',
      email: 'estudiante01@alumnos.frc.utn.edu.ar',
      desafiosRatio: '18/18',
      desafiosPercent: 100,
      vidas: 3,
      maxVidas: 3,
      xp: 12450,
      level: 'Nivel 5',
      status: 'Ritmo Óptimo',
      statusDetail: 'Ritmo Óptimo (P90)',
    },
    {
      legajo: '100002',
      name: 'Estudiante 02',
      email: 'estudiante02@alumnos.frc.utn.edu.ar',
      desafiosRatio: '14/18',
      desafiosPercent: 78,
      vidas: 2,
      maxVidas: 3,
      xp: 8900,
      level: 'Nivel 4',
      status: 'Regular',
      statusDetail: 'Regular (En meta)',
    },
    {
      legajo: '100003',
      name: 'Estudiante 03',
      email: 'estudiante03@alumnos.frc.utn.edu.ar',
      desafiosRatio: '4/18',
      desafiosPercent: 22,
      vidas: 0,
      maxVidas: 3,
      xp: 1200,
      level: 'Nivel 1',
      status: 'En Riesgo',
      statusDetail: 'Inactivo 12 días • 0 Vidas',
    },
    {
      legajo: '100004',
      name: 'Estudiante 04',
      email: 'estudiante04@alumnos.frc.utn.edu.ar',
      desafiosRatio: '16/18',
      desafiosPercent: 89,
      vidas: 3,
      maxVidas: 3,
      xp: 10800,
      level: 'Nivel 4',
      status: 'Ritmo Óptimo',
      statusDetail: 'Ritmo Óptimo (P90)',
    },
    {
      legajo: '100005',
      name: 'Estudiante 05',
      email: 'estudiante05@alumnos.frc.utn.edu.ar',
      desafiosRatio: '6/18',
      desafiosPercent: 33,
      vidas: 1,
      maxVidas: 3,
      xp: 2400,
      level: 'Nivel 2',
      status: 'En Riesgo',
      statusDetail: 'Inactivo 8 días • 1 Vida',
    },
  ]);

  readonly counts = computed(() => {
    const list = this.students();
    return {
      todos: 42, // Representativo de la cohorte completa
      riesgo: list.filter((s) => s.status === 'En Riesgo').length,
      optimo: list.filter((s) => s.status === 'Ritmo Óptimo').length,
      regular: list.filter((s) => s.status === 'Regular').length,
    };
  });

  readonly filteredStudents = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const seg = this.filterSegment();

    return this.students().filter((s) => {
      const matchesTerm =
        !term ||
        s.legajo.toLowerCase().includes(term) ||
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term);

      let matchesSeg = true;
      if (seg === 'riesgo') matchesSeg = s.status === 'En Riesgo';
      else if (seg === 'optimo') matchesSeg = s.status === 'Ritmo Óptimo';
      else if (seg === 'regular') matchesSeg = s.status === 'Regular';

      return matchesTerm && matchesSeg;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSelectCohort(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCohort.set(target.value);
    this.toastMessage.set(`Contexto de cohorte actualizado a: ${target.value}`);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }

  setSegment(seg: 'todos' | 'riesgo' | 'optimo' | 'regular'): void {
    this.filterSegment.set(seg);
  }

  filterOnlyRiesgo(): void {
    this.filterSegment.set('riesgo');
    this.toastMessage.set('Filtro activado: Visualizando únicamente alumnos en riesgo pedagógico.');
    setTimeout(() => this.toastMessage.set(''), 3000);
  }

  syncFreshness(): void {
    this.isSyncingFreshness.set(true);
    setTimeout(() => {
      this.freshnessMinutes.set(1);
      this.isSyncingFreshness.set(false);
      this.toastMessage.set('Sincronización completada. Datos actualizados hace 1 min (SLA ≤ 15 min cumplido).');
      setTimeout(() => this.toastMessage.set(''), 3500);
    }, 900);
  }

  triggerAlert(student: StudentRow): void {
    this.toastMessage.set(`Alerta académica temprana disparada a ${student.name} (${student.legajo}) vía Autogestión UTN.`);
    setTimeout(() => this.toastMessage.set(''), 4000);
  }

  viewDetail(student: StudentRow): void {
    this.toastMessage.set(`Historial pedagógico abierto para ${student.name}: 0 vidas perdidas en exámenes, 100% prácticos.`);
    setTimeout(() => this.toastMessage.set(''), 3500);
  }

  exportCSV(): void {
    this.toastMessage.set('Generando acta académica oficial para Autogestión UTN (CSV / RF-RNK-13)...');
    setTimeout(() => {
      const csvContent =
        'data:text/csv;charset=utf-8,Legajo,Alumno,Email,Desafios,Vidas,XP,Nivel,Estado\n' +
        this.students()
          .map((s) => `${s.legajo},${s.name},${s.email},${s.desafiosRatio},${s.vidas},${s.xp},${s.level},${s.status}`)
          .join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Acta_Academica_Comision_2W2_RF-RNK-13.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.toastMessage.set('Descarga de acta finalizada con éxito (Cumple RF-RNK-13).');
      setTimeout(() => this.toastMessage.set(''), 3000);
    }, 500);
  }
}
