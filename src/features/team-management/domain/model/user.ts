export enum UserRole {
    Admin = 'Admin',
    member = 'member',
    viewer = 'viewer',
}
export enum UserStatus {
    active = 'active',
    offline = 'offline',
    waitingResponse = 'waiting for response'
}
export interface User {
    id: number,
    name: string,
    mail: string,
    role: UserRole,
    status: UserStatus,
    lastActivity: Date,
}
