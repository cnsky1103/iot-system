import { Button, Card, Form, Input } from 'antd';
import React from 'react'
import { bindDevice } from '../api/device';
import { UserContext } from '../context/UserContext';

interface Props {
    setBindCardVisible: (value: React.SetStateAction<boolean>) => void,
    clientId: String
}

export const BindCard: React.FC<Props> = ({ setBindCardVisible, clientId }) => {
    const userContext = React.useContext(UserContext)

    const onFinish = (values) => {
        bindDevice({
            username: userContext.user.username,
            clientId: clientId,
            name: values.name
        }).then(alert).catch(console.log)

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