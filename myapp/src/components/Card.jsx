// 瀑布流单个卡片布局
import React from 'react';
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const post = props.post;
    const navigate = useNavigate();
    const ToDetail  = (()=>{
        navigate("/detail/"+post.id);
    })
    return (
        <div className='card' onClick={ToDetail}>
            <div className='post-top' key={post.id}>
                <img src={post.img} alt={post.title} />
            </div>
            <div className='post-center'>
                <div className='post-title'>
                    {post.title}
                </div>
            </div>
            <div className='post-bottom'>
                <div className='post-author'>
                    <img src={post.authorImg} alt={post.authorName} />
                </div>
                <div className='post-author-name'>{post.authorName}</div>
                <div className='post-create-at'>{post.create_at}</div>
            </div>
        </div>
    )
}

export default Card;