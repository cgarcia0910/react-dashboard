import { useState, useEffect, useCallback } from "react"
import { User } from "../../domain/model/user"
import { CreateUserRepository } from "../../infrastructure/repository/user.repository.imp"
import { getUserPageUseCase } from "../use-case/get-user-page.use-case"
import { usePagination } from "../../../../core/application/hooks/usePagination"

export function useUsersTableManager() {
    const { page, itemsPerPage, total, setPage, setItemsPerPage, setTotal } = usePagination()
    const [data, setData] = useState<Array<User>>([])
    const repo = CreateUserRepository()
    const getUserPage = getUserPageUseCase(repo)
    const fetchPage = useCallback(async(page: number, perPage: number) => {
        return getUserPage(page,perPage)
    }, [getUserPage])
    useEffect(() => {
        const loadPage = async () => {
            const result = await fetchPage(page + 1,itemsPerPage)
            setData(result.data)
            setTotal(result.total)
        }
        loadPage()
    }, [page, itemsPerPage, fetchPage, setTotal])

    return {
        data,
        total,
        page,
        itemsPerPage,
        setPage,
        setItemsPerPage,
    }
}