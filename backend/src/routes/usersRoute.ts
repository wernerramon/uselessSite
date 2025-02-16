import { Router } from 'express';
import {getAllFactsUser, deleteFactForUser} from "../controllers/userController";

const router = Router();

router.post('/facts', getAllFactsUser);

router.delete('/fact',deleteFactForUser);

export default router;
