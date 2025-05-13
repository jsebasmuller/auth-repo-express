import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/validations/UserId";

export class UserGet {
  constructor(private repository: UserRepository){}

  async run(
    id: number
  ): Promise<User | null>{
    return this.repository.get(new UserId(id));
  }
}