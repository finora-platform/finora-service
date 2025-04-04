import { z } from 'zod';

export const getSebiRecordSchema = z.object({
  params: z.object({
    registrationNo: z.string().min(1, 'Registration number is required')
  }),
  query: z.object({}).optional(),
  body: z.object({}).optional()
});

export const getAllSebiRecordsSchema = z.object({
  params: z.object({}),
  query: z.object({}).optional(),
  body: z.object({}).optional()
});