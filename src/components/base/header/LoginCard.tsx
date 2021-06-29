import React from 'react'
import { Card, Form, Input, Button, Checkbox, Tag } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ModalContext } from '../../../context/ModalContext';
import { login } from '../../../api/account'
import { UserContext } from '../../../context/UserContext';

interface Props {
}

export const LoginCard: React.FC<Props> = () => {
    const userContext = React.useContext(UserContext)

    const onFinish = (values: any) => {
        console.log({ ...values });
        login(values)
            .then(res => {
                console.log(res);
                userContext.setUser({ username: values.username });
                modalContext.setLoginVisible(false);
            })
            .catch(alert);
    };

    const modalContext = React.useContext(ModalContext)

    return (
        <Card title={null} style={{ width: "300px" }} bordered={false}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={(values) => { onFinish(values); }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入账号！' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <div style={{ display: 'flex' }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Tag.CheckableTag checked={true} onChange={() => {
                            modalContext.setLoginVisible(false);
                            modalContext.setResetVisible(true)
                        }}>
                            忘记密码？
                        </Tag.CheckableTag>
                    </div>
                </Form.Item> */}


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        style={{ marginRight: '20px' }}>
                        登录
                    </Button>

                    <Tag.CheckableTag checked={true} onChange={() => {
                        modalContext.setLoginVisible(false);
                        modalContext.setRegisterVisible(true)
                    }}>
                        现在注册！
                    </Tag.CheckableTag>
                </Form.Item>
            </Form>
        </Card >
    );
}