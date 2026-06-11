import { env } from '../config/env';
import type {
  FullGeneratePayload,
  FullGenerateResponse,
} from '@/features/create-document/types';

export async function fullGenerateContract(
  payload: FullGeneratePayload,
  file: File,
): Promise<FullGenerateResponse> {
  const contractPayload = payload.contract as typeof payload.contract & { templateId?: number };
  const requestPayload = payload as FullGeneratePayload & { clientId?: number };

  console.log('[frontend/full-generate] payload', {
    type: contractPayload.type,
    legalType: contractPayload.legalType,
    paymentType: contractPayload.paymentType,
    hasTz: contractPayload.hasTz,
    date: contractPayload.date,
    city: contractPayload.city,
    templateId: contractPayload.templateId,
    clientId: requestPayload.clientId,
  });
  console.log('[frontend/full-generate] file', {
    fileName: file.name,
    size: file.size,
  });

  const formData = new FormData();
  formData.append('payload', JSON.stringify(payload));
  formData.append('file', file);

  const response = await fetch(`${env.apiUrl}/contracts/full-generate`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    console.log('[frontend/full-generate] response error', {
      status: response.status,
      message: error?.message,
    });
    throw new Error(error?.message ?? `Request failed: ${response.status}`);
  }

  const result = await response.json() as FullGenerateResponse;
  console.log('[frontend/full-generate] response success', result);

  return result;
}
