import { UserCreate } from './../../User/application/UserCreate/UserCreate';
import { UserLogin } from './../../User/application/UserLogin/UserLogin';
import { MySqlUserRepository } from "../../User/infrastructure/MySqlUserRepository";
import { env } from './env';
import { UserGet } from './../../User/application/UserGet/UserGet';

const UserRepository = new MySqlUserRepository(env.DB_HOST, env.DB_USER, env.DB_PASS, env.DB);

export const ServiceContainer = {
  user:{
    create: new UserCreate(UserRepository),
    login: new UserLogin(UserRepository),
    get: new UserGet(UserRepository)
  }
};