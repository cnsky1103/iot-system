import { Button, Card, Modal } from 'antd';
import { List } from 'antd';
import React from 'react'
import { getMessage } from '../api/device';
import { Device, Message } from '../types/device';

interface Props {
    device: Device
}

export const DeviceCard: React.FC<Props> = ({ device }) => {
    const [messages, setMessages] = React.useState<Message[]>([])
    const [visible, setVisible] = React.useState<boolean>(false)

    React.useEffect(() => {
        getMessage({ clientId: device.clientId })
            .then((res) => {
                //console.log([...res]);
                setMessages(res);
            })
            .catch(console.log)

        const i = setInterval(() => {
            getMessage({ clientId: device.clientId })
                .then((res) => {
                    //console.log([...res]);
                    setMessages(res);
                })
                .catch(console.log)
        }, 1000)
        return () => { clearInterval(i) }
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Card title={device.name} extra={<Button type='primary' onClick={() => { setVisible(true) }}>管理</Button>}>
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    pagination={{
                        pageSize: 8,
                    }}
                    renderItem={item => {
                        return (
                            <List.Item><p style={{ color: (item.alert && item.alert !== 0) ? "red" : "black" }}>{item.info}</p></List.Item>
                        )
                    }}
                />
            </Card>
            <Modal
                title="管理设备"
                visible={visible}
                onCancel={e => { e.preventDefault(); setVisible(false); }}
                footer={null}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <ManageCard />
            </Modal >
        </div>
    );
}

const ManageCard: React.FC<{}> = () => {
    return (
        <Card>
            <Button type="default">重命名</Button>
            <Button type="primary" danger>解绑</Button>
        </Card>
    )
}