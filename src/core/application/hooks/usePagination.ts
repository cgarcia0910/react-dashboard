import { useState } from "react"

export function usePagination() {
    const [page, setPage] = useState<number>(0)
    const [itemsPerPage, setItemsPerPage] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)

    return {
        page,
        itemsPerPage,
        total,
        setPage,
        setItemsPerPage,
        setTotal,
    }
}