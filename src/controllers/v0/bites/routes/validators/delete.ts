import {NextFunction, Request, Response} from "express";
import {getBite} from "../../data/bite.js";
import {createLogger} from "../../../../../common/logger.js";
import {invalidResponse} from "../../../../../common/request.js";

const logger = createLogger('delete-bite-validator');

export default async function deleteValidator(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if (!id) {
    const msg = 'id is required';
    logger.error('delete bite violation: ' + msg)
    return invalidResponse(res, 'id is required')
  }
  const bite = await getBite(id);
  if (bite == null) {
    return invalidResponse(res, 'bite does not exist', 404)
  }
  next();
}