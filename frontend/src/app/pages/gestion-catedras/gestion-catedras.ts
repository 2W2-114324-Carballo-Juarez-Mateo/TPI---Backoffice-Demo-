import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface CatedraItem {
  readonly code: string;
  readonly name: string;
  readonly dept: string;
  readonly level: string;
  readonly titular: string;
  readonly role: 'Titular' | 'Adjunto' | 'JTP';
  readonly auxiliares: string;
  readonly comisiones: number;
  readonly matricula: number;
  readonly permisos: readonly boolean[]; // [MS-1..MS-6]
  readonly status: 'Activa' | 'En Auditoría';
}

export interface MicroserviceCatalog {
  readonly id: number;
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly status: 'Operativo' | 'Degradado';
}

export interface AccessAuditLog {
  readonly id: string;
  readonly actor: string;
  readonly action: string;
  readonly service: string;
  readonly catedra: string;
  readonly ip: string;
  readonly timeAgo: string;
  readonly isWarning?: boolean;
}

@Component({
  selector: 'app-gestion-catedras',
  imports: [],
  templateUrl: './gestion-catedras.html',
  styleUrl: './gestion-catedras.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionCatedras {
  readonly searchTerm = signal<string>('');
  readonly selectedDept = signal<string>('Todos');
  readonly selectedRole = signal<string>('Todos');
  readonly toastMessage = signal<string>('');

  readonly stats = signal([
    { title: 'Total Cátedras', value: '142', sub: '+4 este ciclo', icon: 'school', color: 'primary' },
    { title: 'Profesores Activos', value: '388', sub: 'Lista Blanca RF-USR-02', icon: 'group', color: 'secondary' },
    { title: 'Microservicios API', value: '6 / 6', sub: 'Contratos Gateway T01', icon: 'hub', color: 'tertiary' },
    { title: 'Auditoría Hoy', value: '1,429', sub: 'Invocaciones validadas', icon: 'shield_person', color: 'emerald' },
  ]);

  readonly catedras = signal<readonly CatedraItem[]>([
    {
      code: 'PAR-405-ISI',
      name: 'Sistemas de Gestión',
      dept: 'Sistemas',
      level: 'Nivel 4',
      titular: 'Dr. Ing. Roberto Gómez',
      role: 'Titular',
      auxiliares: '+2 auxiliares',
      comisiones: 4,
      matricula: 168,
      permisos: [true, true, true, true, false, true],
      status: 'Activa',
    },
    {
      code: 'PAR-502-ISI',
      name: 'Arquitectura de Software',
      dept: 'Sistemas',
      level: 'Nivel 5',
      titular: 'Mg. Ana Laura Pérez',
      role: 'Titular',
      auxiliares: '+1 auxiliar',
      comisiones: 3,
      matricula: 135,
      permisos: [true, true, true, true, true, true],
      status: 'Activa',
    },
    {
      code: 'PAR-301-ISI',
      name: 'Programación III',
      dept: 'Sistemas',
      level: 'Nivel 3',
      titular: 'Ing. Alberto Gómez',
      role: 'Adjunto',
      auxiliares: '+3 auxiliares',
      comisiones: 4,
      matricula: 180,
      permisos: [true, true, true, true, true, false],
      status: 'Activa',
    },
    {
      code: 'PAR-204-IEL',
      name: 'Electrónica Aplicada I',
      dept: 'Electrónica',
      level: 'Nivel 2',
      titular: 'Ing. Marcelo Rossi',
      role: 'Adjunto',
      auxiliares: '+1 auxiliar',
      comisiones: 2,
      matricula: 78,
      permisos: [true, true, false, true, false, false],
      status: 'En Auditoría',
    },
    {
      code: 'PAR-305-IIN',
      name: 'Investigación Operativa',
      dept: 'Industrial',
      level: 'Nivel 3',
      titular: 'Mg. Paula Cabrera',
      role: 'JTP',
      auxiliares: 'Sin auxiliares',
      comisiones: 3,
      matricula: 110,
      permisos: [true, true, true, false, true, false],
      status: 'Activa',
    },
    {
      code: 'PAR-201-IME',
      name: 'Mecánica de Fluidos',
      dept: 'Mecánica',
      level: 'Nivel 2',
      titular: 'Dr. Fernando Vega',
      role: 'Titular',
      auxiliares: '+1 auxiliar',
      comisiones: 2,
      matricula: 64,
      permisos: [true, true, false, false, false, false],
      status: 'Activa',
    },
  ]);

  readonly microservices = signal<readonly MicroserviceCatalog[]>([
    { id: 1, name: 'MS-1: Auth & Identidad', version: 'v2.4.1', description: 'Tema 01: JWT, sesión, roles y 2FA', status: 'Operativo' },
    { id: 2, name: 'MS-2: Cursos & Matrícula', version: 'v1.8.0', description: 'Tema 02: Padrón y pertenencia de cohorte', status: 'Operativo' },
    { id: 3, name: 'MS-3: Desafíos & Testing', version: 'v3.0.2', description: 'Tema 03/05: Evaluación unitaria de código', status: 'Operativo' },
    { id: 4, name: 'MS-4: Roadmap & Currícula', version: 'v1.2.4', description: 'Tema 04/10: Hitos y niveles académicos', status: 'Operativo' },
    { id: 5, name: 'MS-5: Analytics & Reporting', version: 'v2.1.0', description: 'Tema 12: Read models agregados y RLS', status: 'Operativo' },
    { id: 6, name: 'MS-6: Banco & Ledger', version: 'v1.0.9', description: 'Tema 08: Saldo de monedas y transacciones', status: 'Operativo' },
  ]);

  readonly recentAudits = signal<readonly AccessAuditLog[]>([
    {
      id: 'AUD-9821',
      actor: 'Dr. Roberto Gómez',
      action: 'Acceso concedido a',
      service: 'MS-2 (Matrícula)',
      catedra: 'Cátedra Sistemas de Gestión',
      ip: '190.221.44.12',
      timeAgo: 'Hace 2 min',
    },
    {
      id: 'AUD-9820',
      actor: 'Mg. Ana Laura Pérez',
      action: 'Consulta analítica a',
      service: 'MS-5 (Analytics)',
      catedra: 'Cátedra Arquitectura de Software',
      ip: '181.110.89.5',
      timeAgo: 'Hace 7 min',
    },
    {
      id: 'AUD-9819',
      actor: 'Dr. Carlos Mendoza',
      action: 'Intento Bloqueado a',
      service: 'MS-6 (Banco / Ledger)',
      catedra: 'Permiso no asignado para la cátedra',
      ip: '200.45.12.88',
      timeAgo: 'Hace 18 min',
      isWarning: true,
    },
    {
      id: 'AUD-9818',
      actor: 'Administrador FRC',
      action: 'Actualización de Privilegios en',
      service: 'Cátedra Electrónica Aplicada I',
      catedra: 'Habilitado consumo de MS-4',
      ip: '192.168.40.1',
      timeAgo: 'Hace 34 min',
    },
  ]);

  readonly filteredCatedras = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const dept = this.selectedDept();
    const role = this.selectedRole();

    return this.catedras().filter((c) => {
      const matchesTerm =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.titular.toLowerCase().includes(term);
      const matchesDept = dept === 'Todos' || c.dept === dept;
      const matchesRole = role === 'Todos' || c.role === role;
      return matchesTerm && matchesDept && matchesRole;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSelectDept(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDept.set(target.value);
  }

  onSelectRole(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedRole.set(target.value);
  }

  exportAudit(): void {
    this.toastMessage.set('Exportando log de auditoría de permisos de cátedra a CSV...');
    setTimeout(() => this.toastMessage.set(''), 3500);
  }

  openWhitelist(): void {
    this.toastMessage.set('Abriendo gestión de Lista Blanca de Profesores autorizados (RF-USR-02)...');
    setTimeout(() => this.toastMessage.set(''), 3500);
  }

  editPermissions(c: CatedraItem): void {
    this.toastMessage.set(`Editando permisos de consumo de microservicios para ${c.name} (${c.code})...`);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}
