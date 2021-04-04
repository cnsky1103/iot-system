import request from './axios'
import { md5 } from './md5'
//import { Role } from '../types/user'

interface Authentication {
    username: string,
    password: string,
    remember: boolean
}

async function login({ username, password, remember }: Authentication): Promise<any> {
    const loginRes = await request.post('/user', {
        username: username,
        password: md5(password)
    })
    console.log(loginRes)
    return Promise.resolve('')
}

export {
    login
}