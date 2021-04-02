import request from './axios'
import { md5 } from './md5'
import { Role } from '../types/user'

interface Authentication {
    id: string,
    password: string,
    remember: boolean
}

async function login({ id, password, remember }: Authentication): Promise<any> {
    const loginRes = await request.post('/user', {
        id: id,
        password: md5(password)
    })
    console.log(loginRes)
    if (loginRes.data.role === Role.Guest) {
        return Promise.reject(loginRes.data.error)
    } else {
        return Promise.resolve(loginRes.data.token)
    }
}

export {
    login
}