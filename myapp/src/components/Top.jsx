// 顶部标题
// 页面顶部添加搜索功能，可通过游记标题，作者昵称搜索游记
import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import Title from './Title';
import { useNavigate } from "react-router-dom";

import Searchicon from '../img/search.png';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;

const Top = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const navigate = useNavigate();
    const onSearch = ((value, _e, info) => {
        console.log(info?.source, value);
        navigate('/', { state: { keyword: value } });
    })
    return (
        <div className='top'>
            {/* <div className='title'>TravelNote</div> */}
            <Title />
            {isHome && <div className='search' >
                <Search
                    placeholder="键入搜索内容"
                    allowClear
                    onSearch={onSearch}
                    style={{
                        width: 350,
                    }}
                    size="large"
                    />
            </div>}
        </div>
    )
}

export default Top;
