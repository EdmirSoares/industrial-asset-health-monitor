import { apiFetch, ApiError } from '@/src/shared/api/client';

export interface DiagnosisResult {
  probability: number;
  component: string;
  timeHorizon: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

const MOCK_RESULTS: DiagnosisResult[] = [
  {
    probability: 0.02,
    component: 'rolamentos',
    timeHorizon: '30 dias',
    recommendation:
      'Sistema operando dentro dos parâmetros normais. Próxima revisão preventiva agendada.',
    severity: 'low',
  },
  {
    probability: 0.34,
    component: 'vedação hidráulica',
    timeHorizon: '24h',
    recommendation:
      'Pressão ligeiramente acima do normal. Verificar vedações e conexões hidráulicas.',
    severity: 'medium',
  },
  {
    probability: 0.81,
    component: 'motor elétrico',
    timeHorizon: '6h',
    recommendation:
      'Temperatura crítica detectada. Reduzir carga ou parar para inspeção imediata.',
    severity: 'high',
  },
];

export async function getDiagnosis(assetId: string): Promise<DiagnosisResult> {
  try {
    return await apiFetch<DiagnosisResult>(`/assets/${assetId}/diagnosis`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
    }
    return MOCK_RESULTS[0];
  }
}
