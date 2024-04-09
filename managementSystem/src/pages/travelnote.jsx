import React, { useState } from 'react';
import { 
  Layout, 
  Button, 
  message, 
  Breadcrumb, 
  theme, 
  Card, 
  Avatar, 
  Input, 
  Descriptions,
  Modal } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import image1 from '../images/test1.jpg'
import { useNavigate, Link } from 'react-router-dom';

const { TextArea } = Input;
const { Meta} = Card;
const { Content } = Layout;

const items = [
  {
    key: '1',
    label: '用户名称',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: '游记标题',
    children: '标题标题标',
  },
  {
    key: '3',
    label: '审核状态',
    children: '待审核',
  },
  {
    key: '4',
    label: '游记内容',
    span: 2,
    children: '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
  },
];

const Travelnote = () => {
  const navigate = useNavigate()
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isTextareaRequired, setIsTextareaRequired] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalText = '请问您确定要删除该作品吗？';
  const userRole = 'admin';

  
  const showModal = () => {
    setIsTextareaRequired(false);
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    handleAction('delete');
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const sendToBackend = (action) => {
    // 模拟发送数据到后端的操作
    console.log(`Action: ${action}, Text: ${textAreaValue}`);
  };

  const handleAction = (action) => {
    if (action === 'reject' && !textAreaValue.trim()){
      message.warning('拒绝操作时，文本区域不能为空！');
      setIsTextareaRequired(true); 
      return; 
    }else if (action === 'reject' && textAreaValue.trim()){
      message.success(`作品已拒绝`);
      navigate('/management');
    }
    else if (action === 'delete'){
      message.warning(`作品已删除`);
      navigate('/management');
    }else{
      message.success(`作品已通过审核`);
      navigate('/management');
    }
    setIsTextareaRequired(false); 
    sendToBackend(action);
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
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
            <Link to='/management'>
            审核状态
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <Link to='/travelnote'>
            作品详情
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            display:'flex',
            justifyContent: 'space-between',
            padding: 24,
            minHeight: '70vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Card
            style={{
              width: '35%',
              height: '35%',
            }}
            loading={false}
            hoverable={true}
            cover={
              <img
                alt="test"
                src={image1}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}>
            
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title="Card title"
              description="This is the description"
            />
            
          </Card>
          <div style={{ 
            width: '63%', 
            padding: '0 70px', 
            background:'white' }}>
            <Descriptions 
              title="作品详情" 
              layout="vertical" 
              items={items}
              style={{ marginTop:'10%'}} />
            
            <h3>审核意见</h3>
            <TextArea 
              rows={6} 
              style={{marginBottom:18}}
              value={textAreaValue}
              onChange={handleTextAreaChange}
              required={isTextareaRequired}
            />
              
            <div style={{ display:'flex', gap:'30px'}}>
              <Button type="primary" onClick={() => handleAction('approve')}>
                通过
              </Button>
              <Button danger onClick={() => handleAction('reject')}>
                拒绝
              </Button>
              {userRole === 'admin' && (<Button type="primary" danger onClick={() => showModal()}>
                删除
              </Button>)}
              <Modal
                title="警告"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                style={{ marginTop:250 }}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    取消
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    确认
                  </Button>]}
              >
                <p>{modalText}</p>
              </Modal>
            </div>
          </div>
        </div>
      </Content>
      
  </Layout>
  );
};

export default Travelnote;
