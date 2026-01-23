export type UserRole = 'citizan' | 'administrator';

export interface User{
    id: number,
    username: string,
    fullName: string,
    role: UserRole,
    email: string, 
    dateOfbirth?: string,
    avatar?: string,
}

export interface LoginCredentials{
    email: string,
    password: string
}

export interface SingupData{
    username: string,
    email: string,
    fullName?: string,
    dateOfBirth: string,
    avatar?: string
}
