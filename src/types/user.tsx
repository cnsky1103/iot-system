export enum Gender { Male, Female }

export enum Role { Guest, User, Administrator }

export declare interface User {
    id: string,
    password: string,
    name: string,
    gender: Gender,
    email: string,
    avatarID: number
}