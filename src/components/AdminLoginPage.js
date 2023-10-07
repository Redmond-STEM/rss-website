import React, { useState } from 'react';
import token from "random-web-token"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../Api';

const AdminLoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    let authtoken = token.genSync("extra", 50)
    let account = {
      "email": email,
      "type": "teacher",
      "token": authtoken
    }
    axios.post(API_URL + "loginaccount", account).then((res) => {
      if (res.status === 201) { 
        localStorage.setItem("authtoken", authtoken) 
      } 
      navigate("/teacherportal") 
    })
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Enter Email and Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AdminLoginPage;