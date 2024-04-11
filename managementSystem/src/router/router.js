import React from 'react';
import {
    HomeOutlined,
    UserOutlined,
    FormOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import Login from '../pages/login';
import Register from '../pages/register';

import Home from '../pages/home';

import Management from '../pages/manageList';
import Managerdata from '../pages/managerData';
import Managerlog from '../pages/managerLog';
import Travelnote from '../pages/travelnote';

const routes = [

    
    {
      path:'/',
      element:<Login />
    },{
      path:'/register',
      element:<Register />
    },
    

    {
      path:'/home',
      label:'首页',
      element:<Home />,
      icon:<HomeOutlined />
    
    },
    {
      path:'/management',
      label:'审核状态',
      element:<Management />,
      icon:<FormOutlined />
    },
    {
      path:'/management/travelnote/:id',
      element:<Travelnote />,
    },
    
    

  {
      path:'/managerlog',
      label:'管理日志',
      element:<Managerlog />,
      icon:<CalendarOutlined />
    },{
      path:'/managerdata',
      label:'用户信息',
      element:<Managerdata />,
      icon:<UserOutlined />
    },
]

export default routes;
