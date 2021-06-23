import React, { useState } from 'react'
import { LoginButton } from './header/LoginButton'
import { RegisterButton } from './header/RegisterButton'
import { ModalContext } from '../../context/ModalContext'
import { UserContext } from '../../context/UserContext'
import { Button } from 'antd'

interface Props {

}

export const HeaderComponent: React.FC<Props> = () => {
    const [loginVisible, setLoginVisible] = useState<boolean>(false)
    const [registerVisible, setRegisterVisible] = useState<boolean>(false)
    const [resetVisible, setResetVisible] = useState<boolean>(false)

    const userContext = React.useContext(UserContext)
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#fff' }}>
            <ModalContext.Provider value={{ loginVisible, setLoginVisible, registerVisible, setRegisterVisible, resetVisible, setResetVisible }}>
                {userContext.user.username ?
                    <div>
                        お帰りなさい! {userContext.user.username}
                        &nbsp;&nbsp;&nbsp;
                        <LogoutButton />
                    </div>
                    :
                    <>
                        <LoginButton />
                        <RegisterButton />
                    </>}
            </ModalContext.Provider>
        </div>
    );
}

const LogoutButton: React.FC<{}> = () => {
    const userContext = React.useContext(UserContext)
    return (
        <Button
            type="primary"
            onClick={() => {
                userContext.setUser({ username: undefined })
            }}>
            登出
        </Button>
    )
}