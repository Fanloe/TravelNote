import React, { useState } from 'react';
import { 
  Layout,
  Table, 
  Input,  
  Breadcrumb, 
 } from 'antd';
import { UserOutlined, DashboardOutlined,SearchOutlined } from '@ant-design/icons';
import image1 from '../images/test1.jpg'
import image2 from '../images/test2.jpg'
import image3 from '../images/test3.jpg'
import wait from '../images/pending.png'
import pass from '../images/pass.png'
import fail from '../images/fail.png'

import { useNavigate, Link} from 'react-router-dom';

const { Content } = Layout;
const { Column } = Table;
const { Search } = Input;

const data = [
  {
    key: '1',
    item: {
      image:image1,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '待审核',
  },
  {
    key: '2',
    item: {
      image:image2,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '已通过',
  },
  {
    key: '3',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '4',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '5',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '6',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '7',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '8',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '9',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '10',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },
  {
    key: '11',
    item: {
      image:image3,
      title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      content:'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
    },
    status: '未通过',
  },

];



const Management = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  
  const [currentPage, setCurrentPage] = useState(1);
  const renderSerialNumber = (text, record, index) => {
    return (currentPage - 1) * 5 + index + 1;
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  /*
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);*/


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
            onSearch={(value) => setSearchText(value)}
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
          dataSource={filteredData}
          pagination={{ pageSize: 5, showSizeChanger: true, onChange: handlePaginationChange  }}
          bordered
          size="large"
          style={{ boxShadow:'0 2px 10px rgba(0, 0, 0, 0.1)', marginLeft: 30, marginRight: 30, borderRadius: 10}}
              
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
            render= {(item) => (
              <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => navigate('/travelnote')}>
                <div style={{ marginRight: '20px' }}>
                  <img 
                    src={item.image} 
                    alt="图片"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', maxWidth: '600px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical'}}>{item.title}</div>
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
                text:'已通过',
                value:'已通过'
              },
              {
                text:'待审核',
                value:'待审核'
              },
              {
                text:'未通过',
                value:'未通过'
              },
            ]}
            onFilter={(value, record) => record.status === value}
            render={(status) => (
              <span>
                {status === '待审核' && <img 
                    src={wait}
                    alt="待审核"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}}
                  />}
                {status === '已通过' && <img 
                    src={pass}
                    alt="已通过"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}}
                  />}
                {status === '未通过' && <img 
                    src={fail}
                    alt="未通过"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}}
                  />}
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
