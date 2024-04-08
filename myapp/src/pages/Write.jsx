// 游记编辑页[游记发布]-从个人中心进入
// 对编辑内容做必须输入的校验，标题、内容、图片均为必须输入项
// 实现发布功能，校验未通过出页面提示，
// 通过后新增或更新游记内容到数据库，页面返回至「我的游记」页面并刷新
import React,{useEffect,useState,useRef} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Editor} from '@tinymce/tinymce-react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

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
    let navigate = useNavigate();
    let location = useLocation();
    let data = location.state;
    const [post,setPost] = useState(data || {});
    const editorRef = useRef(null);
    const log = () => {
        if(editorRef.current){
            console.log(editorRef.current.getContent());
            setPost({...post,content:editorRef.current.getContent()})
            console.log(post)
            // 调用后端传某用户的post
            // 成功后跳转至我的游记页面
            // 失败后页面提示
            navigate('/personage')
        }
    }


    const images = [
        'https://images.pexels.com/photos/14260625/pexels-photo-14260625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/20637686/pexels-photo-20637686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/20587031/pexels-photo-20587031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ]
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(images.map((item,index)=>{
        return {
            name:index+'.png',
            status:'done',
            url:item,
        }
    }));
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
                    initialValue={post.content || '添加正文...'}
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