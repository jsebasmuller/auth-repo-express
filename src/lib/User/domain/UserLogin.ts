import { UserEmail } from "src/lib/User/domain/validations/UserEmail";
import { UserPassword } from "src/lib/User/domain/validations/UserPassword";

export class UserLoginClass {
  email: UserEmail;
  password: UserPassword;

  constructor(
    email: UserEmail,
    password: UserPassword
  ){
    this.email = email;
    this.password = password;
  }

  public mapToPrimitives() {
    return {
      email: this.email.value,
      password: this.password.value
    };
  }
}