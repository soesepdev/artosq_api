import { Router, Request, Response } from 'express';
import { getTest } from '../models/test';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const icons = await getTest();
    res.json(icons);
  } catch (err) {
    console.error('Error fetching test:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;