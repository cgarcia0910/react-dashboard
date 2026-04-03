import { Typography } from "@mui/material";
import { UserStatus } from "../../../domain/model/user";

type StatusCellProps = {
    status: UserStatus,
    lastActivity: Date,
}
export function StatusCell({status, lastActivity}: StatusCellProps) {
    function timeAgo(date: Date | string): string {
        const now = new Date();
        const input = new Date(date);
    
        const diffMs = now.getTime() - input.getTime();
    
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    
        if (seconds < 60) return "hace unos segundos";
        if (minutes < 60) return `hace ${minutes} min`;
        if (hours < 24) return `hace ${hours} h`;
        if (days < 30) return `hace ${days} días`;
        if (months < 12) return `hace ${months} meses`;
        return `hace ${years} años`;
    }
    return (
        <>
        <Typography variant="h6">{status}</Typography>
        <Typography variant="body1">{timeAgo(lastActivity)}</Typography>
        </>
    )
}