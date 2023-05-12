import {Router, Request, Response} from 'express';
import {BitesRouter} from './bites/routes/bites.routes.js';
import {userValidationHandler} from "../../common/user.js";
import {UserBitesRouter} from "./bites/routes/user-bites.routes.js";

const router: Router = Router();


router.use('/api/v0/bites', userValidationHandler, BitesRouter);
router.use('/api/v0', userValidationHandler, UserBitesRouter);
router.get('/api/v0', async (req: Request, res: Response) => {
  return res.send(`V0`);
});

export const IndexRouter: Router = router;
