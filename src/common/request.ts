import {Response} from "express";

export function invalidResponse(res: Response, message: string, status: number = 400) {
  return res.status(status).send(JSON.stringify({
    message: message
  }))
}

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
