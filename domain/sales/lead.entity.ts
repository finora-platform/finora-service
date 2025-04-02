import { BaseEntity } from '../base.entity';

export enum LeadSource {
  META = 'META',
  GOOGLE = 'GOOGLE'
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST'
}

export interface Lead extends BaseEntity {
  source: LeadSource;
  sourceId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  notes: string;
  campaign?: string;
  adGroup?: string;
  adId?: string;
  rmsId?: string;
  lastContactedAt?: Date;
  metadata: Record<string, any>;
}