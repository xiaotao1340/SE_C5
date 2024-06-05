import axios from 'axios'
import {account, psword} from './login/login.js'
import { regAccount, regPsword, regEmail } from './register/register.js'
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
// import { postapi } from "./utils/http.js";
import {SearchOutlined} from '@ant-design/icons';
axios.defaults.baseURL = 'http://localhost:3000/api/'


export function LoginComponent() {
  const navigate = useNavigate();
 
  function loginMsg() {
    axios.post('user/login', {
      account : account,
      psword : psword
  })
    .then((response)=> {
      console.log(response.data);
      alert(response.data.resp);
      if(response.data.status===0)
        sessionStorage.setItem('token',response.data.token); 
      navigate('/home'); 
    }  
    )
    .catch(err => {
      console.log(err);
      console.error(err);
      alert('登录失败，请检查您的用户名和密码是否正确，或者稍后重试。'); // 给用户一些反馈  

    })
    //navigate('/home'); 
  }
 
  return (
    <div>
      <Button 
      onClick={loginMsg}
      type="primary"
      style={{
      width:'20vw', 
      height:'6vh'}}
      >立即登录</Button>
    </div>
  );
}

export function RegisterComponent() {
    const navigate = useNavigate();

    function registerMsg() {
        axios.post('user/register', {
                regAccount: regAccount,
                regPsword: regPsword,
                regEmail: regEmail
            })
            .then((response) => {
                console.log(response.data);
                alert(response.data.resp);
                if (response.data.status === 0)
                    sessionStorage.setItem('token', response.data.token);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                console.error(err);
                alert('注册失败，请检查您的用户名和邮箱是否正确，或者稍后重试。'); // 给用户一些反馈  

            })
    }

    return ( 
    <div>
      <Button 
      onClick={registerMsg}
      type="primary"
      style={{
      width:'20vw', 
      height:'6vh'}}
      >注册</Button>
    </div>
    );
}

export function SeekCourseComponent(){
    const navigate = useNavigate();
 
    function SeekCourseMsg() {
    axios.post('/Login', {
        account : account,
        psword : psword
    })
    .then(res => {
      console.log(res.data);

    })
    .catch(err => {
    console.error(err);
    });

  }
 
    return (
    <div>
      <Button 
      onClick={SeekCourseMsg}
      type="primary" 
      icon={<SearchOutlined />}
      >立即登录</Button>
    </div>
  );
}