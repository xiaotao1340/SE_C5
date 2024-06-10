import React, {useState}  from 'react';
import {  Input, Typography, Space, Button, message} from 'antd';
import { MailOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import UserCategorySelector from '../select/select.js';
import { postapi } from '../request.js';
// import { RegisterComponent } from '../request';
export let regAccount = '', regPsword =  '', regEmail = '', regIdentity = 'student';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

function RegisterComponent() {
    const navigate = useNavigate();

    function registerMsg() {
        const hashedPassword = hashPassword(regPsword); 
        postapi('user/register', {
                account: regAccount,
                psword: hashedPassword,
                email: regEmail,
                identity: regIdentity
            })
            .then((response) => {
                console.log(response.data);
                message.info(response.data.resp);
                if (response.data.status === 0){
                  navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
                console.error(err);
                message.info('注册失败，请检查您的用户名和邮箱是否正确，或者稍后重试。'); // 给用户一些反馈  

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

export function Register() {

    const handleCategoryChange = (identity) => {
        regIdentity = identity;
    };

    return (
        <div style={{backgroundImage: `url('https://ts1.cn.mm.bing.net/th/id/R-C.045eda7192510a0bdb0ccbbdf2318274?rik=%2f0G3D8VggGbErA&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fitbbs%2f1406%2f21%2fc3%2f35505173_1403313298477.jpg&ehk=H%2b0Ab5pVqt1cc8le0Gv5Pi%2b67dIkqazAJF11QOI15f0%3d&risl=&pid=ImgRaw&r=0')`, 
                    backgroundSize: 'cover', 
            height: '100vh'
        }}>  
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
                            <span>注册新账户</span>

                            <div style={{color: 'black', marginTop:'2vh',marginBottom:'1vh' }}>
                                <UserCategorySelector onCategoryChange={handleCategoryChange} />
                            </div>

                            <Input
                            placeholder="请输入邮箱" 
                            prefix={<MailOutlined />}
                            style={{width:'20vw'}}
                            onChange={function(event){
                                regEmail = event.target.value;
                            }}>
                            </Input>

                            <Input
                            placeholder="请输入学号" 
                            prefix={<UserOutlined />}
                            style={{width:'20vw'}}
                            onChange={function(event){
                                regAccount = event.target.value;
                            }}>
                            </Input>

                            <Input.Password 
                            placeholder="请输入密码" 
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            style={{width:'20vw'}}
                            onChange={function(event){
                                regPsword = event.target.value;
                            }}
                            >
                            </Input.Password>
                        
                            <RegisterComponent/>
                            <Space>  
                                <Link to="/" style={{ marginBottom: '2vh',color: 'black', textDecoration: 'none', fontSize: '3vh'}}>  
                                    <span>返回登录 </span>  
                                </Link>
                            </Space>
                        </Space>
                    </Space>
                }

            </Space>
        </div>
    );
}