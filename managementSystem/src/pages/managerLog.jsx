import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout,Table, Input, theme } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;


const columns = [
  {
    title: '管理用户',
    dataIndex: 'auditor',
    key: 'auditor',
  },
  {
    title: '时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '操作',
    dataIndex:'actions',
    key: 'actions',

  },
  {
    title: '作品名称',
    key: 'note',
    dataIndex: 'note',
  },
  {
    title: '审核意见',
    key: 'opinion',
    dataIndex: 'opinion',
  },

];


const ManagerLog = () =>{

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const [logs, setLogs] = useState([]);

    const onSearch = async (value) => {
      try {
        if( value !== ''){
          const response = await axios.get(`http://localhost:8080/getAuditByUser?user=${value}`);
          const formattedData = response.data.audits.map(audit => ({
              key: audit._id,
              auditor: audit.auditor,
              date: new Date(audit.date).toLocaleString(),
              note: audit.note,
              actions: calculateAction(audit.beforeStatu, audit.afterStatu),
              opinion: audit.opinion,
          }));
          setLogs(formattedData); 
        }else{
          const response = await axios.get(`http://localhost:8080/getAllAudit`);

          const formattedData = response.data.audits.map((audit) => ({
            key: audit._id,
            auditor: audit.auditor,
            date: new Date(audit.date).toLocaleString(),
            note: audit.title,
            actions: calculateAction(audit.beforeStatu, audit.afterStatus), 
            opinion: audit.opinion,
          }));
          setLogs(formattedData);
        }
        
    } catch (error) {
        console.error('搜索请求失败:', error);
    }
    };

    useEffect(() => {
      const fetchLogs = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/getAllAudit`);

          const formattedData = response.data.audits.map((audit) => ({
            key: audit._id,
            auditor: audit.auditor,
            date: new Date(audit.date).toLocaleString(),
            note: audit.title,
            actions: calculateAction(audit.beforeStatu, audit.afterStatus), 
            opinion: audit.opinion,
          }));
          setLogs(formattedData);
        } catch (error) {
          console.error('Failed to fetch logs:', error);
        }
      };
  
      fetchLogs();
    }, []);
  
    const calculateAction = (beforeStatu, afterStatus) => {
      if (afterStatus === 1) {
        return '通过';
      }else if (afterStatus === 2) {
        return '拒绝';
      }else if (afterStatus === 3) {
        return '删除';
      }
    };
      
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
                placeholder="搜索管理用户名称"
                onSearch={onSearch}
                enterButton
                style={{ marginBottom: 16 }}
              />
              <Table columns={columns} dataSource={logs} />
            </div>
            </Content>
        </Layout>
    )
}

export default ManagerLog;