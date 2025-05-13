import { ResponseLogin } from "../../domain/response/ResponseLogin";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/validations/UserEmail";
import { UserId } from "../../domain/validations/UserId";
import { UserName } from "../../domain/validations/UserName";
import { UserPassword } from "../../domain/validations/UserPassword";
import { UserPhone } from "../../domain/validations/UserPhone";

export class UserCreate {
  constructor(private repository: UserRepository){}

  async run(
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<ResponseLogin>{
    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPhone(phone),
      new UserPassword(password)
    );
    return this.repository.create(user);
  }
}