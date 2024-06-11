import React from 'react';
import {  Input, Typography, Space, Button, message, Form, Row, Select} from 'antd';
import { MailOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined, ContactsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import { postapi } from '../request.js';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export function Register() {
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const navigate = useNavigate();

    const registerMsg = (values) => {
        const hashedPassword = hashPassword(values.password); 
        console.log(values)
        postapi('user/register', {
                account: values.account,
                psword: hashedPassword,
                email: values.email,
                identity: values.identity,
                realName: values.realName
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
                            onFinish={registerMsg}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            >
                                <Row type="flex" justify="center" align="middle">
                                    <Form.Item label="用户类型" name="identity" wrapperCol={{ span: 25 }}>
                                            <Select defaultValue='student' style={{ width: 80 }} 
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
                                    label="姓名"
                                    name="realName"
                                    rules={[
                                        {
                                        required: true,
                                        message: '请输入正确姓名！',
                                        },
                                    ]}
                                    >
                                        <Input placeholder="请输入姓名" prefix={<ContactsOutlined />} style={{width:'20vw'}}/>
                                    </Form.Item>
                                </Row>

                                <Row type="flex" justify="center" align="middle">
                                    <Form.Item
                                    label="邮箱"
                                    name="email"
                                    rules={[
                                        {
                                        required: true,
                                        message: '请输入正确邮箱！',
                                        },
                                        {
                                            type: 'email',
                                            message: '请输入正确邮箱！',
                                        },
                                    ]}
                                    >
                                        <Input placeholder="请输入邮箱" prefix={<MailOutlined />} style={{width:'20vw'}}/>
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
                                        <Button type="primary" style={{ height:'6vh'}} htmlType="submit">立即注册</Button>
                                    </Form.Item>
                                </Row>

                            </Form>

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