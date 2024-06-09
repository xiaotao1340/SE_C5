import {Space, Input, Button, Typography,} from 'antd'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,  LockOutlined} from '@ant-design/icons';
// import {LoginComponent} from '../request.js'
import CryptoJS from 'crypto-js';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UserCategorySelector from '../select/select.js';
import React, {useState}  from 'react';
import { postapi } from '../request.js';
// import { useDispatch, useSelector } from 'react-redux'
// import { setUsers} from '../store/users.js'
import {reactLocalStorage} from 'reactjs-localstorage'; 

export let account = '', psword =  '', identity = 'student';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

function LoginComponent() {
    const navigate = useNavigate();
    // const { user, token } = useSelector(state => state.users)
	// const dispatch = useDispatch()
   
    function loginMsg() {
      const hashedPassword = hashPassword(psword); 
      postapi('user/login', {
        account : account,
        psword : hashedPassword,
        identity: identity
      })
      .then((response)=> {
        console.log(response.data);
        alert(response.data.resp);
        if(response.data.status === 0){
        //   sessionStorage.setItem('token',response.data.token); 
        //   setUsers(response.data)
        //   console.log("here!!!")
        //   console.log(user)
        //   console.log(token)
          reactLocalStorage.setObject('token', response.data.token);
          reactLocalStorage.setObject('username', response.data.name)
          reactLocalStorage.setObject('identity', response.data.identity)
          navigate('/home');
        }
      })
      .catch(err => {
        console.log(err);
        console.error(err);
        alert('登录失败，请检查您的用户名和密码是否正确，或者稍后重试。'); // 给用户一些反馈  
      })
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

export function Login() {  
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (id) => {
        setSelectedCategory(id);
        identity = id;
        console.log('Selected identity:', identity);
        sessionStorage.setItem('identity', identity);
    };

    return (  
        <div style={{backgroundImage: `url('https://ts1.cn.mm.bing.net/th/id/R-C.045eda7192510a0bdb0ccbbdf2318274?rik=%2f0G3D8VggGbErA&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fitbbs%2f1406%2f21%2fc3%2f35505173_1403313298477.jpg&ehk=H%2b0Ab5pVqt1cc8le0Gv5Pi%2b67dIkqazAJF11QOI15f0%3d&risl=&pid=ImgRaw&r=0')`, 
                     backgroundSize: 'cover',
                     height: '100vh' }}>
            <Space 
                style={{  
                    width: '100%',  
                    background:'rgb(255, 255, 255)'
                    }}  
                size={0} 
                wrap= 'true'
                >
                <Typography.Title level={4}
                style={{  
                    marginLeft: '2vh'
                    }}  
                >浙江大学选课系统</Typography.Title>  
            
            </Space>
            <Space 
                style={{  
                    display: 'flex',  
                    flexDirection: 'column', 
                    alignItems: 'center',  
                    justifyContent: 'center'
                }}
                size={0} 
                wrap= 'true'>

                <br />
                <br />
                <br />
                {
                    <Space 
                    style={{  
                        width: '120%', 
                        height: '120%', 
                        display: 'flex',  
                        flexDirection: 'column', 
                        alignItems: 'center',  
                        justifyContent: 'center',
                        background:'rgb(224, 228, 233, 0.8)'
                      }}  
                    size={0} 
                    wrap= 'true'
                    >
                        <Space style={{ display: 'flex', flexDirection: 'column',width: '100',fontSize:'4vh', marginTop: '2vh'} }  >
                            <span>统一身份认证登录</span>

                            <div style={{color: 'black', marginTop:'2vh',marginBottom:'1vh' }}>
                                <UserCategorySelector onCategoryChange={handleCategoryChange} />
                            </div>

                            <Input
                            placeholder="请输入学号" 
                            prefix={<UserOutlined />}
                            style={{width:'20vw'}}
                            onChange={function(event){
                                account = event.target.value;
                                console.log('account msg:' + account);
                                sessionStorage.setItem('account',account); 
                            }}>
                            </Input>

                            <Input.Password 
                            placeholder="请输入密码" 
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            style={{width:'20vw'}}
                            onChange={function(event){
                                psword = event.target.value;
                                console.log('psword msg:' + psword);
                                sessionStorage.setItem('psword',psword); 
                            }}
                            >
                            </Input.Password>
                        
                            <LoginComponent/>
                            <Space>  
                                <Link to="/register" style={{ marginBottom: '2vh',color: 'black', textDecoration: 'none', fontSize: '3vh'}}>  
                                    <span>注册 </span>  
                                </Link>
                            </Space>
                        </Space>
                    </Space>
                }

            </Space>
        </div>   
        
    );  
}