// 当前游记详情页
// 展示游记完整内容，包括作者昵称、头像
// 图片可左右滑动查看，支持游记分享功能（比如分享到微信）
import React from 'react';
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
    const post = {
        id:1,
        img:[
                'https://images.pexels.com/photos/14260625/pexels-photo-14260625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                'https://images.pexels.com/photos/20637686/pexels-photo-20637686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                'https://images.pexels.com/photos/20587031/pexels-photo-20587031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ],
        title:'人民日报金句摘抄',
        content:'<b>01.辞暮尔尔，烟火年年。</b><br/>不管是白天还是黑夜，都希望你年年富贵、朝朝平安。<br/><b>02.在心里种花，人生才不会荒芜。</b><br/>一个人的心中有理想、有希望，人生才能活得精彩，大自然的美妙风景能让我们暂得舒畅，而心里的花香，却能给我们一世芬芳。<br/><b>03.慢慢来，好戏都在烟火里。</b><br/>每个人的花期不同，不必因为有人提早拥有而焦虑。<br/>重要的是，当你选择了你要的方式，坚定下去，别胡思乱想。<br/><b>04.流水不争先，争的是滔滔不绝。</b><br/>做人要像流水一样，不要想着去争先后，不能靠一时性急，而是要脚踏实地，慢慢地积攒自己的力量，凡事讲究顺其自然，不要过分强求，不要过多地考虑功利。<br/>',
        authorImg:'https://picsum.photos/50/50',
        authorName:'author1',
        create_at:'2022-01-01',
    }
    const location = useLocation();
    let navigate = useNavigate();
    const postId = location.pathname.split('/')[2];
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div className='detail-page'>
            {/* <div className='title'>TravelNote</div> */}
            <Title />
            <div className='author-info'>
                <div className='post-top' key={post.id}>
                    <div className="goback"  onClick={()=>navigate(-1)}>
                        <img src={Goback} alt='goback'/>
                    </div>
                    <div className='authorImg'>
                        <img src={post.img} alt={post.title} />
                    </div>
                    <div className='authorName'>{post.authorName}</div>
                </div>
                <Link to='/' className="share">
                    <img src={Share} alt='share'/>
                </Link>
            </div>
            <div className='detail-container'>
                <div className='detail-img'>
                    <Slider {...settings}>
                        {
                            post.img.map((item,index)=>{
                                return <div className='detail-img-item' key={index}>
                                    <div className='itemm'><Image src={item} /></div>
                                    
                                </div>
                            })
                        }
                    </Slider>
                </div>
                <div className='detail-title'>{post.title}</div>
                <div className='detail-time'>{post.create_at}</div>
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