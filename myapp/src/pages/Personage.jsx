// 个人中心--包括[我的游记]页面和[游记发布]入口
import React from 'react';
import axios from "axios";
import { useContext,useState,useEffect } from "react";
import 'wc-waterfall'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from '../img/edit.png'
import { AuthContext } from "../context/authContext";

function change(state){
    if(state==1) return '已通过';
    else if(state==0) return '未通过';
    else return '待审核';
}

const Personage = () => {
    // 个人信息
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        id: currentUser._id.slice(0,10),
        nickname:currentUser.username,
        avater: 'https://picsum.photos/50/50'
    })
    const [postData,setPostData] = useState([]);
    // 请求个人信息
    useEffect(() => {
        console.log(currentUser)
        const getUserFigure = async () => {//得到用户头像
            try{
                await fetch('http://localhost:8080/getUserFigure?username='+userData.nickname)
                .then(response => response.blob())
                .then(blob => {
                    setUserData({...userData, avater: URL.createObjectURL(blob) })
                })
            }catch(err){
                console.log(err)
            }
        }
        const getPostPicture = async(id) => {
            try{
                var src={src:null};
                await fetch('http://localhost:8080/getPicture?picture='+id)
                .then(response => response.blob())
                .then(blob => {
                    src = URL.createObjectURL(blob)
                })
                return src;
            }catch(err){
                console.log(err);
            }
        }
        const getUserPosts = async() => {
            try{
                const res = await axios.get('http://localhost:8080/getUserAllNotes?username='+userData.nickname);//0表示未通过 1表示已通过
                console.log(res.data.array);
                for(var i=0;i<res.data.array.length;i++){
                    res.data.array[i].pictures = await getPostPicture(res.data.array[i].pictures[0]);
                    console.log(res.data.array[i].pictures);
                }
                const newData = res.data.array.map((item,index)=>{
                    console.log(item)
                    
                    return{
                        id: item._id,
                        title: item.title,
                        content: item.content,
                        date: item.date || "",
                        checkState: change(item.state),
                        img:  item.pictures,
                        checkMes:'审核意见：恭喜您，审核通过！'
                    }
                })
                console.log(newData);
                setPostData(newData)
            }catch(err){
                console.log(err);
            }
        }

        getUserFigure();
        getUserPosts();
    },[])


    // const userData = {
    //     id: 1,
    //     nickname: '张三',
    //     avater: 'https://picsum.photos/50/50',
    // }
    // const postData = [
    //     {
    //         id:1,
    //         img:'https://images.pexels.com/photos/20587031/pexels-photo-20587031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         title:'我的生命就应该浪费在这种地方',
    //         content:'<b>01.辞暮尔尔，烟火年年。</b><br/>不管是白天还是黑夜，都希望你年年富贵、朝朝平安。<br/>',
    //         authorImg:'https://picsum.photos/50/50',
    //         authorName:'author1',
    //         create_at:'2022-01-01',
    //         checkState:'已通过',
    //         checkMes:'审核意见：恭喜您，审核通过！'
    //     },
    //     {
    //         id:2,
    //         img:'https://images.pexels.com/photos/14260625/pexels-photo-14260625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         title:'title2',
    //         content:'<b>01.辞暮尔尔，烟火年年。</b><br/>不管是白天还是黑夜，都希望你年年富贵、朝朝平安。<br/>',
    //         authorImg:'https://picsum.photos/50/50',
    //         authorName:'author2',
    //         create_at:'2022-01-01',
    //         checkState:'待审核',
    //         checkMes:'审核意见：审核中···'
    //     },
    //     {
    //         id:3,
    //         img:'https://images.pexels.com/photos/20637686/pexels-photo-20637686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         title:'title3',
    //         content:'<b>01.辞暮尔尔，烟火年年。</b><br/>不管是白天还是黑夜，都希望你年年富贵、朝朝平安。<br/>',
    //         authorImg:'https://picsum.photos/50/50',
    //         authorName:'author3',
    //         create_at:'2022-01-01',
    //         checkState:'未通过',
    //         checkMes:'审核意见：内容不规范等等。'
    //     },
    // ]

    const navigate = useNavigate();
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    const toWrite = () => {
        navigate('/write')
    }
    return (
        <div className='personage-page'>
            <div className='person-info'>
                <div className='person-avater'>
                    <img src={userData.avater} alt='用户头像'/>
                    <div className='person-name-id'>
                        <div className='person-name'>{userData.nickname}</div>
                        <div className='person-id'>ID: {userData.id}</div>
                    </div>
                </div>
                <div className='post-write'>
                    <button onClick={toWrite}>+ 游记发布</button>
                </div>
            </div>
            <div className='person-posts'>
                {
                    postData.map(post=>(
                        <div className='person-card' key={post.id}>
                            <div className='person-card-top'>
                                <img src={post.img} alt='游记图片'/>
                                <div className='person-card-container'>
                                    <div className='person-card-title'>{post.title}</div>
                                    <div className='person-card-content'>{getText(post.content).substring(0,20)}...</div>
                                </div>
                            </div>
                            <div className='person-card-state'>
                                <span style={{color:post.checkState==='已通过'?'green':post.checkState==='未通过'?'#da4b3b':'#000'}}>{post.checkState}</span>
                                <div className='person-card-change'>
                                    <button className='delete'>删除</button>
                                    {
                                        post.checkState==='已通过'?null:
                                        <button className='edit' onClick={()=>{navigate('/write',{state:post})}}>编辑</button>
                                    }
                                    
                                </div>
                            </div>
                            <div className='person-card-stateMes'>
                                {post.checkMes}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Personage;