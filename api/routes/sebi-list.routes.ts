import { Router, Request, Response } from 'express';
import multer from 'multer';
import { SebiListService } from '../../services/sebi-list/sebi-list.service';
import { validateRequest } from '../middlewares/validation.middleare';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getSebiRecordSchema, getAllSebiRecordsSchema } from '../schema/sebi-list.schema';

export const sebiListRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Webhook endpoint for CSV upload
sebiListRouter.post('/webhook/csv', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    if (req.file.mimetype !== 'text/csv') {
      res.status(400).json({ message: 'Invalid file type. Please upload a CSV file' });
      return;
    }

    const sebiListService = new SebiListService();
    await sebiListService.processCSV(req.file.buffer);

    res.json({ message: 'CSV processed successfully' });
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).json({ message: 'Error processing CSV file' });
  }
});

// Protected routes
sebiListRouter.use(authMiddleware);

// Get SEBI record by registration number
sebiListRouter.get('/records/:registrationNo', validateRequest(getSebiRecordSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const sebiListService = new SebiListService();
    const record = await sebiListService.getRecordByRegistrationNo(req.params.registrationNo);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json(record);
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({ message: 'Error fetching records' });
  }
});

// Get all SEBI records
sebiListRouter.get('/records', validateRequest(getAllSebiRecordsSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const sebiListService = new SebiListService();
    const records = await sebiListService.getAllRecords();
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Error fetching records' });
  }
});