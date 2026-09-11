import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface ProviderItem {
  readonly id: string;
  readonly name: string;
  readonly agreement: string;
  readonly endpoint: string;
  readonly latencyP95: string;
  readonly quotaPercent: number;
  readonly quotaTokens: string;
  readonly active: boolean;
  readonly quotaAlert?: boolean;
}

export interface ModelRoleMapping {
  readonly roleName: string;
  readonly badge: string;
  readonly assignedModel: string;
  readonly modelId: string;
  readonly config: string;
  readonly isLocked?: boolean;
  readonly purpose: string;
}

export interface GoldenSetRun {
  readonly runId: string;
  readonly timestamp: string;
  readonly modelEvaluated: string;
  readonly autonomyScore: string;
  readonly clarityScore: string;
  readonly progressionScore: string;
  readonly antiJailbreakScore: string;
  readonly efficiencyScore: string;
  readonly averageDeviation: string;
  readonly verdict: 'APROBADO DENTRO DE PAR-14' | 'BLOQUEADO (Supera umbral ±5 pts)';
  readonly isApproved: boolean;
}

@Component({
  selector: 'app-gobernanza-llm',
  imports: [],
  templateUrl: './gobernanza-llm.html',
  styleUrl: './gobernanza-llm.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GobernanzaLlm {
  readonly isEvaluating = signal<boolean>(false);
  readonly feedback = signal<string>('');
  readonly isModalOpen = signal<boolean>(false);
  readonly calibrationStep = signal<number>(0); // 0 a 5
  readonly selectedModelForCalibration = signal<string>('Claude 3.5 Sonnet');

  readonly providers = signal<readonly ProviderItem[]>([
    {
      id: 'anthropic',
      name: 'Anthropic Claude API',
      agreement: 'Tier 4 Enterprise • Contrato FRC',
      endpoint: 'api.anthropic.com/v1 • TLS 1.3',
      latencyP95: '140ms',
      quotaPercent: 42,
      quotaTokens: '2.1M / 5.0M tokens',
      active: true,
    },
    {
      id: 'openai',
      name: 'OpenAI Platform Gateway',
      agreement: 'Scale Edu Agreement • Org-UTN-FRC',
      endpoint: 'api.openai.com/v1 • Org-UTN-FRC',
      latencyP95: '185ms',
      quotaPercent: 82,
      quotaTokens: '4.1M / 5.0M tokens',
      active: true,
      quotaAlert: true,
    },
    {
      id: 'gemini',
      name: 'Google Gemini AI',
      agreement: 'Vertex AI SvcAcc • southamerica-east1',
      endpoint: 'southamerica-east1-aiplatform.googleapis.com',
      latencyP95: '120ms',
      quotaPercent: 31,
      quotaTokens: '1.5M / 5.0M tokens',
      active: true,
    },
  ]);

  readonly roleMappings = signal<readonly ModelRoleMapping[]>([
    {
      roleName: 'Evaluador de Código y Soluciones (Core Académico)',
      badge: '1 Único Evaluador Activo (RF-IA-25)',
      assignedModel: 'Claude 3.5 Sonnet',
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      config: 'Temp: 0.0 • Strict JSON • Rúbrica v2.4',
      isLocked: true,
      purpose: 'Inmutable durante el cuatrimestre para garantizar equidad en la calificación.',
    },
    {
      roleName: 'Tutor Interactivo de Desafíos (Pistas Socráticas)',
      badge: 'Multi-Modelo Balanceado (RF-IA-23)',
      assignedModel: 'GPT-4o-mini',
      modelId: 'openai.gpt-4o-mini-2024-07-18 (Fallback: Claude 3 Haiku)',
      config: 'Temp: 0.4 • Pistas pedagógicas sin revelar solución',
      isLocked: false,
      purpose: 'Respuestas rápidas para desbloqueo de estudiantes en horario de laboratorio.',
    },
    {
      roleName: 'Moderador de Chat y Foro Comisiones',
      badge: 'Tema 11 Compliance & Seguridad',
      assignedModel: 'Gemini 1.5 Flash',
      modelId: 'google.gemini-1.5-flash-preview-0514',
      config: 'Sub-150ms inferencia • Filtro toxicidad FRC',
      isLocked: false,
      purpose: 'Detección perimetral de infracciones a la convivencia y lenguaje inadecuado.',
    },
  ]);

  readonly goldenRuns = signal<readonly GoldenSetRun[]>([
    {
      runId: '#CAL-2026-042',
      timestamp: 'Hoy, 09:15 UTC',
      modelEvaluated: 'Claude 3.5 Sonnet',
      autonomyScore: '+1.8',
      clarityScore: '+2.9',
      progressionScore: '+1.2',
      antiJailbreakScore: '+0.4',
      efficiencyScore: '-1.1',
      averageDeviation: '+2.4 pts',
      verdict: 'APROBADO DENTRO DE PAR-14',
      isApproved: true,
    },
    {
      runId: '#CAL-2026-039',
      timestamp: '22/Mar/2026 16:30 UTC',
      modelEvaluated: 'Gemini 1.5 Pro',
      autonomyScore: '+6.2',
      clarityScore: '+5.4',
      progressionScore: '+7.1',
      antiJailbreakScore: '+8.0',
      efficiencyScore: '+7.2',
      averageDeviation: '+6.8 pts',
      verdict: 'BLOQUEADO (Supera umbral ±5 pts)',
      isApproved: false,
    },
    {
      runId: '#CAL-2026-031',
      timestamp: '15/Mar/2026 11:00 UTC',
      modelEvaluated: 'GPT-4o-mini',
      autonomyScore: '+3.1',
      clarityScore: '+3.8',
      progressionScore: '+3.2',
      antiJailbreakScore: '+1.8',
      efficiencyScore: '+2.1',
      averageDeviation: '+3.4 pts',
      verdict: 'APROBADO DENTRO DE PAR-14',
      isApproved: true,
    },
  ]);

  revalidateEndpoints(): void {
    this.feedback.set('Re-validando certificados mTLS y endpoints de proveedores LLM en HSM Azure KeyVault...');
    setTimeout(() => {
      this.feedback.set('Todos los endpoints verificados con éxito. Nivel de seguridad FIPS 140-2 Level 3 activo.');
      setTimeout(() => this.feedback.set(''), 3500);
    }, 1200);
  }

  openCalibrationModal(): void {
    this.isModalOpen.set(true);
    this.calibrationStep.set(0);
  }

  closeCalibrationModal(): void {
    this.isModalOpen.set(false);
    this.calibrationStep.set(0);
  }

  startCalibrationPipeline(): void {
    this.calibrationStep.set(1); // 20%
    setTimeout(() => {
      this.calibrationStep.set(2); // 45%
      setTimeout(() => {
        this.calibrationStep.set(3); // 70%
        setTimeout(() => {
          this.calibrationStep.set(4); // 90%
          setTimeout(() => {
            this.calibrationStep.set(5); // 100%
            this.feedback.set('Calibración completada con éxito sobre 50 transcripciones base. Desvío: +2.1 pts (APROBADO PAR-14).');
            setTimeout(() => this.feedback.set(''), 4500);
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  }
}
