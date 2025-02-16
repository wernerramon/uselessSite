import { Router } from 'express';
import { generateFact } from '../controllers/factController';

const router = Router();

router.post('/', generateFact);

export default router;
