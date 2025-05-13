import { UserEmail } from "src/lib/User/domain/validations/UserEmail";
import { UserId } from "src/lib/User/domain/validations/UserId";
import { UserName } from "src/lib/User/domain/validations/UserName";
import { UserPassword } from "src/lib/User/domain/validations/UserPassword";
import { UserPhone } from "src/lib/User/domain/validations/UserPhone";

export class User {
  id: UserId;
  username: UserName;
  email: UserEmail;
  phone: UserPhone;
  password: UserPassword;

  constructor(
    id: UserId,
    username: UserName,
    email: UserEmail,
    phone: UserPhone,
    password: UserPassword
  ){
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      username: this.username.value,
      email: this.email.value,
      phone: this.phone.value,
      password: this.password.value
    };
  }
}