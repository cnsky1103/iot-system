export declare interface Device {
    clientId: string,
    name?: string,
    lat: number,
    lng: number,
    updatedAt?: string
}

export declare interface Message {
    clientId: string,
    info: string,
    lat: number,
    lng: number,
    alert?: number,
    createdAt?: string,
    updatedAt?: string,
}

export declare interface MessageList {
    clientId: Message[]
}