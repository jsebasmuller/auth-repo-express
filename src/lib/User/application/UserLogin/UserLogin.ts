import { ResponseLogin } from "../../domain/response/ResponseLogin";
import { UserLoginClass } from "../../domain/UserLogin";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/validations/UserEmail";
import { UserPassword } from "../../domain/validations/UserPassword";

export class UserLogin {
  constructor(private repository: UserRepository){}

  async run(
    email: string,
    password: string
  ): Promise<ResponseLogin>{
    const user = new UserLoginClass(
      new UserEmail(email),
      new UserPassword(password)
    );
    return this.repository.login(user);
  }
}