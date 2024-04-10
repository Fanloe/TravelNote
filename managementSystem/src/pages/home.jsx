import { useState } from 'react';
import { Breadcrumb, Layout, Card, Row, Statistic, Col } from 'antd';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import {
    UserOutlined,
    MessageOutlined,
    ShoppingOutlined,
    PayCircleOutlined,
  } from '@ant-design/icons';


const { Content } = Layout;

const data = [
    {
      title: 'New Visits',
      value: 102400,
      icon: <UserOutlined />,
      color: 'green',
    },
    {
      title: 'Messages',
      value: 81212,
      icon: <MessageOutlined />,
      color: 'blue',
    },
    {
      title: 'Purchases',
      value: 9280,
      icon: <PayCircleOutlined />,
      color: 'red',
    },
    {
      title: 'Shopping',
      value: 13600,
      icon: <ShoppingOutlined />,
      color: 'orange',
    },
  ];

const option = {
    title: {
        text: 'Stacked Area Chart'
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
        radius: [20, 150],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
            borderRadius: 8
        },
        data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
        ]
        }
    ]
};

const option2 = {
    title: {
        text: 'Stacked Area Chart'
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
        name: 'Direct',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Email',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Search Engine',
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
        name: 'Baidu',
        type: 'bar',
        barWidth: 5,
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [620, 732, 701, 734, 1090, 1130, 1120]
      },
      {
        name: 'Google',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 290, 230, 220]
      },
      {
        name: 'Bing',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [60, 72, 71, 74, 190, 130, 110]
      },
      {
        name: 'Others',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
          focus: 'series'
        },
        data: [62, 82, 91, 84, 109, 110, 120]
      }
    ]
  };

  const option3 = {
    title: {
      text: 'Stacked Area Chart'
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
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
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