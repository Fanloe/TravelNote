// 游记编辑页[游记发布]-从个人中心进入
// 对编辑内容做必须输入的校验，标题、内容、图片均为必须输入项
// 实现发布功能，校验未通过出页面提示，
// 通过后新增或更新游记内容到数据库，页面返回至「我的游记」页面并刷新
import React,{useEffect,useState,useRef,useContext} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Editor} from '@tinymce/tinymce-react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

import Title from '../components/Title';

import Goback from '../img/Goback.png'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  
const Write = () => {
    const {currentUser} = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();
    let data = location.state;
    const [post,setPost] = useState(data || {title:''});
    const editorRef = useRef('');

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();//提示信息
    const getPostPicture = async(id) => {
        try{
            let res = {
                url: "",
                originFileObj: ""
            }
            await fetch('http://localhost:8080/getPicture?picture='+id)
            .then(response => response.blob())
            .then(blob => {
                res =  {
                    url: URL.createObjectURL(blob),
                    originFileObj: new Blob([blob], { type: 'image/png' })
                };
            })
            return res;
        }catch(err){
            console.log(err);
        }
    }
    const getPostPictures = async() => {
        if(post.pictures == null) return;
        for(var i=0;i<post.pictures.length;i++){
            let res = await getPostPicture(post.pictures[i]);
            setFileList(fileList => [...fileList, res]);
            // console.log(res);
        }
    }
    useEffect(()=>{
        getPostPictures();
        // console.log(post)
    },[])

    //发布游记
    const log = async () => {
        // 校验
        if(post.title === ''){
            messageApi.open({
                type: 'error',
                content: '标题不可为空',
              });
            return;
        }
        if(editorRef.current.getContent() === ''){
            messageApi.open({
                type: 'error',
                content: '内容不可为空',
              });
            return;
        }
        if(fileList.length === 0){
            messageApi.open({
                type: 'error',
                content: '图片不可为空',
              });
            return;
        }
        // 发布
        let formData = new FormData();
        fileList.map(item => {
            formData.append('pictures', item.originFileObj);
        })
        console.log(editorRef.current.getContent());
        var newPost = {
            ...post,
            content:editorRef.current.getContent()
        }
        setPost(newPost)
        console.log(formData)
        console.log(fileList)
        // 调用后端传某用户的post
        if(data != null){
            console.log(data.id)
            try{
                await fetch(`http://localhost:8080/updateNote?note=${data.id}&username=${currentUser.username}&title=${post.title}&content=${newPost.content}`,
                {
                    method:'POST',
                    body:formData
                })
            }catch(err){
                console.log(err);
                alert("更新失败");
            }
        }
        else{
            try{
                await fetch(`http://localhost:8080/addNote?username=${currentUser.username}&title=${post.title}&content=${newPost.content}`,
                {
                    method:'POST',
                    body:formData
                })
            }catch(err){
                console.log(err);
                alert("发布失败");
            }
        }
        
        // 成功后跳转至我的游记页面
        navigate('/personage')
    }


    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只能上传 JPG/PNG 文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.warning('图像最好小于 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );

    return (
        <div className='write-page'>
            {contextHolder}
            <div className='write-t'>
                <Title />
            </div>
            <div className='write-top'>
                <div className='write-back' onClick={()=>navigate(-1)}>
                    <img src={Goback} alt='goback'/>
                </div>
            </div>
            <div className='upload-img'>
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                    />
                </Modal> 
            </div>
            <div className='write-title'>
                <input className='write-title-input' type='text' placeholder='标题' value={post.title} onChange={(e)=>setPost({...post,title:e.target.value})}/>
            </div>
            <div className='write-content'>
                <Editor
                    apiKey='louvhda2pxdzvlt28yuc4ajrpwyctdnvym8mmglvps1m1bzn'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={post.content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        
                    }}
                />
            </div>
            <div className='submit'>
                <button onClick={log}>发布游记</button>
            </div>
        </div>
    )
}

export default Write;