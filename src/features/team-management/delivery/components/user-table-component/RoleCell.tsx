import { Chip } from "@mui/material"
import { UserRole } from "../../../domain/model/user"

type RoleCellProps = {
    role: UserRole,
}
export function RoleCell({role}: RoleCellProps) {
        switch(role) {
            case UserRole.Admin:
                return <Chip label="Admin" color="primary" />
            case UserRole.member:
                return <Chip label="Member" color="secondary" />
            case UserRole.viewer:
                return <Chip label="Viewer" color="default" />
            default:
                return <Chip label="Unknown" color="default" />
        }
}