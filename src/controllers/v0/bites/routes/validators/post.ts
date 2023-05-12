import {NextFunction, Request, Response} from "express";
import BiteRequest from "../../models/BiteRequest.js";
import {invalidResponse} from "../../../../../common/request.js";

export default function postValidator(req: Request, res: Response, next: NextFunction) {
  const bite: BiteRequest = req.body;
  const reqFields = ['content', 'title'];
  const violations: string[] = [];
  reqFields.forEach((f: string) => {
    if (!bite.hasOwnProperty(f)) {
      violations.push(f);
    }
  })
  if (violations.length > 0) {
    return invalidResponse(res, 'following fields are required: ' + violations.join(', '))
  }

  if (bite.title === '' || bite.content === '') {
    return invalidResponse(res, 'the field must have a value')
  }

  next();
}
