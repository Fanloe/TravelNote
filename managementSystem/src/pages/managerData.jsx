
import { Breadcrumb, Layout, Button, theme, Descriptions, Avatar, Space, Upload, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import image1 from '../images/test1.jpg';

const { Content } = Layout;



const items = [
    {
      key: '1',
      label: '用户名称',
      children: '小巨人',
    },
    {
      key: '2',
      label: '用户角色',
      children: '管理员',
    },
    {
      key: '3',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '4',
      label: '用户权限描述',
      span: 2,
      children: '可以执行系统所有支持的操作（通过、拒绝、删除）' ,
    },
    {
      key: '5',
      label: 'Remark',
      children: 'empty',
    },
  ];


const managerData = () =>{

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const handleLogout = () => {
        console.log('退出登录');
    }

    const handleSignout = () => {
        console.log('注销账号');
    }
      
    return (
        <Layout>
            <Content
            style={{
                margin: '0 35px',
            }}
            >
                <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>
                        <Link to='/home'>
                        首页
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to='/managerdata'>
                        用户信息
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                    padding: 24,
                    minHeight: 480,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    }}
                >
                    <div style={{display: 'flex',justifyContent:'spcae-between'}}> 
                        <Descriptions 
                            title="用户信息" 
                            layout="vertical" 
                            items={items} 
                            style={{width:'70%', padding: 30}}
                        />;
                        <div style={{marginTop:20}}>
                            <Tooltip title="点击上传头像">
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    >
                                    {image1 ? (
                                        <Avatar size={200} src={image1} />
                                    ) : (
                                        <Avatar size={200} icon={<UserOutlined />} />
                                    )}
                                </Upload>
                            </Tooltip>
                        </div>
                    </div>
                    <br />
                    <Button type="default" style={{marginLeft:30}} onClick={() => handleSignout()}>
                        退出登录
                    </Button>
                    <Button type="default" style={{marginLeft:30}} onClick={() => handleLogout()}>
                        注销账号
                    </Button>
                </div>
                
            </Content>
        </Layout>
    )
}

export default managerData;