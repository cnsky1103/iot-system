import React from 'react'
import { Modal, Button } from 'antd'
import { RegisterCard } from './RegisterCard'
import { ModalContext } from '../../context/ModalContext'
interface Props {

}

export const RegisterButton: React.FC<Props> = () => {
    const modalContext = React.useContext(ModalContext)

    return (
        <>
            <Button
                type="primary"
                onClick={(e) => { e.preventDefault(); modalContext.setRegisterVisible(true) }}
                style={{ margin: '10px' }} >
                注册
            </Button>
            <Modal
                title="注册"
                visible={modalContext.registerVisible}
                onCancel={e => { e.preventDefault(); modalContext.setRegisterVisible(false) }}
                footer={null}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <RegisterCard />
            </Modal>
        </>
    );
}