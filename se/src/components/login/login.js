import {Space, Input} from 'antd'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {LoginComponent} from '../request.js'

export let account = '', psword =  '';


export function Login(){
    return (
        <div >
            <Space
            style={{
            width:'90vw', 
            height:'78vh', 
            background:"white",
            marginLeft:'4vw',
            marginRight:'4vw',
            marginTop:'9vh',
            marginBottom:'9vh',
            borderRadius:'5vh'
            }}
            size={0}
            wrap
            >

                <Space
                style={{
                width:'90vw', 
                height:'10vh'
                }}>
                    <span style={{
                    fontSize: '5vh',
                    color: 'lightblue',
                    marginLeft:'10vw'}}>浙江大学教务管理系统</span>
                </Space>

                <Space
                style={{
                width:'90vw', 
                height:'60vh'
                }}>
                    <Space
                    style={{
                    width:'25vw', 
                    height:'50vh', 
                    background:"red",
                    marginLeft:'10vw',
                    marginBottom:'10vh',
                    backgroundColor:'#E9EFF7',
                    borderRadius:'2vh'}}
                    align='center'
                    direction='vertical'
                    >

                    <span>登录界面</span>

                    <span>WELCOME!</span>

                    <Input 
                    placeholder="请输入账号" 
                    prefix={<UserOutlined />}
                    style={{
                    width:'20vw', 
                    height:'6vh'}}
                    onChange={function(event){
                        account = event.target.value;
                        console.log('account msg:' + account);
                    }}>

                    </Input>
                    <Input.Password 
                    placeholder="请输入密码" 
                    prefix={<UserOutlined />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{
                    width:'20vw', 
                    height:'6vh'}}
                    onChange={function(event){
                        psword = event.target.value;
                        console.log('psword msg:' + psword);
                    }}
                    >
                        
                    </Input.Password>
                    <LoginComponent/>
                    </Space>
                </Space>
            </Space>
        </div>
    );
}