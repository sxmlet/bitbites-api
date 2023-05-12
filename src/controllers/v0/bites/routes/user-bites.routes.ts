import {Request, Response, Router} from "express";
import {getAllBite} from "../data/bite.js";

const router = Router();

router.get('/:uid/bites', async (req: Request, res: Response) => {
  const { uid } = req.params;
  const bites = await getAllBite(uid);
  return res.status(200).send(bites);
});

export const UserBitesRouter: Router = router;
