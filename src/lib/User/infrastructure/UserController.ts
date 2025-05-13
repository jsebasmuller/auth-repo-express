import { Request, Response, NextFunction } from 'express';
import { ServiceContainer } from "../../shared/infraestructure/ServiceContainer";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const { username, email, phone, password } = req.body as {
        username: string,
        email: string,
        phone: string,
        password: string
      };
      const response = await ServiceContainer.user.create.run(
        0, username, email, phone, password
      );
      if(response.error){
        res.status(500).json(response);
        return;
      }
      res.status(201).json(response);
    }catch(e){
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const { email, password } = req.body as {
        email: string,
        password: string
      };
      const response = await ServiceContainer.user.login.run(
        email, password
      );
      if(response.error){
        res.status(500).json(response);
        return;
      }
      res.status(200).json(response);
    }catch(e){
      next(e);
    }
  }
}