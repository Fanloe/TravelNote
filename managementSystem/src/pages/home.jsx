import { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Card, Row, Statistic, Col } from 'antd';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import {
    UserOutlined,
    MessageOutlined,
    InboxOutlined,
    UsergroupAddOutlined,
  } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

const option = {
    title: {
        text: '不同类型游记占比'
      },
    legend: {
        top: 'bottom',
    },
    toolbox: {
        show: true,
        feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
        }
    },
    series: [
        {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
            borderRadius: 8
        },
        data: [
            { value: 40, name: '文化探索' },
            { value: 38, name: '自然与野生动植物' },
            { value: 32, name: '美食之旅' },
            { value: 30, name: '城市漫步' },
            { value: 28, name: '冒险旅行' },
            { value: 26, name: '灵修之旅' },
            { value: 22, name: '奢华旅行' },
            { value: 18, name: '背包客之旅 ' }
        ]
        }
    ]
};

const option2 = {
    title: {
        text: '各类型游记数据变化'
      },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
        show: true,
        feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
        }
    },
    legend: {
        top:'bottom'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '文化探索',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '自然与野生动植物',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '美食之旅',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '城市漫步',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '冒险旅行',
        type: 'bar',
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        emphasis: {
          focus: 'series'
        },
        markLine: {
          lineStyle: {
            type: 'dashed'
          },
          data: [[{ type: 'min' }, { type: 'max' }]]
        }
      },
      {
        name: '灵修之旅',
        type: 'bar',
        barWidth: 5,
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [620, 732, 701, 734, 1090, 1130, 1120]
      },
      {
        name: '奢华旅行',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 290, 230, 220]
      },
      {
        name: '背包客之旅',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [60, 72, 71, 74, 190, 130, 110]
      },
    ]
  };

  const option3 = {
    title: {
      text: '近日数据变化'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['用户人数', '游记数量', '图片数量', '管理员数量', '日志数量']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '用户人数',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '游记数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '图片数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '管理员数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '日志数量',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };





const Home = () =>{

  const [ count, setCount ] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/count`);
        setCount(response.data.data);
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    
    fetchData();
  }, []);

  const data = count ? [
    {
      title: '用户数量',
      value: count.normalUser,
      icon: <UserOutlined />,
      color: 'green',
    },
    {
      title: '游记数量',
      value: count.noteNum,
      icon: <MessageOutlined />,
      color: 'blue',
    },
    {
      title: '管理人员',
      value: count.auditorNum,
      icon: <UsergroupAddOutlined />,
      color: 'red',
    },
    {
      title: '日志条数',
      value: count.auditNum,
      icon: <InboxOutlined />,
      color: 'orange',
    },
  ] : [];
    
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
            </Breadcrumb>
            <div>
                <Row gutter={25} style={{padding:20}}>
                    {data.map((item, index) => (
                        <Col span={6} key={index}>
                        <Card>
                            <Statistic
                            title={item.title}
                            value={item.value}
                            valueStyle={{ color: item.color }}
                            prefix={item.icon}
                            />
                        </Card>
                        </Col>
                    ))}
                </Row>
                <div style={{ background: 'white', margin:25 }}>
                        <ReactEcharts option={option3} style={{ height: '400px', width: '100%' }} />
                    </div>
                <div style={{ display:'flex', justifyContent:'space-between',margin:30 }}>
                    <div style={{ background: 'white', width:'48%'}}>
                        <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />
                    </div>
                    <div style={{ background: 'white', width:'48%'}}>
                        <ReactEcharts option={option2} style={{ height: '400px', width: '100%' }} />
                    </div>
                </div>
            </div>
            </Content>
        </Layout>
    )
}

export default Home;