import request from './axios'
import { md5 } from './md5'

async function login({ username, password, remember }): Promise<any> {
    const loginRes = await request.post('/user', {
        username: username,
        password: md5(password)
    })
    console.log(loginRes.data)
    return Promise.resolve('')
}

async function register({ username, password, email }): Promise<any> {
    const regRes = await request.post('/user/register', {
        username,
        password: md5(password),
        email: email
    })

    console.log(regRes.data)
    return Promise.resolve('')
}

async function resetPassword({ oldPassword, newPassword }): Promise<any> {
    const resetRes = await request.post('/user/reset', {
        oldPassword: md5(oldPassword),
        newPassword: md5(newPassword)
    })

    console.log(resetRes.data)
    return Promise.resolve('')
}

export {
    login,
    register,
    resetPassword
}