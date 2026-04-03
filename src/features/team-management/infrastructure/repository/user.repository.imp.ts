import { UserRepository } from "../../domain/repository/user.repository";
import { UserPageResponseDto } from "../dto/user-page-response.dto";
import { mapUsersResponse } from "../mappers/user.mapper";

export const CreateUserRepository = (): UserRepository => ({
    async getUserPage(page, perPage) {
        const response = await fetch(
            `http://localhost:3001/users?_page=${page}&_per_page=${perPage}`
        )
        const data: UserPageResponseDto = await response.json()
        return mapUsersResponse(data);
    }
})