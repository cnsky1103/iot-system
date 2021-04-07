import React from 'react'
import { Card, Form, Input } from 'antd'
import { ModalContext } from '../../context/ModalContext';
import { useForm } from 'antd/lib/form/Form';
import { resetPassword } from '../../api/account';

interface Props {

}

export const ResetCard: React.FC<Props> = () => {
    const modalContext = React.useContext(ModalContext)
    const [form] = useForm()

    const onFinish = (values) => {
        resetPassword(values).then(console.log).catch(console.log)
    }

    return (
        <Card title={null} style={{ width: "300px" }} bordered={false}>
            <Form
                form={form}
                onFinish={values => { onFinish(values); modalContext.setResetVisible(false) }}
                name="reset">

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
            </Form>
        </Card >
    );
}