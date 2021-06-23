import request from './axios'
import { md5 } from '../utils/md5'

async function login({ username, password, remember }): Promise<any> {
    const loginRes = await request.post('/user/login', {
        username: username,
        password: md5(password)
    })
    //console.log(loginRes.data.code)
    if (loginRes.data.code === 0)
        return Promise.resolve(loginRes.data.data)
    else
        return Promise.reject(loginRes.data.error)
}

async function register({ username, password, email }): Promise<any> {
    const regRes = await request.post('/user/register', {
        username,
        password: md5(password),
        email: email
    })

    //console.log(regRes.data)
    if (regRes.data.code === 0)
        return Promise.resolve(regRes.data.data)
    else
        return Promise.reject(regRes.data.error)
}

async function resetPassword({ username, oldPassword, newPassword }): Promise<any> {
    const resetRes = await request.post('/user/reset', {
        username,
        oldPassword: md5(oldPassword),
        newPassword: md5(newPassword)
    })

    //console.log(resetRes)
    if (resetRes.data)
        return Promise.resolve({ code: 1 })
    else
        return Promise.resolve({ code: 0 })
}

export {
    login,
    register,
    resetPassword
}