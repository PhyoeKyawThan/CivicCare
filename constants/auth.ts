export type UserRole = 'citizan' | 'administrator';

export interface User{
    id: string,
    username: string,
    fullName: string,
    role: UserRole,
    email: string, 
    dateOfBirth?: string,
    avatar?: string,
}

export interface LoginCredentials{
    email: string,
    password: string
}

export interface SignupData{
    username?: string,
    email: string,
    phone: string,
    password: string,
    fullName?: string,
    dateOfBirth: string,
    avatar?: string,
    role: string
}
