import React, { useState, useEffect } from 'react';
import { PlusOutlined,LikeOutlined } from '@ant-design/icons';
import {Space, Table, Tag, Button, Card, Input,Avatar, Badge,Calendar, theme , Timeline} from 'antd'
import {Progress,  Checkbox, DatePicker, Drawer, Form, message, Row, Col, Statistic} from 'antd'
// import { account, id } from '../login/login';
import './home.css'
import { UserOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { Sidenav } from '../sidenav/sidenav';
import { postapi, getapi } from '../request';
import { reactLocalStorage } from 'reactjs-localstorage';

// 测试用account，调用processUser获取信息
// const account = '1234';
// // processUser(account);

const { Search } = Input;
const { Meta } = Card;

const currentDate = new Date();
var percent = 0;
const month = currentDate.getMonth() + 1;
if(month >= '2' && month <= '7'){
  percent = Math.floor((month - 1)/6*100);
}
else if(month === 1){
  percent = 100;
}
else{
  percent = Math.floor((month - 7)/6*100).toFixed;
}


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
      title: '时间/星期',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '星期一',
      dataIndex: 'k1',
      key: 'k1',
    },
    {
      title: '星期二',
      dataIndex: 'k2',
      key: 'k2',
    },
    {
        title: '星期三',
        dataIndex: 'k3',
        key: 'k3',
    },
    {
        title: '星期四',
        dataIndex: 'k4',
        key: 'k4',
    },
    {
        title: '星期五',
        dataIndex: 'k5',
        key: 'k5',
      },
      {
        title: '星期六',
        dataIndex: 'k6',
        key: 'k6',
      },
      {
          title: '星期天',
          dataIndex: 'k7',
          key: 'k7',
      },
];

const data = [
    {
        key: '1',
        date: '08:00',
        k4 : '编译原理',
    },
    {
        key: '2',
        date: '08:50',
        k4 : '编译原理',
    },
    {
        key: '3',
        date: '10:00',
        k1 : '软件工程',
    },
    {
        key: '4',
        date: '10:50',
        k1 : '软件工程',
    },
    {
        key: '5',
        date: '11:40',
    },
    {
      key: '6',
      date: '13:25',
      k1 : '编译原理',
  },
  {
    key: '7',
    date: '14:15',
    k1 : '编译原理',
  },
  {
    key: '8',
    date: '15:05',
    k1 : '编译原理',
  },
  {
    key: '9',
    date: '16:15',
    k3 : '定向越野',
  },
  {
    key: '10',
    date: '17:05',
    k3 : '定向越野',
  },
  {
    key: '11',
    date: '18:50',
    k2 : '软件工程',
  },
  {
    key: '12',
    date: '19:40',
    k2 : '软件工程',
  },
  {
    key: '13',
    date: '20:30',

  },
];

// function LogOUt() {
//   reactLocalStorage.clear()
// }

