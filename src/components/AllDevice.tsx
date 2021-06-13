import { Badge, Button, Card, Descriptions, Form, Input, Modal } from 'antd'
import React from 'react'
import { bindDevice, getAllDevice } from '../api/device'
import { UserContext } from '../context/UserContext'
import { Device } from '../types/device'

interface Props {

}

export const AllDevice: React.FC<Props> = () => {
    const [devices, setDevices] = React.useState<Device[]>([])
    const [bindCardVisible, setBindCardVisible] = React.useState<boolean>(false)

    React.useEffect(() => {
        getAllDevice().then(setDevices).catch(console.log)
    }, [])

    const userContext = React.useContext(UserContext)

    return (
        <div>
            {
                devices.map(device => {
                    return (
                        <div>
                            <Descriptions title={device.name} key={device.clientId} bordered>
                                <Descriptions.Item label="设备ID">{device.clientId}</Descriptions.Item>
                                <Descriptions.Item label="经度">{device.lng}</Descriptions.Item>
                                <Descriptions.Item label="纬度">{device.lat}</Descriptions.Item>
                                <Descriptions.Item label="上次更新">{device.updatedAt}</Descriptions.Item>
                                <Descriptions.Item label="Status" span={3}>
                                    <Badge status="processing" text="Running" />
                                </Descriptions.Item>
                            </Descriptions>
                            {userContext.user.username &&
                                <Button onClick={(e) => { e.preventDefault(); setBindCardVisible(true) }}>绑定</Button>
                            }
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
                })
            }
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