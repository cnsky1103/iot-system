import React from 'react'
import { ModalContext } from '../../context/ModalContext'
import { Card, Form, Input, Button } from 'antd'
import { register } from '../../api/account'

interface Props {
}

export const RegisterCard: React.FC<Props> = () => {
    const modalContext = React.useContext(ModalContext)

    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log(values);
        register(values).then(() => alert("注册成功！")).catch(alert)
    }

    return (
        <Card title={null} style={{ width: "300px" }} bordered={false}>
            <Form
                form={form}
                onFinish={values => { onFinish(values); modalContext.setRegisterVisible(false) }}
                name="register">
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式错误！',
                        },
                        {
                            required: true,
                            message: '请输入邮箱！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                        {
                            type: 'string'
                        },
                        {
                            min: 6,
                            message: '密码长度过短！'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="昵称"
                    rules={[{ required: true, message: '请输入昵称！', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ display: 'flex', justifyContent: 'center' }}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}