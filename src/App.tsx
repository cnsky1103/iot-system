import React, { useState } from 'react'
import "./App.css"
import { HeaderComponent } from './components/base/Header'
import { FooterComponent } from './components/base/Footer'
import Navigator from './components/base/Navigator'
import { Layout } from 'antd';
import { UserContext } from './context/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Settings } from './components/base/Settings'
import { AllDevice } from './components/AllDevice'
import { UserDevice } from './components/UserDevice'
import { DeviceMap } from './components/DeviceMap'
import { DeviceStat } from './components/DeviceStat'

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
    let defaultUser = {
        username: undefined,
    }
    const [user, setUser] = useState<any>(defaultUser)
    //const value = useMemo(() => ({ user: null, setUser }), [user, setUser])

    return (
        <UserContext.Provider value={{ user, setUser }} >
            <Layout >
                <Router>
                    <Sider theme="light" style={{ height: '800px' }}><Navigator /></Sider>
                    <Layout>
                        <Header style={{ padding: '0', backgroundColor: 'white' }} ><HeaderComponent /></Header>
                        <Content>

                            <Switch>
                                <Route exact path="/device" children={() => { return <AllDevice /> }} />
                                <Route exact path="/devicestat" children={() => { return <DeviceStat /> }} />
                                <Route path="/device/:username" children={() => { return <UserDevice /> }} />
                                <Route path="/settings" children={() => { return <Settings /> }} />
                                {<Route path="/map/:username" children={() => { return <DeviceMap /> }} />}
                            </Switch>
                        </Content>
                        <Footer style={{ padding: '0' }}><FooterComponent /></Footer>
                    </Layout>
                </Router>
            </Layout>
        </UserContext.Provider>
    )
}

export default App
