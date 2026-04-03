export interface Kpi {
    totalMembers: number,
    pendingInvites: number,
}

export type KpiUpdate = Partial<Kpi>