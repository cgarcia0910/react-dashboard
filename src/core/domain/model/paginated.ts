export interface Paginated<T> {
    data: T[];
    page: number;
    itemsPerPage: number;
    total: number;
}