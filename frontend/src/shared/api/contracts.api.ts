import { env } from '../config/env';
import type {
  FullGeneratePayload,
  FullGenerateResponse,
} from '@/features/create-document/types';

export async function fullGenerateContract(
  payload: FullGeneratePayload,
  file: File,
): Promise<FullGenerateResponse> {
  const formData = new FormData();
  formData.append('payload', JSON.stringify(payload));
  formData.append('file', file);

  const response = await fetch(`${env.apiUrl}/contracts/full-generate`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? `Request failed: ${response.status}`);
  }

  return response.json() as Promise<FullGenerateResponse>;
}
