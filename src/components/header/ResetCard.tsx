import React from 'react'
import { Button, Card, Form, Input } from 'antd'
import { ModalContext } from '../../context/ModalContext';
import { useForm } from 'antd/lib/form/Form';
import { UserOutlined } from '@ant-design/icons';
import { resetPassword } from '../../api/account';

interface Props {

}

export const ResetCard: React.FC<Props> = () => {
    const modalContext = React.useContext(ModalContext)
    const [form] = useForm()

    const onFinish = (values) => {
        resetPassword(values)
            .then(res => {
                if (res.code === 1) {
                    alert("修改密码成功！！！")
                } else {
                    alert("修改密码失败！！！")
                }
            })
            .catch(console.log)
    }

    return (
        <Card title={null} style={{ width: "300px" }} bordered={false}>
            <Form
                form={form}
                onFinish={values => { onFinish(values); modalContext.setResetVisible(false) }}
                name="reset">

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入账号！' }]}
                    label="用户名"
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                </Form.Item>

                <Form.Item
                    name="oldPassword"
                    label="旧密码"
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
                    name="newPassword"
                    label="新密码"
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        style={{ marginRight: '20px' }}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </Card >
    );
}