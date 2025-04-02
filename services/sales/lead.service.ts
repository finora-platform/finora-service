import { Injectable } from '@nestjs/common';
import { Lead, LeadSource, LeadStatus } from '../../domain/sales/lead.entity';
import { LeadRepository } from '../../domain/sales/lead.repository';
import { QueueService } from '../queue/queue.service';
import { WhatsAppService } from '../messaging/whatsapp.service';

@Injectable()
export class LeadService {
  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly queueService: QueueService,
    private readonly whatsAppService: WhatsAppService
  ) {}

  async processMetaLead(metaData: any): Promise<Lead> {
    const lead = await this.leadRepository.create({
      source: LeadSource.META,
      sourceId: metaData.id,
      firstName: metaData.first_name,
      lastName: metaData.last_name,
      email: metaData.email,
      phone: metaData.phone,
      status: LeadStatus.NEW,
      notes: '',
      campaign: metaData.campaign_name,
      adGroup: metaData.ad_set_name,
      adId: metaData.ad_id,
      metadata: metaData
    });

    // Queue welcome message
    await this.queueService.add('send-welcome-message', {
      leadId: lead.id,
      phone: lead.phone
    });

    return lead;
  }

  async processGoogleLead(googleData: any): Promise<Lead> {
    const lead = await this.leadRepository.create({
      source: LeadSource.GOOGLE,
      sourceId: googleData.gclid,
      firstName: googleData.first_name,
      lastName: googleData.last_name,
      email: googleData.email,
      phone: googleData.phone,
      status: LeadStatus.NEW,
      notes: '',
      campaign: googleData.campaign,
      adGroup: googleData.ad_group,
      adId: googleData.ad_id,
      metadata: googleData
    });

    // Queue welcome message
    await this.queueService.add('send-welcome-message', {
      leadId: lead.id,
      phone: lead.phone
    });

    return lead;
  }

  async updateLeadStatus(id: string, status: LeadStatus, rmsId?: string): Promise<Lead> {
    const lead = await this.leadRepository.updateStatus(id, status);
    
    if (rmsId) {
      await this.leadRepository.update(id, { rmsId });
    }

    // Send status update notification
    if (status === LeadStatus.CONTACTED) {
      await this.whatsAppService.sendMessage(lead.phone, 
        `Thank you for your interest! Our team will be in touch with you shortly.`);
    }

    return lead;
  }

  async getLeadsByStatus(status: LeadStatus, page: number = 1, limit: number = 10) {
    return this.leadRepository.list({
      status,
      page,
      limit
    });
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return this.leadRepository.findById(id);
  }
}