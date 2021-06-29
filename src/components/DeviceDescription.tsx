import { Badge, Button, Descriptions, Modal } from 'antd';
import React from 'react'
import { UserContext } from '../context/UserContext';
import { Device } from '../types/device';
import { formDate, formDateTime } from '../utils/date';
import { BindCard } from './BindCard';

interface Props {
    device: Device,
    date: number,
    userDevices: Device[]
}

export const DeviceDescription: React.FC<Props> = ({ device, date, userDevices }) => {
    const userContext = React.useContext(UserContext)
    const [bindCardVisible, setBindCardVisible] = React.useState<boolean>(false)

    const getDeviceName = (device: Device) => {
        if (!userContext.user.username) {
            return device.name
        }

        const name = userDevices.find(e => e.clientId === device.clientId)?.name
        return name ? name : device.name
    }

    return (
        <div key={device.clientId}>
            <Descriptions title={getDeviceName(device)} bordered>
                <Descriptions.Item label="设备ID">{device.clientId}</Descriptions.Item>
                <Descriptions.Item label="经度">{device.lng}</Descriptions.Item>
                <Descriptions.Item label="纬度">{device.lat}</Descriptions.Item>
                <Descriptions.Item label="上次更新">{formDate(device.updatedAt)}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    {(date - formDateTime(device.updatedAt) < 5000) ?
                        <Badge status="processing" text="Running" />
                        : <Badge status="error" text="停止运行" />}
                </Descriptions.Item>
                <Descriptions.Item label="操作">
                    {userContext.user.username &&
                        <Button onClick={(e) => { e.preventDefault(); setBindCardVisible(true) }}>绑定</Button>
                    }
                </Descriptions.Item>
            </Descriptions>

            <Modal
                title="绑定"
                visible={bindCardVisible}
                onCancel={e => { e.preventDefault(); setBindCardVisible(false); }}
                footer={null}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <BindCard setBindCardVisible={setBindCardVisible} clientId={device.clientId} />
            </Modal >
        </div>
    );
}