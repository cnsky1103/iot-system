import React from 'react'
import { Role } from '../types/user'

interface LoginInfo {
    token?: number | null
    id?: string,
    avatarID?: number | null
}

export const defaultValue = {
    state: {
        token: null,
        avatarID: null,
        name: null,
        id: null,
        role: Role.Guest
    },
    mutation: {
        init(state) {
            state.token = localStorage.getItem('token')
        }
    }
}

export const LoginContext = React.createContext(defaultValue)