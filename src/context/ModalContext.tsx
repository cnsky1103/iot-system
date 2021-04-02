import React from 'react'

export const ModalContext = React.createContext({
    loginVisible: false,
    setLoginVisible: (v: boolean) => { },
    registerVisible: false,
    setRegisterVisible: (v: boolean) => { },
    resetVisible: false,
    setResetVisible: (v: boolean) => { }
})