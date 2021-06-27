import React, { useContext } from 'react'
import { Modal, Button } from 'antd'
import { LoginCard } from './LoginCard'
import { ModalContext } from '../../../context/ModalContext'
interface Props {

}

export const LoginButton: React.FC<Props> = () => {
    const modalContext = useContext(ModalContext)

    return (
        <>
            <Button
                type="primary"
                onClick={(e) => { e.preventDefault(); modalContext.setLoginVisible(true) }}
                style={{ margin: '10px' }} >
                登录
            </Button>
            <Modal
                title="登录"
                visible={modalContext.loginVisible}
                onCancel={e => { e.preventDefault(); modalContext.setLoginVisible(false); }}
                footer={null}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <LoginCard />
            </Modal >
        </>
    );
}