export function Home(){

  const [user_info, setUserInfo] = useState(null);
  const [user_type, setUserType] = useState(null);
  const [Items, setItems] = useState([]);
  const [title1, setTitle1] = useState(null);
  const [account, setAccount] = useState(0)

  function get_info() {
    getapi('user/api_get_user_info')
    .then( (response) => {
      console.log(response.data.status)
      if (response.data.status === 0) {
        console.log(response.data);
        setUserInfo(response.data);
        setUserType(response.data.identity);
        setAccount(response.data.name)
      }
      else {
        message.info('获取用户信息失败')
      }
    })
    .catch( (error) => {
      console.log(error)
      message.info('获取用户信息失败')
    });
  }

  useEffect(() => {
    // 在组件渲染时自动调用这个函数
    console.log(month);
    get_info();
  },[]);

  useEffect(() => {
    if(user_info){
    console.log(user_type);

    const items = (user_type === 'administrator') ? [{key: '1', label: '账号', children: user_info.name}] :
     [
      {
        key: '1',
        label: (user_type === 'student') ? '学号' : '教工号',
        children: user_info.name,
      },
      {
        key: '2',
        label: '姓名',
        children: user_info.realName,
      },
      {
        key: '3',
        label: '性别',
        children: (user_info.gender === 'male') ? '男' : (user_info.gender === 'female') ? '女' : '',
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
      setItems(items);
    }

    setTitle1('本学期' + ((user_type === "student") ? '学业' : '教学') + '完成进度');
  }, [user_info]);


  

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

	

    return (
    <div >
        <>  
            {/* { 
                
                <Space 
                  style={{ width: 'auto' ,marginTop:"3vh", position: 'relative'}} 
                  className='course-title-box'
                >
                    <div style={{marginLeft: '5vw', display: 'flex', flexDirection: 'column'}}>
                      <span style={{fontSize:'3vh'}} >首页</span>
                    </div>
                    <Search 
                        placeholder="输入搜索" 
                        allowClear 
                        variant="filled"
                        style={{ width: '20vw', marginLeft:'10%'}}
                        size='large'
					          />
                    <div style={{marginLeft: '40vw'}}></div>

                    <a href="/user/info">
                      <Button type="text" style={{fontSize:'2vh', width: '4vw'}}>消息</Button>
                    </a>
					          <a href="/">
                      <Button onClick={LogOUt} type="text" style={{fontSize:'2vh', width: '4vw'}}>登出</Button>
					          </a>
				        </Space>
            } */}

            <Space direction="vertical" size="middle" style={{display: 'flex',}}>

            <div >
              {user_info ? (
                <Card title="个人信息" style={{width:'90%',height:'30%',marginLeft:'4%',marginTop:'5%'}}>
                   <Space align="start" className='home-top-box'>
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
                        style={{marginTop:'3%', width:'170%',height:'90%'}}
                      
                       bordered items={Items} 
                      />
                   </Space>
                </Card>
              ) : (<p>正在加载用户信息...</p>)}
            </div>
                <Space style={{ width: '100%' }} className='home-top-box'>			

                    <div style={wrapperStyle}>
                        <Calendar 
                          fullscreen={false} 
                          onPanelChange={onPanelChange} 
                          style={{marginLeft:'0%', width: '90%',height:'80%'}}
                        />
                    </div>


                    <Card title="待办清单" hoverable
                        extra={<Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                                添加
                                </Button>}
                        style={{width: '120%',height:'180%',marginLeft:'15%',marginTop:'-25%'}}
                    >	
			
                          <Timeline
                            pending="to be continue..."
                            items={[
                            {
                                children: '2024-05-01 软件工程设计报告',
                            },
                            {
                                children: '2024-06-09 软件工程展示',
                            },
                            {
                                children: '2024-06-14 软件工程考试',
                            },
                            
                            ]}
                        />
                    </Card>

                    {/* 这里暂时仅就教师做了展示，未连接后端 */}
                    <Card title={title1} hoverable
                        style={{width: '100%',height:'100%',marginLeft:'45%',marginTop:'-15%'}}
                    >
                        <Space direction="vertical" size="middle">
                            <Row gutter={16}>
                                <Col span={12}>
                                <Progress type="circle" percent={percent} strokeColor={conicColors} />           
                                </Col>
                                <Col span={12}>
                                <br />
                                <Statistic
                                  style={{marginLeft:'30%'}}
                                  title="评教人数" value={8} 
                                  prefix={<LikeOutlined />} 
                                />
                                </Col>
                            </Row>

                            {contextHolder}
                            {/* <Button type="primary" onClick={success} 
                                style={{width:250,height:100,fontSize:'13pt'}}>
                                从2019年5月3日开始
                                <br />
                                你已完成300学时的教学
                            </Button> */}
                            <div style={{ textAlign: 'center', marginTop: '0%', fontSize: '150%', letterSpacing: '10px' }}>
                              勤学      修德
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '0%', fontSize: '150%', letterSpacing: '10px' }}>
                              明辨      笃实
                            </div>
                        </Space>
                    </Card>
                
                </Space>
                
                <div style={{marginTop: '0%',marginLeft: '35%'}}>
                    <span style={{fontSize:'15pt'}}>本学期课程表 </span>
                </div>
                    
                <Table 
                  style={{width:'75%', height:'50%', marginLeft:'3%'}}
                  columns={columns} 
                  dataSource={data}  
                  pagination={false} 
                  tableLayout={'fixed'}
                />
                 
            </Space>

        <Drawer title="添加待办" width={500} onClose={onClose} open={open}
                styles={{body:{paddingBottom: 80,}}}
            >
                <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal" style={{maxWidth: 600}}>
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
