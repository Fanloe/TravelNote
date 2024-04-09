import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/style.css'
import axios from 'axios';


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.username]: e.password }));
  };

  const onFinish = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/verifyAdministrator?username=${inputs.username}&password=${inputs.password}`, inputs);
      if(response.data.success){
        navigate('/home');
      }else{
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response ? error.response.data : "..");
    }
  };


  return (
    <div className='login-container'>
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
          name="normal_login"
          className="login-form"
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              登录
            </Button>
          </Form.Item>
          <span>没有账号？<Link to="/register">注册</Link></span>
        </Form>
      </div>
    </div>
  );
};

export default Login;
