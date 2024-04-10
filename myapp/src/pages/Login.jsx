// 用户登录-支持头像上传或默认值
// 实现简单的用户名/密码登录注册功能,对用户昵称做重复校验
import axios from "axios";
import React from 'react';
import { useContext,useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

import Title from '../components/Title';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);
    let navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('http://localhost:8080/verifyNormalUser?username='+inputs.username+'&password='+inputs.password);
            console.log(res.data);
            login(res.data,navigate);
        } catch (err) {
            //err.response.data
            setError("登录失败");
        }
    };
    return (
        <div className='login-page'>
            <Title />
            <div className='login-form'>
                <form>
                    <div className='login-title'>登录</div>
                    <input
                    required
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    />
                    <input
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Login</button>
                    {err && <p>{err}</p>}
                    <span>
                        没有账号? <Link to="/register">注册</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login;