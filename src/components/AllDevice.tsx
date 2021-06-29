import { Badge, Button, Card, Descriptions, Form, Input, List, Modal } from 'antd'
import React from 'react'
import { bindDevice, getAllDevice, getDeviceByUser } from '../api/device'
import { UserContext } from '../context/UserContext'
import { Device } from '../types/device'
import { formDate, formDateTime } from '../utils/date'

interface Props {

}

export const AllDevice: React.FC<Props> = () => {
    const [devices, setDevices] = React.useState<Device[]>([])
    const [bindCardVisible, setBindCardVisible] = React.useState<boolean>(false)
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


    const getDeviceName = (device: Device) => {
        if (!userContext.user.username) {
            return device.name
        }

        const name = userDevices.find(e => e.clientId === device.clientId)?.name
        return name ? name : device.name
    }

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={devices}
                renderItem={device => {
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
                                title="登录"
                                visible={bindCardVisible}
                                onCancel={e => { e.preventDefault(); setBindCardVisible(false); }}
                                footer={null}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <BindCard setBindCardVisible={setBindCardVisible} clientId={device.clientId} />
                            </Modal >
                        </div>
                    )
                }}
            />
        </div>
    );
}

const BindCard: React.FC<{
    setBindCardVisible: (value: React.SetStateAction<boolean>) => void,
    clientId: String
}> = ({ setBindCardVisible, clientId }) => {
    const userContext = React.useContext(UserContext)

    const onFinish = (values) => {
        bindDevice({
            username: userContext.user.username,
            clientId: clientId,
            name: values.name
        }).then(console.log).catch(console.log)

        setBindCardVisible(false)
    }
    return (
        <Card title={null} style={{ width: "300px" }} bordered={false}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={(values) => { onFinish(values); }}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: '请输入设备名！' }]}
                >
                    <Input placeholder="设备名" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="bind-form-button"
                        style={{ marginRight: '20px' }}>
                        绑定
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}