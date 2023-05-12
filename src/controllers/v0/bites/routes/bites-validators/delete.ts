import {NextFunction, Request, Response} from "express";
import {getBite} from "../../data/bite.js";
import {createLogger} from "../../../../../common/logger.js";
import {invalidResponse, requestContext} from "../../../../../common/request.js";

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
    logger.error('bite does not exist')
    return invalidResponse(res, 'bite does not exist', 404)
  }
  const uid = requestContext.getUserId();
  if (bite.getDataValue('uid') !== uid) {
    return invalidResponse(res, 'user is not authorized to delete bite', 403)
  }

  next();
}