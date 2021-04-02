import React, { useState } from 'react'
import "./App.css"
import { HeaderComponent } from './components/Header'
import { FooterComponent } from './components/Footer'
import Navigator from './components/base/Navigator'
import { Layout } from 'antd';
import { UserContext } from './context/UserContext'

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
    const [user, setUser] = useState({})
    //const value = useMemo(() => ({ user: null, setUser }), [user, setUser])

    return (
        <UserContext.Provider value={{ user, setUser }} >
            <Layout >
                <Sider theme="light" style={{ height: '800px' }}><Navigator /></Sider>
                <Layout>
                    <Header style={{ padding: '0', backgroundColor: 'white' }} ><HeaderComponent /></Header>
                    <Content>
                    </Content>
                    <Footer style={{ padding: '0' }}><FooterComponent /></Footer>
                </Layout>
            </Layout>
        </UserContext.Provider>
    )
}

export default App
