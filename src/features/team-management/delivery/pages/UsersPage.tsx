import { Grid, Typography, Stack } from "@mui/material";
import { DashboardLayout } from "@toolpad/core";
import { KpiWidget } from "../../../../core/delivery/components/Kpi";
import { UserTable } from "../components/user-table-component/UserTable";

export function UsersPage() {
  return (
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
            </Stack>
          </Grid>
          <Grid size={3}>
            <KpiWidget label="Total Members" selector='totalMembers'></KpiWidget>
          </Grid>
          <Grid size={3}>
            <KpiWidget label="Pending Invites" selector='pendingInvites'></KpiWidget>
          </Grid>
          <Grid size={6}>
          </Grid>
          <Grid size={12}>
            <UserTable></UserTable>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}