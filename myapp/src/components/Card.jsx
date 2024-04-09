// 瀑布流单个卡片布局
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const post = props.post;
    const [img,setImg] = useState({src:null});//首页展示的图片，只需要一张
    const [authorImg,setAuthorImg] = useState({src:null});//用户头像
    //{content,pictures[],status,title,user,_id}
    const navigate = useNavigate();
    const ToDetail  = (()=>{
        navigate("/detail/"+post.id);
    })
    useEffect(()=>{
        const fetchPicture = async () => {
            await fetch('http://localhost:8080/getPicture?picture='+post.pictures[0])
            .then(response => response.blob())
            .then(blob => {
                setImg({ src: URL.createObjectURL(blob) })
            })
            // setPost({...post,img:res.picture});
            // 请求用户头像，需要首页请求post时返回用户头像id
            await fetch('http://localhost:8080/getPicture?picture='+'6612bb9cf20f806e8914f5d4')
            .then(response => response.blob())
            .then(blob => {
                setAuthorImg({ src: URL.createObjectURL(blob) })
            })
        }
        fetchPicture();
        console.log(img);
    },[])
    return (
        <div className='card' onClick={ToDetail}>
            <div className='post-top' key={post._id}>
                <img src={img.src} alt={post.title} />
            </div>
            <div className='post-center'>
                <div className='post-title'>
                    {post.title}
                </div>
            </div>
            <div className='post-bottom'>
                <div className='post-author'>
                    <img src={authorImg.src} alt={post.authorName} />
                </div>
                <div className='post-author-name'>{post.authorName}</div>
                <div className='post-create-at'>{post.create_at}</div>
            </div>
        </div>
    )
}

export default Card;