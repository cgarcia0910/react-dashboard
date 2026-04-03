import { Grid, Typography, Stack } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { KPIProvider } from "../../../../core/application/context/kpi.provider";
import { KpiWidget } from "../../../../core/delivery/components/Kpi";
import { UserTable } from "../components/user-table-component/UserTable";
import DescriptionIcon from '@mui/icons-material/Description';

export function UsersPage() {
    return (
        <>
        <AppProvider
      navigation={[
        {
          segment: 'users',
          title: 'Users',
          icon: <DescriptionIcon />,
        },
      ]}
    >
    <KPIProvider>
      <DashboardLayout>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid size={8}>
          <Typography variant="h2" gutterBottom>
                Team Management
            </Typography>
            <Typography variant="body1">
            Maintain surgical control over organizational access and collaborative permissions for the Precision Suite.
            </Typography>
          </Grid>
          <Grid size={4}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "end",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            {/* <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button> */}
            </Stack>
          </Grid>
          <Grid size={3}>
            <KpiWidget label="Total Members" selector='totalMembers'></KpiWidget>
          </Grid>
          <Grid size={3}>
          <KpiWidget label="Pending Invites" selector='pendingInvites'></KpiWidget>
          </Grid>
          <Grid size={6}>
          {/* <Paper elevation={2}>
            kpi3
            </Paper> */}
          </Grid>
          <Grid size={12}>
            <UserTable></UserTable>
          </Grid>
        </Grid>
        </Grid>
      </DashboardLayout>
    </KPIProvider>
    </AppProvider>
        </>
    )
}