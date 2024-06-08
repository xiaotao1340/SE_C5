import React, {useState}  from 'react';
import {  Input, Typography, } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import UserCategorySelector from '../select/select.js';
import { RegisterComponent } from '../request';
export let regAccount = '', regPsword =  '', regEmail = '', regIdentity = ' ';


export function Register() {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (identity) => {
        setSelectedCategory(identity);
        regIdentity = identity;
        console.log('Selected identity:', regIdentity);
        sessionStorage.setItem('regIdentity', regIdentity);
    };

    return (
        <div style={{backgroundImage: `url('https://ts1.cn.mm.bing.net/th/id/R-C.045eda7192510a0bdb0ccbbdf2318274?rik=%2f0G3D8VggGbErA&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fitbbs%2f1406%2f21%2fc3%2f35505173_1403313298477.jpg&ehk=H%2b0Ab5pVqt1cc8le0Gv5Pi%2b67dIkqazAJF11QOI15f0%3d&risl=&pid=ImgRaw&r=0')`, 
                    backgroundSize: 'cover', 
            height: '100vh'
        }}>  
            <br/>
            <br />
            <Typography.Title level={4} 
                style={{color: 'white', 
                        marginLeft:'39.5vw',
                        marginTop: '20px' }}>浙江大学选课系统
            </Typography.Title>  
            <br />
            
            <div style={{ 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: 20, 
                height: '45vh',
                background: 'grey', 
                borderRadius: '2vh',
                marginLeft:'35vw',
                marginRight: '38vw'
                }}>  
                <div style={{color: 'white',marginLeft:'4vw',marginTop:'2vh',marginBottom:'2vh' }}>  
                        <span>注册新账户</span>
                </div> 
                <div style={{color: 'black', fontSize: '3vh', marginTop:'2vh',marginBottom:'1vh' }}>  
                <UserCategorySelector onCategoryChange={handleCategoryChange} />
                </div>
                      
                <Input 
                        placeholder="请输入邮箱" 
                        prefix={<UserOutlined />}
                        style={{
                        width:'20vw', 
                        height:'6vh',
                        marginTop: '10px'
                        }}
                        onChange={function(event){
                            regEmail = event.target.value;
                            console.log('regEmail msg:' + regEmail);
                            sessionStorage.setItem('regEmail',regEmail); 
                        }}>
                </Input>
                
                <Input 
                    placeholder="请输入学号" 
                    prefix={<UserOutlined />}
                    style={{
                    width:'20vw', 
                    height:'6vh',
                    marginTop: '10px'}}
                    onChange={function(event){
                        regAccount = event.target.value;
                        console.log('regAccount msg:' + regAccount);
                        sessionStorage.setItem('regAccount',regAccount); 
                    }}
                    >
                </Input>

                        <Input.Password 
                        placeholder="请输入密码" 
                        prefix={<LockOutlined />}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        style={{
                        width:'20vw', 
                        height:'6vh',
                        marginTop: '10px',
                        marginBottom: '15px'
                        }
                        }
                        onChange={function(event){
                            regPsword = event.target.value;
                            console.log('regPsword msg:' + regPsword);
                            sessionStorage.setItem('regPsword',regPsword); 
                        }}
                        >
                </Input.Password>
                        <RegisterComponent/>
            </div>
        </div>
    );
}