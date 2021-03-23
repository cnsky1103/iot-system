import React from 'react'
//import { AppBar, Tabs, Tab } from '@material-ui/core'
import { LoginOutlined } from '@ant-design/icons'

interface Props {

}

export const HeaderComponent: React.FC<Props> = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LoginOutlined />
        </div>
    );
}