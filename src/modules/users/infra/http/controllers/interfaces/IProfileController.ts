import { Request, Response } from 'express';

export default interface IProfileController {
  get(request: Request, response: Response): Promise<Response>;
  update(request: Request, response: Response): Promise<Response>;
}
