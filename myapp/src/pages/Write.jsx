// 游记编辑页[游记发布]-从个人中心进入
// 对编辑内容做必须输入的校验，标题、内容、图片均为必须输入项
// 实现发布功能，校验未通过出页面提示，
// 通过后新增或更新游记内容到数据库，页面返回至「我的游记」页面并刷新
import React,{useEffect,useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import DOMPurify from "dompurify";

import Goback from '../img/Goback.png'

const Write = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let data = location.state;
    const [post,setPost] = useState({});
    useEffect(()=>{
        if(data !== null) setPost(data);
        console.log(post)
    })
    const images = [
        'https://images.pexels.com/photos/14260625/pexels-photo-14260625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/20637686/pexels-photo-20637686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/20587031/pexels-photo-20587031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ]
    return (
        <div className='write-page'>
            <div className='write-t'>
                <div className='title'>TravelNote</div>
            </div>
            <div className='write-top'>
                <div className='write-back' onClick={()=>navigate(-1)}>
                    <img src={Goback} alt='goback'/>
                </div>
            </div>
            <div className='upload-img'>
                <div className='upload-img-title'>上传图片</div>
            </div>
            <div className='write-title'>
                <input className='write-title-input' type='text' placeholder='标题' value={post.title} onChange={(e)=>setPost({...post,title:e.target.value})}/>
            </div>
            <div className='write-content'>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                    }}
                ></p> 
            </div>
        </div>
    )
}

export default Write;