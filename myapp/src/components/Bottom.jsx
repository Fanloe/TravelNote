// 底部导航栏
import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useLocation } from 'react-router-dom';

import Homeicon from '../img/home.png'
import Personageicon from '../img/personage.png'
import Logout from '../img/logout.png'
import Uptop from '../img/Uptop.png'

const Bottom = () => {
    const {currentUser,logout} = useContext(AuthContext);
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
        <div className='bottom'>
            {!isHome?(
                <Link to='/' className='toHome' >
                    <img src={Homeicon}/>
                    <span>首页</span>
                </Link>
            ):(
                <div className='toHome' onClick={()=>{window.scrollTo(0,0)}}>
                    <img src={Uptop}/>
                    <span>回顶部</span>
                </div>
            )}
            <Link to='/personage' className='toPersonage'>
                <img src={Personageicon}/>
                <span>个人中心</span>
            </Link>
            <Link to='/login' className='toLogout'>
                <img src={Logout}/>
                <span>退出</span>
            </Link>
        </div>
    )
}

export default Bottom;

