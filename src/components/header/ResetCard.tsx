import React from 'react'
import { Card, Form, Input } from 'antd'
import { ModalContext } from '../../context/ModalContext';
import { useForm } from 'antd/lib/form/Form';

interface Props {

}

export const ResetCard: React.FC<Props> = () => {
    const modalContext = React.useContext(ModalContext)
    const [form] = useForm()
    return (
        <Card title={null} style={{ width: "300px" }} bordered={false}>
            <Form
                form={form}
                onFinish={value => { console.log(value); modalContext.setResetVisible(false) }}
                name="reset">

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
            </Form>
        </Card>
    );
}