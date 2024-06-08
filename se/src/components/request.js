import axios from 'axios'
// import CryptoJS from 'crypto-js';
// import {account, identity, psword} from './login/login.js'
// import { regAccount, regPsword, regEmail, regIdentity } from './register/register.js'
// import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
// import { Button } from 'antd';
// import { postapi } from "./utils/http.js";
// import {SearchOutlined} from '@ant-design/icons';
axios.defaults.baseURL = 'http://localhost:3000/api/'

// const hashPassword = (password) => {
//   return CryptoJS.SHA256(password).toString();
// };

// export function LoginComponent() {
//   const navigate = useNavigate();
 
//   function loginMsg() {
//     const hashedPassword = hashPassword(psword); 
//     axios.post('user/login', {
//       account : account,
//       psword : hashedPassword,
//       identity: identity
//     })
//     .then((response)=> {
//       console.log(response.data);
//       alert(response.data.resp);
//       if(response.data.status === 0)
//         sessionStorage.setItem('token',response.data.token); 
//       navigate('/home'); 
//     })
//     .catch(err => {
//       console.log(err);
//       console.error(err);
//       alert('登录失败，请检查您的用户名和密码是否正确，或者稍后重试。'); // 给用户一些反馈  

//     })
//     //navigate('/home'); 
//   }
 
//   return (
//     <div>
//       <Button 
//       onClick={loginMsg}
//       type="primary"
//       style={{
//       width:'20vw', 
//       height:'6vh'}}
//       >立即登录</Button>
//     </div>
//   );
// }

// export function RegisterComponent() {
//     const navigate = useNavigate();

//     function registerMsg() {
//         const hashedPassword = hashPassword(regPsword); 
//         axios.post('user/register', {
//                 account: regAccount,
//                 psword: hashedPassword,
//                 email: regEmail,
//                 identity: regIdentity
//             })
//             .then((response) => {
//                 console.log(response.data);
//                 alert(response.data.resp);
//                 if (response.data.status === 0)
//                     sessionStorage.setItem('token', response.data.token);
//                 navigate('/');
//             })
//             .catch(err => {
//                 console.log(err);
//                 console.error(err);
//                 alert('注册失败，请检查您的用户名和邮箱是否正确，或者稍后重试。'); // 给用户一些反馈  

//             })
//     }

//     return ( 
//     <div>
//       <Button 
//       onClick={registerMsg}
//       type="primary"
//       style={{
//       width:'20vw', 
//       height:'6vh'}}
//       >注册</Button>
//     </div>
//     );
// }

// export function SeekCourseComponent(){
//     const navigate = useNavigate();
 
//     function SeekCourseMsg() {
//     axios.post('/Login', {
//         account : account,
//         psword : psword
//     })
//     .then(res => {
//       console.log(res.data);

//     })
//     .catch(err => {
//     console.error(err);
//     });

//   }
 
//     return (
//     <div>
//       <Button 
//       onClick={SeekCourseMsg}
//       type="primary" 
//       icon={<SearchOutlined />}
//       >立即登录</Button>
//     </div>
//   );
// }

const instace = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 5000, // 超时时间
});

// 封装请求的api
const callapi = (method = "GET", url, data = {}) => {
  return instace({
    method,
    url,
    params: method === "GET" ? data : {},
    data: method === "POST" ? data : {},
  });
};
// 封装GET请求函数
export const getapi = (url, data) => callapi("GET", url, data);
export const postapi = (url, data) => callapi("POST", url, data);