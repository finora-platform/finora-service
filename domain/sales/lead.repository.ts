import { Lead, LeadStatus } from './lead.entity';

export interface LeadRepository {
  create(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead>;
  findById(id: string): Promise<Lead | null>;
  findBySourceId(source: string, sourceId: string): Promise<Lead | null>;
  findByRmsId(rmsId: string): Promise<Lead | null>;
  update(id: string, data: Partial<Lead>): Promise<Lead>;
  updateStatus(id: string, status: LeadStatus): Promise<Lead>;
  list(filters: {
    status?: LeadStatus;
    source?: string;
    fromDate?: Date;
    toDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{ leads: Lead[]; total: number }>;
}