import { Paginated } from "../../../../core/domain/model/paginated";
import { User } from "../../domain/model/user";
import { UserPageResponseDto } from "../dto/user-page-response.dto";
import { UserDto } from "../dto/user.dto";

export const mapUser = (
    dto: UserDto
): User => dto as User

export const mapUsersResponse = (
    dto: UserPageResponseDto
): Paginated<User> => ({
    data: dto.data.map(mapUser),
    page: dto.next - (dto.prev || dto.first),
    itemsPerPage: 10,
    total: dto.items
})