import {Space, Input, Button, Typography, message, Checkbox, Form, Row, Select} from 'antd'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,  LockOutlined} from '@ant-design/icons';
// import {LoginComponent} from '../request.js'
import CryptoJS from 'crypto-js';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import UserCategorySelector from '../select/select.js';
import React, {useState}  from 'react';
import { postapi } from '../request.js';
// import { useDispatch, useSelector } from 'react-redux'
// import { setUsers} from '../store/users.js'
import {reactLocalStorage} from 'reactjs-localstorage';


const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export function Login() {  

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const navigate = useNavigate();
    const loginMsg = (values) => {
      console.log(values)
      const hashedPassword = hashPassword(values.password);
      postapi('user/login', {
        account : values.account,
        psword : hashedPassword,
        identity: values.identity
      })
      .then((response)=> {
        console.log(response.data);
        message.info(response.data.resp);
        if(response.data.status === 0){
          reactLocalStorage.setObject('token', response.data.token);
          reactLocalStorage.setObject('username', response.data.name)
          reactLocalStorage.setObject('identity', response.data.identity)
          navigate('/user/home');
        }
      })
      .catch(err => {
        console.log(err);
        console.error(err);
        message.info('登录失败，请检查您的用户名和密码是否正确，或者稍后重试。'); // 给用户一些反馈  
      })
    }

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

                            <Form
                            name="basic"
                            labelCol={{ span: 25}}
                            wrapperCol={{ span: 25 }}
                            layout="horizontal"
                            style={{
                            maxWidth: 600,
                            }}
                            initialValues={{
                                identity: 'student',
                            }}
                            onFinish={loginMsg}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            >
                                <Row type="flex" justify="center" align="middle">
                                    <Form.Item label="用户类型" name="identity" wrapperCol={{ span: 25 }}>
                                            <Select defaultValue="student" style={{ width: 80 }} 
                                                options={[
                                                    {value: 'student', label: '学生'},
                                                    {value: 'teacher', label: '教师'},
                                                    {value: 'administrator', label: '管理员'}
                                                ]}
                                            />
                                    </Form.Item>
                                </Row>
                                <Row type="flex" justify="center" align="middle">
                                    <Form.Item
                                    label="学号"
                                    name="account"
                                    rules={[
                                        {
                                        required: true,
                                        message: '请输入正确学号！',
                                        },
                                    ]}
                                    >
                                        <Input placeholder="请输入学号" prefix={<UserOutlined />} style={{width:'20vw'}}/>
                                    </Form.Item>
                                </Row>

                                <Row type="flex" justify="center" align="middle">
                                    <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                        required: true,
                                        message: '请输入正确密码！',
                                        },
                                        {
                                        min: 6,
                                        message: '请输入 6 位以上密码'
                                        }
                                    ]}
                                    >

                                        <Input.Password
                                        placeholder="请输入密码" 
                                        prefix={<LockOutlined />}
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        style={{width:'20vw'}}
                                        />
                                    </Form.Item>
                                </Row>

                                <Row type="flex" justify="center" align="middle">
                                    <Form.Item>
                                        <Button type="primary" style={{ height:'6vh'}} htmlType="submit">立即登录</Button>
                                    </Form.Item>
                                </Row>

                            </Form>

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