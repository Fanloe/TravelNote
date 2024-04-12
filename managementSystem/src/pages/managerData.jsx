import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Button, theme, Descriptions, Avatar, Upload, Tooltip } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useUser } from '../context/userContext.js';
import axios from 'axios';

const { Content } = Layout;


const ManagerData = () =>{
    
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const navigate = useNavigate();

    const handleSignout = () => {
        navigate('/');
        console.log('注销账号');
    }

    const { user } = useUser();

    const items = [
        {
          key: '1',
          label: '用户名称',
          children:user.username,
        },
        {
          key: '2',
          label: '用户角色',
          children: (user.authority===1) ? '审核员':'管理员' ,
        },
        {
          key: '3',
          label: '用户头像',
          children: '如右图',
        },
        {
          key: '4',
          label: '用户权限描述',
          span: 2,
          children:  (user.authority===1) ? '可以执行审核支持的操作（通过、拒绝）' : '可以执行系统所有支持的操作（通过、拒绝、删除）' ,
        },

      ];

      const [image, setImage] = useState({src:null}); 
      const [refrash,setRefrash] = useState(false);

    
      const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('figures', file); 
    
        try {
          const response = await axios.post(`http://localhost:8080/uploadUserFigure?username=${user.username}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          });
          setRefrash(!refrash);
          console.log(refrash);
        } catch (error) {
          console.error('上传头像失败:', error);
        }
    
        return false;
      };

      useEffect(() => {
        const getUserFigure = async () => {
          try {
            const response = await fetch(`http://localhost:8080/getUserFigure?username=${user.username}`);
            const blob = await response.blob();
            setImage({ src: URL.createObjectURL(blob) });
          } catch (err) {
            console.log(err);
          }
        };
      
        getUserFigure();
      }, [refrash,user]);
      

      
      
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
                                    beforeUpload={handleUpload}
                                    >
                                    {image ? (
                                        <Avatar size={200} src={image.src} />
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
                </div>
                
            </Content>
        </Layout>
    )
}

export default ManagerData;