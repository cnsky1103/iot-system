import { List } from 'antd'
import React from 'react'
import { getAllDevice, getDeviceByUser } from '../api/device'
import { UserContext } from '../context/UserContext'
import { Device } from '../types/device'
import { DeviceDescription } from './DeviceDescription'

interface Props {

}

export const AllDevice: React.FC<Props> = () => {
    const [devices, setDevices] = React.useState<Device[]>([])
    const [userDevices, setUserDevices] = React.useState<Device[]>([])
    const userContext = React.useContext(UserContext)
    const [date, setDate] = React.useState<number>(0)

    React.useEffect(() => {
        setDate(new Date().getTime())
        getAllDevice().then((res) => { console.log(res); setDevices(res) }).catch(console.log);
        if (userContext.user.username) {
            getDeviceByUser({ username: userContext.user.username })
                .then(setUserDevices)
                .catch(alert)
        }

        const i = setInterval(() => {
            setDate(new Date().getTime())
            getAllDevice().then((res) => { console.log(res); setDevices(res) }).catch(console.log);
            if (userContext.user.username) {
                getDeviceByUser({ username: userContext.user.username })
                    .then(setUserDevices)
                    .catch(alert)
            }
        }, 3000)
        return () => { clearInterval(i) }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={devices}
                renderItem={device => {
                    return (
                        <DeviceDescription date={date} device={device} userDevices={userDevices} />
                    )
                }}
            />
        </div>
    );
}