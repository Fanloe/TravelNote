// 首页-展示游记瀑布流--
// 分页加载所有人发布且审核通过的游记
// 游记卡片展示元素包括游记图片、游记标题、用户头像、用户昵称
// 点击游记卡片可跳转至当前游记详情页

import React, { useRef, useState, useEffect } from 'react';
import 'wc-waterfall'
import Card from '../components/Card';
import axios from 'axios';

const Home = () => {
    // const [allposts, setAllPosts] = useState([]);
    // useEffect(()=>{
    //     const fetchData = async () => {
    //         try{
    //             const res = await axios.get(`http://localhost:8080/getNotesByStatus?status=1`);
    //             setAllPosts(res.data);
    //             console.log(res.data);
    //         }catch(err){
    //             console.log(err);
    //         }
    //     }
    //     fetchData()
    // })
    const posts =[
        {
            id:1,
            img:'https://images.pexels.com/photos/20587031/pexels-photo-20587031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'我的生命就应该浪费在这种地方',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author1',
            create_at:'2022-01-01',
        },
        {
            id:2,
            img:'https://images.pexels.com/photos/14260625/pexels-photo-14260625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title2',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author2',
            create_at:'2022-01-01',
        },
        {
            id:3,
            img:'https://images.pexels.com/photos/20637686/pexels-photo-20637686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title3',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author3',
            create_at:'2022-01-01',
        },
        {
            id:4,
            img:'https://images.pexels.com/photos/10104275/pexels-photo-10104275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title4',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author4',
            create_at:'2022-01-01',
        },
        {
            id:5,
            img:'https://picsum.photos/200/300',
            title:'title5',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author5',
            create_at:'2022-01-01',
        },
        {
            id:6,
            img:'https://images.pexels.com/photos/20640155/pexels-photo-20640155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title6',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author6',
            create_at:'2022-01-01',
        },
        {
            id:7,
            img:'https://images.pexels.com/photos/20587031/pexels-photo-20587031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'我的生命7',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author7',
            create_at:'2022-01-01',
        },
        {
            id:8,
            img:'https://images.pexels.com/photos/14260625/pexels-photo-14260625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title8',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author8',
            create_at:'2022-01-01',
        },
        {
            id:9,
            img:'https://images.pexels.com/photos/20637686/pexels-photo-20637686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title9',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author9',
            create_at:'2022-01-01',
        },
        {
            id:10,
            img:'https://images.pexels.com/photos/10104275/pexels-photo-10104275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title10',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author10',
            create_at:'2022-01-01',
        },
        {
            id:11,
            img:'https://picsum.photos/200/300',
            title:'title11',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author11',
            create_at:'2022-01-01',
        },
        {
            id:12,
            img:'https://images.pexels.com/photos/20640155/pexels-photo-20640155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title:'title12',
            authorImg:'https://picsum.photos/50/50',
            authorName:'author12',
            create_at:'2022-01-01',
        }
    ]
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [lazyposts, setlazyPosts] = useState(posts);
    useEffect(() => {
        if (isAtBottom) {
            // 加载更多数据
            // 模拟加载更多数据
            setTimeout(() => {
                const newPosts = [...lazyposts, ...posts];
                setlazyPosts(newPosts);
                setIsAtBottom(false);
            }, 500)
        }
    },[isAtBottom])
    function handleScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;

        // 如果滚动到底部
        if (windowHeight + scrollTop >= documentHeight-1 && isAtBottom === false) {
            setIsAtBottom(true);
            console.log(true)
        } else {
            setIsAtBottom(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div className='home-page'>
            <wc-waterfall gap={4} cols={2}>
                {
                    lazyposts.map(post=>(
                        //  key={post.id}
                        <div className='card-container'>
                            <Card post={post}/>
                        </div>
                    ))
                }
            </wc-waterfall>
        </div>
    )
}

export default Home;