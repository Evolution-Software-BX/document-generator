export type LegalType = 'OOO' | 'IP';
export type ContractType = 'CRM' | 'SITE' | 'TRAINING';
export type PaymentType = 'SINGLE' | 'DOUBLE';
export type GenerationStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

export interface Client {
  id: number;
  legalType: LegalType;
  name: string;
  shortName?: string;
  inn?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: number;
  code: string;
  name: string;
  type: ContractType;
  legalType?: LegalType;
  paymentType?: PaymentType;
  hasTz?: boolean;
  filePath: string;
  isActive: boolean;
}

export interface Contract {
  id: number;
  number: string;
  date: string;
  type: ContractType;
  legalType: LegalType;
  paymentType: PaymentType;
  amount: string;
  client?: Client;
  template?: Template;
}
