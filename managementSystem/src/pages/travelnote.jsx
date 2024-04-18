import React, { useState, useEffect } from 'react';
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
  Modal,
  Carousel } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext.js';
import DOMPurify from "dompurify";

const { TextArea } = Input;
const { Meta} = Card;
const { Content } = Layout;



const Travelnote = () => {
  const { id } = useParams(); // 获取路由参数中的作品ID
  const { user } = useUser();

  const navigate = useNavigate()
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isTextareaRequired, setIsTextareaRequired] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const modalText = '请问您确定要删除该作品吗？';
  
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

  const sendToBackend = async (action) => {
    try {
      const status  = action === 'approve' ? '1' : (action === 'reject' ? '2' : '3');
      const response = await axios.get(`http://localhost:8080/addAudit?note=${id}&user=${user.username}&status=${status}&opinion=${textAreaValue}`);
    } catch (err) {
      console.log(err);
    }
    console.log(`Action: ${action}, Text: ${textAreaValue}`);
  };

  const handleAction = (action) => {
    if (action === 'reject' && !textAreaValue.trim()){
      message.warning('拒绝操作时，文本区域不能为空！');
      setIsTextareaRequired(true); 
      return; 
    }else if (action === 'reject' && textAreaValue.trim()){
      message.success(`作品已拒绝`);
      sendToBackend(action);
      navigate('/management');
    }
    else if (action === 'delete'){
      message.warning(`作品已删除`);
      sendToBackend(action);
      navigate('/management');
    }else{
      message.success(`作品已通过审核`);
      sendToBackend(action);
      navigate('/management');
    }
    setIsTextareaRequired(false); 
    
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [image, setImage ] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getNoteById?note=${id}`);
        console.log(response.data.note);
        setDetails(response.data.note); 

        const imageBlobsPromises = response.data.note.pictures.map(async (pictureId) => {
          const imageResponse = await axios.get(`http://localhost:8080/getPicture?picture=${pictureId}`, { responseType: 'blob' });
          // 将Blob数据转换为URL
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return imageUrl;
        });
        const imageUrls = await Promise.all(imageBlobsPromises);
        setImages(imageUrls); 

      } catch (error) {
        console.error('Failed to fetch details:', error);
      }
    }
    
    fetchDetails();

  }, [id]);

  useEffect(() => {
    const getUserFigure = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/getUserFigure?username=${details.user}`, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(res.data);
        setImage(imageUrl);
      } catch (error) {
        console.error('Failed to fetch details:', error);
      }
    }

    getUserFigure();
    
  },[details]);


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  let dynamicItems = [];
  if (details) {
    dynamicItems = [
      {
        key: '1',
        label: '用户名称',
        children: details.user,
      },
      {
        key: '2',
        label: '游记标题',
        children: details.title,
      },
      {
        key: '5',
        label: '发布时间',
        children: details.date,
      },
      {
        key: '3',
        label: '审核状态',
        children: details.status === 0 ? '待审核' : (details.status === 1 ? '已通过' : '未通过'), 
      },
      // {
      //   key: '4',
      //   label: '游记内容',
      //   span: 2,
      //   children: getText(details.content), 
      // },
      
      
    ];
  }

  if (!details) {
    return <div>Loading...</div>; 
  }


  
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
                <Carousel autoplay>
                  {images.map((url, index) => (
                    <div key={index}>
                      <img src={url} alt={`slide-${index}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                  ))}
                </Carousel>
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src={image} />}
                title={details.title}
                description={getText(details.content).slice(0,60)}
              />
            
          </Card>
          <div style={{ 
            width: '63%', 
            padding: '0 70px', 
            background:'white' }}>
            <Descriptions 
              title="作品详情" 
              layout="vertical" 
              items={dynamicItems}
              style={{ marginTop:'10%'}} />
            <h3>作品内容</h3>
            <div style={{ 
              marginBottom:18, 
              marginTop:18,
              border:'1px solid #e9e9e9', 
              padding: '24px', 
              minHeight: '70vh',
              borderRadius: borderRadiusLG,
              backgroundColor: '#fefefe',
              overflowWrap: 'break-word',
              }}>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(details.content),
                }}
              ></p> 
            </div>
            <h3>审核意见</h3>
            <TextArea 
              rows={6} 
              style={{marginBottom:18}}
              value={textAreaValue}
              onChange={handleTextAreaChange}
              required={isTextareaRequired}
            />
              
            <div style={{ display:'flex', gap:'30px', marginBottom:18}}>
              <Button type="primary" onClick={() => handleAction('approve')}>
                通过
              </Button>
              <Button danger onClick={() => handleAction('reject')}>
                拒绝
              </Button>
              {user.authority === '2' && (<Button type="primary" danger onClick={() => showModal()}>
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