import {Response} from "express";
import {randomUUID} from "crypto";

export function invalidResponse(res: Response, message: string, status: number = 400) {
  return res.status(status).send(JSON.stringify({
    message: message
  }))
}

// @todo: add request id to track requests.
class RequestContext {

  private userId: string = '';

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

}

export const requestContext = new RequestContext();
