// 当前游记详情页
// 展示游记完整内容，包括作者昵称、头像
// 图片可左右滑动查看，支持游记分享功能（比如分享到微信）
import React from 'react';
import {useState,useEffect} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Image  } from 'antd';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Title from '../components/Title';

import Goback from '../img/Goback.png'
import Share from '../img/share.png'

const Detail = () => {
    const location = useLocation();
    let navigate = useNavigate();
    const [refrash,setRefrash] = useState(false);
    let post = location.state;
    const [pictureList,setPictureList] = useState([]);

    useEffect(() => {
        const getPostPicture = async (id) => {
            try {
                const response = await fetch('http://localhost:8080/getPicture?picture=' + id);
                const blob = await response.blob();
                setPictureList(prevList => [...prevList, URL.createObjectURL(blob)]);
            } catch (err) {
                console.log(err);
            }
        }
    
        const getPostPictures = async () => {
            console.log(post)
            if (!post || !post.pictures) return;
            try {
                await Promise.all(post.pictures.map(getPostPicture));
            } catch (err) {
                console.log(err);
            }
        }
    
        getPostPictures();
        window.scrollTo(0, 0);
        console.log(post.scrollPosition)
    }, [post, refrash]);


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div className='detail-page'>
            <Title />
            <div className='author-info'>
                <div className='post-top' key={post._id}>
                    {/* <div className="goback"  onClick={()=>navigate('/', { state: { scrollPosition: post.scrollPosition } })}>
                        <img src={Goback} alt='goback'/>
                    </div> */}
                    <Link to={'/'} className='goback'>
                        <img src={Goback} alt='goback'/>
                    </Link>
                    <div className='authorImg'>
                        <img src={post.authorImg.src} alt="头像" />
                    </div>
                    <div className='authorName'>{post.user}</div>
                </div>
                <Link to='/' className="share">
                    <img src={Share} alt='share'/>
                </Link>
            </div>
            <div className='detail-container'>
                <div className='detail-img'>
                    {
                        (post.pictures.length == 1) ? 
                            <div className='detail-img-item'>
                                <div className='itemm'><Image src={post.img.src} /></div>
                            </div>
                        :
                        <Slider {...settings}>
                            {
                                
                                pictureList.map((item,index)=>{
                                    return <div className='detail-img-item' key={index}>
                                        {/* {pictureList.length} */}
                                        <div className='itemm'><Image src={item} /></div>
                                    </div>
                                })
                            }
                        </Slider>
                    }
                </div>
                <div className='detail-title'>{post.title}</div>
                <div className='detail-time'>{post.date}</div>
                <div className='detail-content'>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.content),
                        }}
                    ></p>  
                </div>
            </div>
        </div>
    )
}

export default Detail;