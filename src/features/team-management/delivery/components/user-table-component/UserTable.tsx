import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { UserInfoCell } from "./UserInfoCell"
import { RoleCell } from "./RoleCell"
import { StatusCell } from "./StatusCell"
import { useUsersTableManager } from "../../../application/hooks/useUsersTableManager"

export function UserTable() {
    const { data, total, page, itemsPerPage, setPage, setItemsPerPage } = useUsersTableManager()

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    return (<>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Info</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell><UserInfoCell name={row.name} mail={row.mail} thumbnail={`https://randomuser.me/api/portraits/men/${row.id}.jpg`} /></TableCell>
              <TableCell><RoleCell role={row.role} /></TableCell>
              <TableCell><StatusCell status={row.status} lastActivity={row.lastActivity} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <TablePagination
            component="div"
            count={total}               // total que devuelve el backend
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>)
}