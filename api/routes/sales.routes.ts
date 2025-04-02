import { Router } from 'express';
import { LeadService } from '../../services/sales/lead.service';
import { validateRequest } from '../middlewares/validation.middleare';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LeadStatus } from '../../domain/sales/lead.entity';

export const salesRouter = Router();

// Meta Webhook endpoint for lead collection
salesRouter.post('/webhook/meta', validateRequest, async (req, res) => {
  const leadService = new LeadService();
  const lead = await leadService.processMetaLead(req.body);
  res.json(lead);
});

// Google Ads webhook endpoint for lead collection
salesRouter.post('/webhook/google', validateRequest, async (req, res) => {
  const leadService = new LeadService();
  const lead = await leadService.processGoogleLead(req.body);
  res.json(lead);
});

// Protected routes for RMS operations
salesRouter.use(authMiddleware);

// Get leads by status
salesRouter.get('/leads', async (req, res) => {
  const leadService = new LeadService();
  const { status = LeadStatus.NEW, page, limit } = req.query;
  const leads = await leadService.getLeadsByStatus(status as LeadStatus, Number(page), Number(limit));
  res.json(leads);
});

// Get lead by ID
salesRouter.get('/leads/:id', async (req, res) => {
  const leadService = new LeadService();
  const lead = await leadService.getLeadById(req.params.id);
  if (!lead) {
    return res.status(404).json({ message: 'Lead not found' });
  }
  res.json(lead);
});

// Update lead status
salesRouter.patch('/leads/:id/status', async (req, res) => {
  const leadService = new LeadService();
  const { status, rmsId } = req.body;
  const lead = await leadService.updateLeadStatus(req.params.id, status, rmsId);
  res.json(lead);
});