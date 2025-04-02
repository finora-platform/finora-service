export interface SebiListRecord {
  name: string;
  registrationNo: string;
  email: string;
  address: string;
  contactPerson: string;
  correspondenceAddress: string;
  validity: string;
  telephone: string;
  faxNo: string;
}

export interface SebiListData {
  records: SebiListRecord[];
  lastUpdated: Date;
}

export class SebiListEntity {
  private data: SebiListData;

  constructor() {
    this.data = {
      records: [],
      lastUpdated: new Date()
    };
  }

  updateRecords(records: SebiListRecord[]) {
    this.data.records = records;
    this.data.lastUpdated = new Date();
  }

  getRecordByRegistrationNo(registrationNo: string): SebiListRecord | null {
    return this.data.records.find(record => record.registrationNo === registrationNo) || null;
  }

  getAllRecords(): SebiListRecord[] {
    return this.data.records;
  }

  getLastUpdated(): Date {
    return this.data.lastUpdated;
  }
}