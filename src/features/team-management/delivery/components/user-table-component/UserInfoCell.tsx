import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material"

type UserInfoCellProps = {
    name: string,
    mail: string,
    thumbnail: string,
}

export function UserInfoCell({name, mail, thumbnail}: UserInfoCellProps) {
    return (
        <>
        <Grid container spacing={2}>
            <Grid size={2}>
<Avatar src={thumbnail} />
            </Grid>
            <Grid size={10}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body1">{mail}</Typography>
            </Grid>
        </Grid>
                
                
        </>
    )
}