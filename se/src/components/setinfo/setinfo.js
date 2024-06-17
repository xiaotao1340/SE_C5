import React, { useEffect } from 'react';
import { Form, Input, Button, message, Row, Select, DatePicker } from "antd"
import { getapi, postapi } from "../request";
import { Route } from 'react-router-dom';
import moment from 'moment'

//正则校验的正则表达式，这里注意正则表达式中的‘\’要使用‘\\’转义
const patterns = {
    "name":"^[a-zA-Z_][0-9a-zA-Z_]{0,}$",
    "tel":"^1[2-9]\\d{0,}$",
    "email":"^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
    "pwd":"^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\\(\\)])+$)([^(0-9a-zA-Z)]|[\\(\\)]|[a-z]|[A-Z]|[0-9]){8,}$",
    "IP":"^(?=(\\b|\\D))(((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))\\.){3}((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))(?=(\\b|\\D))$",
    "IDCard":"(^\\d{15}$)|(^\\d{17}([0-9]|X)$)"
}
 
 
//对应正则表达式的提示信息
const patternMsg = {
    "name":"请以字母、下划线开头并包括数字、字母、下划线组成",
    "tel":"请输入正确的手机号码",
    "email":"非正确的邮箱地址",
    "pwd":"密码至少由8位包含字母、数字、特殊字符两种组合",
    "IP":"非正确IP地址",
    "IDCard":"非正确身份证号码"
}
 
//根据使用的正则返回对应的正则和信息对象
const pattern = (name,para='g') =>{
    return {
        pattern:new RegExp(patterns[name],para),
        message:patternMsg[name]
    }
} 

export function Setinfo(){
    const [form] = Form.useForm();

    let ps = ''

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        ps = dateString
    }

    const getUserInfo = () => {
        getapi('user/api_get_user_info')
        .then((response)=> {
            if(response.data.status === 0){
                form.setFieldsValue({
                    'name': response.data.name,
                    'email': response.data.email,
                    'college': response.data.department,
                    'birth': response.data.birthday ? moment(response.data.birthday,'YYYY-MM-DD') : '',
                    'gender': response.data.gender,
                    'contact': response.data.contact
                });
            }
        })
        .catch(err => {
            console.log(err);
            console.error(err);
            message.info('获取用户失败，请稍后重试'); // 给用户一些反馈  
        })
    };

    const saveUserInfo = (values) => {
        console.log(values)
        console.log(moment(values.birth).format('YYYY-MM-DD'))

        postapi('user/api_set_user_info', {
            password: values.password ? values.password : '',
            email: values.email ? values.email : '',
            gender: values.gender ? values.gender : '',
            birthday: values.birth ? ps : '',
            contact_information: values.contact ? values.contact : '',
            department: values.college ? values.college : ''
        }).then(res => {
          if (res.data.status === 0) {
            message.success('信息修改成功');
          }
        })
        .catch(err => {
            console.log(err);
            console.error(err);
            message.info('设置失败，请稍后重试'); // 给用户一些反馈  
        });
    };

    useEffect(() => {
        // 在组件渲染时自动调用这个函数
        getUserInfo();
    },[]);

    const onFinish = (values) => {
        saveUserInfo(values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container">
            <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            labelCol={{ flex: '100px' }}
            >
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                    label="学号"
                    name='name'
                    >
                        <Input disabled={true} style={{width:'20vw'}}/>
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{min: 6, message: '请输入 6 位以上密码'}]}
                    >
                        <Input.Password style={{width:'20vw'}}/>
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{ type: 'email', message: '请输入正确邮箱' }]}
                    >
                        <Input style={{width:'20vw'}}/>
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                    label="性别"
                    name="gender"
                    >
                        <Select
                        options={[
                            {value: 'male', label: '男'},
                            {value: 'female', label: '女'},
                        ]}
                        style={{width:'20vw'}}
                        />
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                    label="生日"
                    name="birth"
                    >
                        <DatePicker onChange={onChange} style={{width:'20vw'}}/>
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                    label="手机"
                    name="contact"
                    rules={[pattern('tel')]}
                    >
                        <Input style={{width:'20vw'}}/>
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item
                    label="学院"
                    name="college"
                    >
                        <Select
                        options={[
                            {value: 'cs', label: '计算机学院'},
                            {value: 'se', label: '软件学院'},
                            {value: 'lit', label: '人文学院'},
                            {value: 'math', label: '数学学院'},
                        ]}
                        style={{width:'20vw'}}
                        />
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        保存
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    )
}