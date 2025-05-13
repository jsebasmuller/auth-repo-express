import { ResponseLogin } from "src/lib/User/domain/response/ResponseLogin";
import { User } from "src/lib/User/domain/User";
import { UserLoginClass } from "./UserLogin";
import { UserId } from "./validations/UserId";

export interface UserRepository {
    create(user: User): Promise<ResponseLogin>;
    login(user: UserLoginClass): Promise<ResponseLogin>;
    get(id: UserId): Promise<User | null>;
}