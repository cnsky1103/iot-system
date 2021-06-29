import { List } from 'antd';
import React from 'react'
import { getDeviceByUser } from '../api/device';
import { UserContext } from '../context/UserContext';
import { Device } from '../types/device'
import { DeviceCard } from './DeviceCard';

interface Props {

}

export const UserDevice: React.FC<Props> = () => {
    const userContext = React.useContext(UserContext)
    const [devices, setDevices] = React.useState<Device[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        getDeviceByUser({ username: userContext.user.username })
            .then(res => {
                setDevices(res);
                setLoading(false)
            })
            .catch(alert)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userContext.user.username])

    return (
        <div>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={devices}
                renderItem={item => (
                    <List.Item>
                        {loading ? <h3>Loading</h3> : <DeviceCard device={item} />}
                    </List.Item>
                )}
            />
        </div>
    );
}