import { UserDto } from "./user.dto";

export interface UserPageResponseDto {
    first: number,
    prev: number | null,
    next: number,
    last: number,
    pages: number,
    items: number,
    data: Array<UserDto>
}