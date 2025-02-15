import { Router } from 'express';
import {getAllFactsUser} from "../controllers/userController";

const router = Router();

router.get('/facts', getAllFactsUser);

export default router;
