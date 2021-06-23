import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Navigator = () => {
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  let history = useHistory();

  const userContext = React.useContext(UserContext)

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div>
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} siderCollapsed>
        <Menu.Item key="m1" icon={<AppstoreOutlined />} onClick={() => { history.push('/device') }}>全部设备</Menu.Item>
        <Menu.Item key="m2" icon={<AppstoreOutlined />} onClick={() => { history.push('/devicestat') }}>设备统计</Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="我的设备">
          <Menu.Item key="1" onClick={() => {
            userContext.user.username ?
              history.push(`/device/${userContext.user.username}`)
              : alert("请先登录！")
          }}>管理设备</Menu.Item>
          <Menu.Item key="2" onClick={() => {
            userContext.user.username ?
              history.push(`/map/${userContext.user.username}`)
              : alert("请先登录！")
          }}>查看地图</Menu.Item>
        </SubMenu>
        <Menu.Item key="m3" icon={<SettingOutlined />} onClick={() => { history.push('/settings') }}>设置</Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigator