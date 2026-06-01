import { apiGet } from '@/shared/api/http';
import { Template } from '@/shared/types/domain';

export function getTemplates() {
  return apiGet<Template[]>('/templates');
}
