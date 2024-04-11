import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/style.css'
import axios from 'axios';

const { Option } = Select;

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    authority:"",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target ? e.target : e;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };


  const onFinish = async (values) => {
    try {
      const response = await axios.get(`http://localhost:8080/register?username=${values.username}&password=${values.password}&authority=${values.authority}`);
      if(response.data && response.data.message === "Sign-up success"){
        message.success(`您已成功注册！`);
        navigate('/');
      }else{
        message.error(`注册失败，请稍后再试。`);
        setError(response.data.message || '未知错误，请稍后再试。');
      }
    } catch (error) {
      setError(error.response?.data.message || '注册请求失败，请稍后再试。');
    }
    
  };

  return (
    <div className='register-container'>
      <div style={{ 
        maxWidth: 350, 
        margin: 'auto', 
        marginTop: 250, 
        backgroundColor:'rgba(255, 255, 255, 0.8)',
        padding: 30,
        borderRadius: 10,

        }}>
        <h2>审核管理系统</h2>
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
            prefix={<UserOutlined className="site-form-item-icon" />} 
            type="username"
            placeholder="用户名"
            onChange={handleChange} 
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="authority"
            rules={[{ required: true, message: '请选择账号权限!' }]}
          >
            <Select
              placeholder="选择账号权限"
              allowClear
            >
              <Option value="1">审核员</Option>
              <Option value="2">管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              注册
            </Button>
          </Form.Item>
          <span>已有账号？<Link to="/">登录</Link></span>
        </Form>
      </div>
    </div>
  );
};

export default Register;
