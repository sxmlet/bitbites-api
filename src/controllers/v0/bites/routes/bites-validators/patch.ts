import {UpdateBiteRequest} from "../../models/UpdateBiteRequest.js";
import {NextFunction, Request, Response} from "express";
import {getBite} from "../../data/bite.js";
import {createLogger} from "../../../../../common/logger.js";
import {toJsonString} from "../../../../../common/utils.js";
import {invalidResponse, requestContext} from "../../../../../common/request.js";

const logger = createLogger('update-bite-validator', 'info');

export default async function updateValidator(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if (!id) {
    return invalidResponse(res, 'invalid id');
  }

  const update: UpdateBiteRequest = req.body;
  logger.info('validating update bite body: ' + toJsonString(update));
  if (!update || (!update.url && !update.content && !update.title)) {
    return invalidResponse(res, 'at least one field must be specified: url, content, title');
  }

  const bite = await getBite(id);
  if (!bite) {
    return invalidResponse(res, 'bite not found', 404);
  }
  const uid = requestContext.getUserId();
  if (bite.getDataValue('uid') !== uid) {
    return invalidResponse(res, 'user is not authorized to update bite', 403)
  }

  next();
}
