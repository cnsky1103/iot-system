import React, { useState } from 'react'
import { LoginButton } from './header/LoginButton'
import { RegisterButton } from './header/RegisterButton'
import { ModalContext } from '../context/ModalContext'

interface Props {

}

export const HeaderComponent: React.FC<Props> = () => {
    const [loginVisible, setLoginVisible] = useState<boolean>(false)
    const [registerVisible, setRegisterVisible] = useState<boolean>(false)
    const [resetVisible, setResetVisible] = useState<boolean>(false)

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#fff' }}>
            <ModalContext.Provider value={{ loginVisible, setLoginVisible, registerVisible, setRegisterVisible, resetVisible, setResetVisible }}>
                <LoginButton />
                <RegisterButton />
            </ModalContext.Provider>
        </div>
    );
}