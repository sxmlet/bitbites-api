import {Router, Request, Response} from 'express';
import BiteRequest from '../models/BiteRequest.js';
import {Logger} from "winston";
import {createLogger} from "../../../../common/logger.js";
import postValidator from "./bites-validators/post.js";
import {createBite, deleteBiteById, getAllBite, updateBite} from "../data/bite.js";
import deleteValidator from "./bites-validators/delete.js";
import updateValidator from "./bites-validators/patch.js";
import {UpdateBiteRequest} from "../models/UpdateBiteRequest.js";
import {invalidResponse, requestContext} from "../../../../common/request.js";
import {toJsonString} from "../../../../common/utils.js";
import {getPutSignedUrl} from "../../../../aws.js";
import {config} from "../../../../config.js";
import {InsertBite} from "../models/InsertBite.js";

const router: Router = Router();
const logger: Logger = createLogger('bites');


router.get('/', async (req: Request, res: Response) => {
  const bites = await getAllBite();
  return res.status(200).send(bites);
});

router.get('/signed-url/:filename', (req: Request, res: Response) => {
  const {filename} = req.params;
  if (!filename) {
    return invalidResponse(res, 'filename must be provided');
  }

  const uploadUrl = getPutSignedUrl(filename);
  return res.status(201).send(toJsonString({uploadUrl}));
});

router.post('/', postValidator, async (req: Request, res: Response) => {
  const bite: BiteRequest = req.body;
  const uid = requestContext.getUserId();
  const insert: InsertBite = {
    title: bite.title,
    content: bite.content,
    uid: uid,
  };
  if (bite.filename) {
    insert.url = `https://${config.bucket}.s3.amazonaws.com/${bite.filename}`;
  }

  logger.info(JSON.stringify(insert));
  try {
    const created = await createBite(insert);
    return res.status(201).send(JSON.stringify(created));
  } catch (e) {
    console.log(e);
  }
  return res.status(500).send(toJsonString({
    message: 'internal server error',
  }));
});

router.delete('/:id', deleteValidator, async (req: Request, res: Response) => {
  const {id} = req.params;
  const uid = requestContext.getUserId();
  logger.info('request for bite deletion with id: ' + id);
  try {
    const biteId = await deleteBiteById(uid, id);
    return res.status(200).send(JSON.stringify({id: biteId}))
  } catch (e) {
    logger.error('failed to delete bite with id: ' + id + ' error: ' + e);
    return res.status(500).send(JSON.stringify({
      message: 'failed to delete bite'
    }))
  }
});

router.patch('/:id', updateValidator, async (req: Request, res: Response) => {
  const {id} = req.params;
  const body: UpdateBiteRequest = req.body;
  const uid = requestContext.getUserId();
  logger.info('request for bite update with id: ' + id);
  const bite = await updateBite(uid, id, body);
  res.status(201).send(JSON.stringify(bite));
});


export const BitesRouter: Router = router;