import React from 'react'
import { Role } from '../types/user'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UserInfo {
    token?: number | null
    id?: string,
    avatarID?: number | null,
    name?: string,
    role?: Role
}

export const defaultValue = {
    user: { username: undefined },
    setUser: (o: any) => { }
}

export const UserContext = React.createContext(defaultValue)