import { SebiListRecord } from './sebi-list.entity';

export interface SebiListRepository {
  saveRecords(records: SebiListRecord[]): Promise<void>;
  findByRegistrationNo(registrationNo: string): Promise<SebiListRecord | null>;
  findAll(): Promise<SebiListRecord[]>;
  getLastUpdated(): Promise<Date>;
}

export class FileSebiListRepository implements SebiListRepository {
  private records: SebiListRecord[] = [];
  private lastUpdated: Date = new Date();

  async saveRecords(records: SebiListRecord[]): Promise<void> {
    this.records = records;
    this.lastUpdated = new Date();
  }

  async findByRegistrationNo(registrationNo: string): Promise<SebiListRecord | null> {
    return this.records.find(record => record.registrationNo === registrationNo) || null;
  }

  async findAll(): Promise<SebiListRecord[]> {
    return this.records;
  }

  async getLastUpdated(): Promise<Date> {
    return this.lastUpdated;
  }
}