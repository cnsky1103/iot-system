import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Navigator = () => {
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  let history = useHistory();

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
      <button>114514</button>
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} siderCollapsed>
        <Menu.Item key="m1" icon={<AppstoreOutlined />} onClick={() => { history.push('/device') }}>全部设备</Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="我的设备">
          <Menu.Item key="1">管理设备</Menu.Item>
          <Menu.Item key="2">查看地图</Menu.Item>
        </SubMenu>
        <Menu.Item key="m2" icon={<SettingOutlined />} onClick={() => { history.push('/settings') }}>设置</Menu.Item>
        {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    </div>
  );
};

export default Navigator