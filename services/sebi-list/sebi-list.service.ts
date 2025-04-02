import { SebiListRecord, SebiListEntity } from '../../domain/sebi-list/sebi-list.entity';
import { SebiListRepository, FileSebiListRepository } from '../../domain/sebi-list/sebi-list.repository';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

export class SebiListService {
  private repository: SebiListRepository;
  private entity: SebiListEntity;

  constructor() {
    this.repository = new FileSebiListRepository();
    this.entity = new SebiListEntity();
  }

  async processCSV(csvBuffer: Buffer): Promise<void> {
    const records: SebiListRecord[] = [];
    
    const parser = parse(csvBuffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    for await (const record of parser) {
      records.push({
        name: record['Name'],
        registrationNo: record['Registration No.'],
        email: record['E-mail'],
        address: record['Address'],
        contactPerson: record['Contact Person'],
        correspondenceAddress: record['Correspondence Address'],
        validity: record['Validity'],
        telephone: record['Telephone'],
        faxNo: record['Fax No.']
      });
    }

    await this.repository.saveRecords(records);
  }

  async getRecordByRegistrationNo(registrationNo: string): Promise<SebiListRecord | null> {
    return this.repository.findByRegistrationNo(registrationNo);
  }

  async getAllRecords(): Promise<SebiListRecord[]> {
    return this.repository.findAll();
  }

  async getLastUpdated(): Promise<Date> {
    return this.repository.getLastUpdated();
  }
}