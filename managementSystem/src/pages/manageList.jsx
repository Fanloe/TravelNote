import React, { useState, useEffect } from 'react';
import { 
  Layout,
  Table, 
  Input,  
  Breadcrumb, 
 } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import wait from '../images/pending.png'
import pass from '../images/pass.png'
import fail from '../images/fail.png'

import { useNavigate, Link} from 'react-router-dom';

const { Content } = Layout;
const { Column } = Table;
const { Search } = Input;

const statusMap = {
  0: { text: "待审核", image: wait },
  1: { text: "已通过", image: pass },
  2: { text: "未通过", image: fail },
};


const Management = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const renderSerialNumber = (text, record, index) => {
    return (currentPage - 1) * 5 + index + 1;
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAllNotes`);
        const notes = response.data.array; 
  
        // 并行获取所有图片的Blob数据
        const fetchImagesBlobsPromises = notes.map(async (note) => {
          const imageResponse = await axios.get(`http://localhost:8080/getPicture?picture=${note.pictures[0]}`, { responseType: 'blob' });
          // 创建一个Blob URL
          const imageUrl = URL.createObjectURL(imageResponse.data); 
          return imageUrl;
        });
  
        // 等待所有图片Blob URL的请求完成
        const imagesUrls = await Promise.all(fetchImagesBlobsPromises);
        // 将图片URL添加到作品数据中
        const formattedData = notes.map((item, index) => ({
          key: item._id,
          item: {
            image: imagesUrls[index], // 使用生成的Blob URL
            user: item.user,
            title: item.title,
            content: item.content,
          },
          status: item.status,
        }));
  
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    
    fetchData();
  }, []);

  const onSearch = async (value) => {
    try {
      if ( value !== ''){
        const response = await axios.get(`http://localhost:8080/searchText?query=${value}`);
        const notes = response.data.result; 
    
        const fetchImagesBlobsPromises = notes.map(async (note) => {
          const imageResponse = await axios.get(`http://localhost:8080/getPicture?picture=${note.pictures[0]}`, { responseType: 'blob' });
          const imageUrl = URL.createObjectURL(imageResponse.data); 
          return imageUrl;
        });
  
        const imagesUrls = await Promise.all(fetchImagesBlobsPromises);
        const formattedData = notes.map((item, index) => ({
          key: item._id,
          item: {
            image: imagesUrls[index], 
            user: item.user,
            title: item.title,
            content: item.content,
          },
          status: item.status,
        }));
  
        setData(formattedData);
      }else{
        const response = await axios.get(`http://localhost:8080/getAllNotes`);
        const notes = response.data.array; 
  
        const fetchImagesBlobsPromises = notes.map(async (note) => {
          const imageResponse = await axios.get(`http://localhost:8080/getPicture?picture=${note.pictures[0]}`, { responseType: 'blob' });
          const imageUrl = URL.createObjectURL(imageResponse.data); 
          return imageUrl;
        });
  
        const imagesUrls = await Promise.all(fetchImagesBlobsPromises);
        const formattedData = notes.map((item, index) => ({
          key: item._id,
          item: {
            image: imagesUrls[index], // 使用生成的Blob URL
            user: item.user,
            title: item.title,
            content: item.content,
          },
          status: item.status,
        }));
  
        setData(formattedData);
      }
      
    } catch (error) {
      console.error('搜索失败', error);
    }
  };


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
        </Breadcrumb>
        <div>
          <Search
            placeholder="输入作品名称搜索"
            onSearch={onSearch}
            enterButton={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SearchOutlined />
                <span style={{ marginLeft: '5px' }}>Search</span>
              </div>
            }
            size="large"
            style={{ 
              width: '95%', 
              marginBottom: 25, 
              marginLeft: 30,
              boxShadow:'0 4px 4px rgba(0, 0, 0, 0.1)', 
              padding: 5, 
              backgroundColor: '#fff'}}
          />
        </div>
        <Table
          dataSource={data}
          pagination={{ pageSize: 5, showSizeChanger: true, onChange: handlePaginationChange  }}
          bordered
          size="large"
          style={{ boxShadow:'0 2px 10px rgba(0, 0, 0, 0.1)', marginLeft: 30, marginRight: 30, borderRadius: 10}}
          onRow={(record) => {
            return {
              onClick:() => {
                navigate(`travelnote/${record.key}`);
              }
            }
          }}
        >
           <Column
            title="序号"
            dataIndex="serialNumber"
            key="serialNumber"
            render={renderSerialNumber}
            align="center"
          />
          <Column
            title="游记作品"
            dataIndex="item"
            key="item"
            width='80%'
            align="center"
            render= {(item, record) => (
              <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => navigate('/travelnote')}>
                <div style={{ marginRight: '20px' }}>
                  <img 
                    src={record.item.image} 
                    alt="图片"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}}
                  />
                </div>
                <div style={{ textAlign:'left'}}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', maxWidth: '600px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical'}}>{item.title}</div>
                  <div style={{ fontSize: '12px',maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>作者：{item.user}</div>
                  <div style={{ maxWidth: '900px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>{item.content}</div>
                </div>
              </div>
            )}
          />
          <Column
            title='审核状态'
            dataIndex="status"
            key="status"
            align='center'
            filters={[
              {
                text:'待审核',
                value:0
              },
              {
                text:'已通过',
                value:1
              },
              {
                text:'未通过',
                value:2
              },
            ]}
            onFilter={(value, record) => record.status === value}
            render={status => (
              <span>
                {statusMap[status] && statusMap[status].image ? (
                  <img
                    src={statusMap[status].image}
                    alt={statusMap[status].text}
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px' }}
                  />
                ) : (
                  statusMap[status].text
                )}
              </span>
            )}
          />
        </Table>
      </Content>
    <Layout>
    </Layout>
  </Layout>
  );
};

export default Management;
