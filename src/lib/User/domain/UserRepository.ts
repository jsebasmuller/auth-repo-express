import { ResponseLogin } from "src/lib/User/domain/response/ResponseLogin";
import { User } from "src/lib/User/domain/User";
import { UserLoginClass } from "./UserLogin";

export interface UserRepository {
    create(user: User): Promise<ResponseLogin>;
    login(user: UserLoginClass): Promise<ResponseLogin>;
}