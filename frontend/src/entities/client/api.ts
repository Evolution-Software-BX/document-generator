import { apiGet } from '@/shared/api/http';
import { Client } from '@/shared/types/domain';

export function getClients() {
  return apiGet<Client[]>('/clients');
}
