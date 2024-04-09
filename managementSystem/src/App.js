import React, { useState, useEffect } from 'react';
import {
  useRoutes, 
  useNavigate,
  useLocation,
} from "react-router-dom";
import routes from './router/router'
import { Layout, Menu, Button, ConfigProvider, Avatar, Dropdown} from 'antd'
import { PageHeader } from '@ant-design/pro-layout';
import { UserOutlined, SettingOutlined,FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import './css/style.css';


const { Header, Sider, Content, Footer } = Layout


const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/managerdata">个人信息</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <a href="/">退出登录</a>
    </Menu.Item>
  </Menu>
);

function App() {
  const location = useLocation();
  const shouldRenderSidebarAndHeader = !['/', '/register'].includes(location.pathname);
  //隐藏样式的页面
  let element = useRoutes(routes)
  const navigate = useNavigate()
  const items = []
  routes.forEach((item) => {
    if(item.path !== '/' && item.path !== '/register' && item.path !== '/travelnote'){
      //侧边栏不显示的页面
      items.push({
        label: item.label,
        key: item.path,
        icon: item.icon,
        children:
          item.children &&
          item.children.map((child) => {
            return {
              label: child.label,
              key: item.path + '/' + child.path,
              icon: child.icon,
            }
          }),
      })
    }
  })

  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    navigate(e.key, { replace:true });
    console.log('click ', e);
  }

  const handleSignout = () => {
    console.log('signout');
    navigate('/');
  }
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };


  return(
    <ConfigProvider
      theme={{

        token: {
          colorBgBase:'#f4f5f8'
        },
        components: {
          Table: {
            headerBg:'#ffffff',
            footerBg:'#ffffff',
          },
        },
      }}
    >
      <Layout>
        {shouldRenderSidebarAndHeader && (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', background: '#04142c',height:70 }}>
          <div style={{ display: 'flex', alignItems: 'center', color:'white', padding:10, gap:8 }}>
              <img src="/logo192.png" width='30' />
              <h2>游记审核管理系统</h2>
          </div>
      
          <div style={{ display: 'flex', alignItems: 'center' }}>

            
            <Button
              type="text"
              icon={isFullscreen ? <FullscreenExitOutlined style={{color:'white'}} /> : <FullscreenOutlined style={{color:'white'}}/>}
              onClick={handleFullscreen}
              style={{margin:10, marginTop:15}}
            />
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Avatar style={{ backgroundColor: '#ffffff' }} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </div>
        </Header>)}
          
        <Layout
          style={{
              minHeight: '93vh',
          }}
        >
        {shouldRenderSidebarAndHeader && (
        <Sider 
        collapsible={true}
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} >
            </Menu>
        </Sider>)}
        
        <Layout>
          <Content>
            {element}
          </Content>
          {shouldRenderSidebarAndHeader && (
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
          Management System Created by Group 水杉水杉
          </Footer>
          )}
            
        </Layout>
      </Layout>
      </Layout>
    </ConfigProvider>
  );

}

export default App;
