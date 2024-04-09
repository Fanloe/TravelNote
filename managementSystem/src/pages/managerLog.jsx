import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout,Table, Input, Badge, Space, theme, Timeline } from 'antd';
import { Link } from 'react-router-dom';
import { SmileOutlined, SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;

const data = [
  {
    key: '1',
    name: 'John Brown',
    date: '2024-04-08 21:39:21',
    status: '在线',
    actions: '...',
  },
  // ...其他数据
];

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    // 可以在这里添加用户头像的渲染
    render: (text) => <a>{text}</a>,
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
      <Badge status="success" text={status} />
    ),
  },
  {
    title: '操作',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <a>编辑 {record.name}</a>
        <a>删除</a>
      </Space>
    ),
  },
];


const ManagerLog = () =>{

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState('');

    const onSearch = (value) => {
      //setFilter(value);
    };
  
    /*useEffect(() => {
      const getLogs = async () => {
        const fetchedLogs = await fetchLogs(filter);
        setLogs(fetchedLogs);
      };
  
      getLogs();
    }, [filter]);
  
    
    const fetchLogs = async (filter) => {
      try {
        const response = await fetch(`/api/logs?filter=${encodeURIComponent(filter)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.logs;
      } catch (error) {
        console.error("Fetching logs failed:", error);
      }
    };*/
      
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
                    <Link to='/managerlog'>
                    管理日志
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                padding: 24,
                minHeight: 780,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                }}
            >
              <Input.Search
                placeholder="搜索日志"
                onSearch={onSearch}
                enterButton
                style={{ marginBottom: 16 }}
              />
              <Table columns={columns} dataSource={data} />
            </div>
            </Content>
        </Layout>
    )
}

export default ManagerLog;