import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {createLogger} from "./logger.js";
import {toJsonString} from "./utils.js";
import {invalidResponse, requestContext} from "./request.js";

interface JwtPayload {
  sub: string
}

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
function parseUserId(jwtToken: string): string {
  const decodedJwt = jwt.decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}

export function getUserId(authHeader: string): string {
  const split = authHeader.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}

export function userValidationHandler(req: Request, res: Response, next: NextFunction) {
  const logger = createLogger('user-validator');
  logger.info('user-validation');

  if (!req.headers.authorization) {
    logger.error('missing authorization header')
    return invalidResponse(res, 'authorization header is missing from the request', 403)
  }

  try {
    const uid = getUserId(req.headers.authorization);
    requestContext.setUserId(uid);
    logger.info('authorized user: ' + uid);
  } catch (e) {
    const err = e as Error;
    logger.error('user validation error: ' + toJsonString(err));
    return invalidResponse(res, 'invalid authorization header', 403)
  }

  next();
}
