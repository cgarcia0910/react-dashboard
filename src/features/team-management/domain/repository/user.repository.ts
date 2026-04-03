import { Paginated } from "../../../../core/domain/model/paginated";
import { User } from "../model/user";

export interface UserRepository {
    getUserPage(page: number, perPage: number): Promise<Paginated<User>>
}