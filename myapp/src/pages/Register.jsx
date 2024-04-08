// 注册--支持头像上传或默认值
// 实现简单的用户名/密码登录注册功能,对用户昵称做重复校验

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Title from '../components/Title';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register-page">
        <Title />
      <div className='register-form'>
        <form>
        <div className='register-title'>注册</div>
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
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>
            已有帐号? <Link to="/login">登录</Link>
            </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
