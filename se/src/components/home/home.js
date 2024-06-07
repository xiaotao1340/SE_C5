import React, { useState, useEffect } from 'react';
import { PlusOutlined,LikeOutlined } from '@ant-design/icons';
import {Space, Table, Tag, Button, Card, Input,Avatar, Badge,Calendar, theme , Timeline} from 'antd'
import {Progress,  Checkbox, DatePicker, Drawer, Form, message, Row, Col, Statistic} from 'antd'
// import { account } from '../login/login';
import { user_info, user_type } from '../store/user';
import './home.css'
import { UserOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { Sidenav } from '../sidenav/sidenav';
import { postapi, getapi } from '../request';

import { processUser} from '../store/user'

// 测试用account，调用processUser获取信息
const account = '1234';
processUser(account);

const { Search } = Input;
const { Meta } = Card;

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

const columns = [
    {
      title: '星期/时间',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '8:00',
      dataIndex: 'k1',
      key: 'k1',
    },
    {
      title: '8:50',
      dataIndex: 'k2',
      key: 'k2',
    },
    {
        title: '10:00',
        dataIndex: 'k3',
        key: 'k3',
    },
    {
        title: '10:50',
        dataIndex: 'k4',
        key: 'k4',
    },
    {
        title: '11:40',
        dataIndex: 'k5',
        key: 'k5',
      },
      {
        title: '13:25',
        dataIndex: 'k6',
        key: 'k6',
      },
      {
          title: '14:15',
          dataIndex: 'k7',
          key: 'k7',
      },
      {
          title: '15:05',
          dataIndex: 'k8',
          key: 'k8',
      }, 
      {
        title: '16:15',
        dataIndex: 'k9',
        key: 'k9',
      },
      {
        title: '17:05',
        dataIndex: 'k10',
        key: 'k10',
      },
      {
          title: '18:50',
          dataIndex: 'k11',
          key: 'k11',
      },
      {
          title: '19:40',
          dataIndex: 'k12',
          key: 'k12',
      }, 
      {
        title: '20:30',
        dataIndex: 'k13',
        key: 'k13',
    }, 
];

// const data = [
//     {
//         key: '1',
//         date: '星期一',
//         k6 : '软件工程',
//     },
//     {
//         key: '2',
//         date: '星期二',
//         k3 : '软件工程',
//     },
//     {
//         key: '3',
//         date: '星期三',
//         k8 : '编译原理',
//     },
//     {
//         key: '4',
//         date: '星期四',
//         k1 : '编译原理',
//         k2 :  '编译原理',
//     },
//     {
//         key: '5',
//         date: '星期五',
//         k4 : '离散数学',
//     },

// ];
 

export function Home(){

  function get_info() {
    postapi("user_info", {user_id: 1}) // TODO
    .then( (response) => {
      if (response.data.status === 0) {
        user_info = response.data
        user_type = response.data.identity
      }
      else {
        alert('获取用户信息失败')
      }
    })
    .catch( (error) => {
      console.log(error)
      alert('获取用户信息失败')
    });
  }

  useEffect(() => {
    // 在组件渲染时自动调用这个函数
    get_info();
  });

    const { token } = theme.useToken();
    const wrapperStyle = {
      width: 350,
      height: 400, 
      marginLeft : '15%',
      marginTop : '10%',
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadiusLG,
    };


    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: '好棒！请继续加油！',
          className: 'custom-class',
          style: {
            marginTop: '5vh',
          },
        });
      };

	const [loading, setLoading] = useState(true);
	const onChange = (checked) => {
		setLoading(!checked);
	};

	const StudentItems = [
		{
		  key: '1',
		  label: '学号',
		  children: user_info.id,
		},
		{
		  key: '2',
		  label: '姓名',
		  children: user_info.name,
		},
		{
		  key: '3',
		  label: '性别',
		  children: (user_info.gender === 'male') ? '男' : '女',
		},
		{
		  key: '4',
		  label: '生日',
		  children: user_info.birthday,
		},
		{
		  key: '5',
		  label: '联系方式',
		  children: user_info.contact,
		},
		{
		  key: '6',
		  label: '学院',
		  children: user_info.department,
		},
	  ];

	const TeaItems = [
		{
		  key: '1',
		  label: '教工号',
		  children: user_info.id,
		},
		{
		  key: '2',
		  label: '姓名',
		  children: user_info.name,
		},
		{
		  key: '3',
		  label: '性别',
		  children: (user_info.gender === 'male') ? '男' : '女',
		},
		{
		  key: '4',
		  label: '生日',
		  children: user_info.birthday,
		},
		{
		  key: '5',
		  label: '联系方式',
		  children: user_info.contact,
		},
		{
		  key: '6',
		  label: '学院',
		  children: user_info.department,
		},
	  ];

	const Items = user_type === 'student' ? StudentItems : TeaItems;

    return (
    <div>
        <>  
            { 
                <Space 
                style={{ width: 'auto' ,marginTop:"3vh", position: 'relative'}} 
                className='course-title-box'
                >
                    <div style={{marginLeft: '3vw'}}></div>
                    <span style={{fontSize:'3vh'} }>首页</span>
                    <Search 
                        placeholder="输入搜索" 
                        allowClear 
                        variant="filled"
                        style={{ width: '20vw', marginLeft:'10%'}}
                        size='large'
					/>

                    <div style={{marginLeft: '35vw'}}></div>

                    <Button type="text" style={{fontSize:'2vh', width: '4vw'}}>消息</Button>
					<a href="/">
                    	<Button type="text" style={{fontSize:'2vh', width: '4vw'}}>登出</Button>
					</a>
				</Space>
            }

            <Space direction="vertical" size="middle" style={{display: 'flex',}}>
				
				<div >
					<Card title="个人信息" style={{width:1000,height:240,marginLeft:'4%',marginTop:'5%'}}>
						<Space align="start" style={{ width: '100%' }} className='home-top-box'>
							<Meta
								style={{marginTop:'5%'}}
								avatar={
									<Avatar 
										shape="square" size={128} icon={<UserOutlined />}
										src={`${process.env.PUBLIC_URL}/image-${account}.png`}  
									/>
								}
							>
							</Meta>

							<Descriptions 
								style={{marginTop:'1%', width:780,height:250}}
								
								bordered items={Items} 
							/>
						</Space>
					</Card>
				</div>

                <Space align="center" style={{ width: '100%' }} className='home-top-box'>			

                    <div style={wrapperStyle}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </div>


                    <Card title="待办清单" hoverable
                        extra={<Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                                添加
                                </Button>}
                        style={{width: 310,height:320,marginLeft:'20%',marginTop:'-15%'}}
                    >	
							{/* 这里暂时仅就教师做了展示，未实现组件更新 */}
                          <Timeline
                            pending="to be continue..."
                            items={[
                            {
                                children: "2024-06-01 学生补选申请处理",
                            },
                            {
                                children: '2024-06-03 软件工程课程教学',
                            },
                            {
                                children: '2024-06-04 编译原理课程教学',
                            },
                            
                            ]}
                        />
                    </Card>

                    {/* 这里暂时仅就教师做了展示，未连接后端 */}
                    <Card title="本学期教学完成进度" hoverable
                        style={{width: 290,height:320,marginLeft:'25%',marginTop:'-15%'}}
                    >
                        <Space direction="vertical" size="middle">
                            <Row gutter={16}>
                                <Col span={12}>
                                <Progress type="circle" percent={90} strokeColor={conicColors} />           
                                </Col>
                                <Col span={12}>
                                <br />
                                <Statistic title="学生评价人数" value={1128} prefix={<LikeOutlined />} />
                                </Col>
                            </Row>
                            {contextHolder}
                            <Button type="primary" onClick={success} 
                                style={{width:250,height:100,fontSize:'13pt'}}>
                                从2019年5月3日开始
                                <br />
                                你已完成300学时的教学
                            </Button>
                        </Space>
                    </Card>
                
                </Space>
                
                {/* <div style={{marginTop: '5%',marginLeft: '45%'}}>
                    <span style={{fontSize:'15pt'}}>本学期课程表 </span>
                    <Button type="primary" style={{marginLeft:'5%',fontSize:'13pt'}}>
                            Download
                    </Button>
                </div> */}
                    
                {/* <Table columns={columns} dataSource={data}  pagination={false} tableLayout={'fixed'}/>                */}
                 
            </Space>

        <Drawer title="添加待办" width={500} onClose={onClose} open={open}
                styles={{body:{paddingBottom: 80,}}}
            >
                <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal" style={{maxWidth: 600}}>
                    <Form.Item label="消息提醒"  valuePropName="checked">
                        <Checkbox>发送给默认邮箱</Checkbox>
                    </Form.Item>
                    <Form.Item label="待办事项">
                        <Input />
                    </Form.Item>
                    <Form.Item label="待办日期">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item >
                        <Button onClick={onClose} type="primary">提交</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    </div>
    )
}
