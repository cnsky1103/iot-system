import React from 'react'
import "./App.css"
import { HeaderComponent } from './components/Header'
import { FooterComponent } from './components/Footer'
import Navigator from './components/base/Navigator'
import { Layout } from 'antd';
import { LoginContext, defaultValue } from './context/LoginContext'

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
    return (
        <LoginContext.Provider value={defaultValue} >
            <Layout>
                <Sider><Navigator /></Sider>
                <Layout>
                    <Header style={{ padding: '0', height: '48px' }}><HeaderComponent /></Header>
                    <Content></Content>
                    <Footer style={{ padding: '0' }}><FooterComponent /></Footer>
                </Layout>
            </Layout>
        </LoginContext.Provider>
    )
}

export default App
