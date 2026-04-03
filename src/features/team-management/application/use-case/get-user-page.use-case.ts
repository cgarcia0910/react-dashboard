import { UserRepository } from "../../domain/repository/user.repository";

export const getUserPageUseCase = (repo: UserRepository) => 
    async (page: number, perPage: number) => 
        repo.getUserPage(page, perPage)