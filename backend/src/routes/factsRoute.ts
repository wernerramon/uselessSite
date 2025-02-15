import { Router } from 'express';
import { generateFact } from '../controllers/factController';

const router = Router();

router.get('/', generateFact);

export default router;
