import {Space, Input, Card, Typography,} from 'antd'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,  LockOutlined} from '@ant-design/icons';
import {LoginComponent} from '../request.js'
import { Link } from 'react-router-dom'
import UserCategorySelector from '../select/select.js';
import React, {useState}  from 'react';

export let account = '', psword =  '', identity = '';

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
                <br />
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
                marginRight:'38vw' }}>  
                    
                    <div style={{color: 'white',marginLeft:'4vw',marginTop:'2vh',marginBottom:'2vh' }}>  
                        <span>统一身份认证登录</span>
                    </div> 
                    <div style={{color: 'black', fontSize: '3vh', marginTop:'2vh',marginBottom:'1vh' }}>  
                    <UserCategorySelector onCategoryChange={handleCategoryChange} />
                    </div>
                    <Input 
                    placeholder="请输入学号" 
                    prefix={<UserOutlined />}
                    style={{
                    width:'20vw', 
                    height:'6vh',
                    marginTop: '10px'}}
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
                    style={{
                    width:'20vw', 
                    height:'6vh',
                    marginTop: '10px',
                    marginBottom: '15px'}}
                    onChange={function(event){
                        psword = event.target.value;
                        console.log('psword msg:' + psword);
                        sessionStorage.setItem('psword',psword); 
                    }}
                    >
                    </Input.Password>
                    
                    <LoginComponent/>
                    <Space>  
                        <br />
                        <Link to="/register" style={{ color: 'lightblue', textDecoration: 'none', fontSize: '3vh', marginLeft:'4vw'}}>  
                            还未注册？立即注册 
                            <span style={{ marginLeft: '5px', marginTop: '10px'}}></span>  
                        </Link>  
                    </Space>  

                    
                </div>  
            </div>   
        
    );  
}