import request from './axios'

async function getAllDevice(): Promise<any> {
    const devices = await request.get('/device')

    //console.log(devices)

    if (devices.data.code === 0) {
        return Promise.resolve(devices.data.data)
    } else {
        return Promise.reject(devices.data.error)
    }
}

async function getDeviceByUser({ username }): Promise<any> {
    const devices = await request.get(`/device/${username}`)

    if (devices.data.code === 0) {
        return Promise.resolve(devices.data.data)
    } else {
        return Promise.reject(devices.data.error)
    }
}

async function bindDevice({ username, clientId, name }): Promise<any> {
    const b = await request.post('/device/bind/', {
        username,
        clientId,
        name
    })

    if (b.data.code === 0) {
        return Promise.resolve('绑定成功!!')
    } else {
        return Promise.reject(b.data.error)
    }
}

async function getAllMessages(): Promise<any> {
    const messages = await request.get('/device/allmessage')

    //console.log(messages)

    if (messages.data.code === 0) {
        return Promise.resolve(messages.data.data)
    } else {
        return Promise.reject(messages.data.error)
    }
}

async function getMessage({ clientId }): Promise<any> {
    const messages = await request.get(`/device/message/${clientId}`)

    //console.log(messages)

    if (messages.data.code === 0) {
        return Promise.resolve(messages.data.data)
    } else {
        return Promise.reject(messages.data.error)
    }
}

export {
    getAllDevice,
    getDeviceByUser,
    bindDevice,
    getMessage,
    getAllMessages
}