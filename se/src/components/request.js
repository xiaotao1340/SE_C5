import axios from 'axios'
import {account, psword} from './login/login.js'
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import {SearchOutlined} from '@ant-design/icons';

axios.defaults.baseURL = 'http://127.0.0.1:3000'
 
export function LoginComponent() {
  const navigate = useNavigate();
 
  function loginMsg() {
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
    if(1)//需要login判断
    {
        navigate('/home');
    }
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
    if(1)//需要判断
    {
        ;
    }
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