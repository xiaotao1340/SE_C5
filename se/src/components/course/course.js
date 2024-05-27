import React from 'react';
import {Button, Space, DatePicker, Input, ConfigProvider, Select, Menu} from 'antd'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import './course.css'

const { RangePicker } = DatePicker;
const { Search } = Input;

let userid = '', courseid = '', coursename = '', type = '', status = '';

function seek_click(){

}

export function Course(){
    return (
        <div>
                <>  
                    { 
                        <Space 
                        style={{ width: 'auto' }} 
                        className='course-title-box'
                        
                        >
                            <div style={{marginLeft: '1vw'}}></div>
                            <span style={{fontSize:'3vh'} }>课程管理</span>
                            <Search 
                            placeholder="输入搜索" 
                            allowClear 
                            variant="filled"
                            style={{ width: '25vw'}}
                            size='large' />

                            <div style={{marginLeft: '35vw'}}></div>

                            <Button type="text" style={{ width: '4vw'}}>消息</Button>
                            <Button type="text" style={{ width: '4vw'}}>登出</Button>

                        </Space>
                    }

                    { 
                        <Space 
                        //style={{ width: '100%' }} 
                        size={0} 
                        className='seek-box'
                        wrap= 'true'
                        >
                            <span>课程查询</span>
                            <div className='space-all'></div>
                            <Space style={{ width: '100',fontSize:'2vh'} }  >
                                <span>课程编号</span>
                                <Input
                                    onChange={function(event){
                                    courseid = event.target.value;
                                    console.log('courseid msg:' + courseid);
                                }}
                                style={{width: '13vw', fontSize:'2vh', height: '4vh'}}
                                placeholder="请输入课程编号" 
                                ></Input>
                            </Space>

                            <div style={{marginLeft: '4vw'}}></div>

                            <Space style={{ width: '23vw',fontSize:'2vh'} }  >
                                <span>课程名称</span>
                                <Input 
                                onChange={function(event){
                                    coursename = event.target.value;
                                    console.log('coursename msg:' + coursename);
                                }}
                                style={{width: '18vw', fontSize:'2vh', height: '4vh'}}
                                placeholder="请输入课程名称" 
                                ></Input>
                            </Space>

                            <div style={{marginLeft: '4vw'}}></div>

                            <Space style={{ width: '100',fontSize:'2vh'} }  >
                                <span>课程类型</span>
                                <Select
                                showSearch
                                autoresize = "true"
                                style={{width: '13vw', fontSize:'2vh', height: '4vh'}}
                                optionFilterProp="课程类型"
                                defaultActiveFirstOption="true"
                                defaultValue={'all'}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={function(value){
                                    type = value;
                                    console.log('type msg:' + type);
                                }}
                                
                                
                                >
                                    <option value="all">全部</option>
                                    <option value="compulsory">必修</option>
                                    <option value="optional">选修</option>
                                </Select>
                            </Space>

                            <div style={{marginLeft: '2vw'}}></div>

                            <Space style={{ width: '100'} }  >
                                <Button 
                                type="primary" icon={<SearchOutlined /> } 
                                onClick={seek_click} 
                                style={{fontSize:'2vh', height: '4vh'} }>
                                    查询
                                </Button>
                            </Space>


                            <Space style={{ width: '100', fontSize:'2vh'} }  >
                                <span>筛选方式</span>
                                <Select
                                showSearch
                                autoresize = "true"
                                style={{width: '13vw', fontSize:'2vh', height: '4vh'}}
                                optionFilterProp="筛选方式"
                                defaultActiveFirstOption="true"
                                defaultValue={'all'}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                >
                                    <option value="all">全部</option>
                                    <option value="notyet">未进行</option>
                                    <option value="ongoing">进行中</option>
                                    <option value="completed">已完成</option>
                                </Select>
                            </Space>

                            <div style={{marginLeft: '4vw'}}></div>

                            <Space style={{ width: '23vw',fontSize:'2vh'} }  >
                                <span>课程时间</span>
                                <RangePicker style={{width: '18vw', fontSize:'2vh', height: '4vh'}} />
                            </Space>

                            <div style={{marginLeft: '4vw'}}></div>

                            <Space style={{ width: '100',fontSize:'2vh'} }  >
                                <span>当前状态</span>
                                <Select
                                onChange={function(value){
                                    status = value;
                                    console.log('status msg:' + status);
                                }}
                                showSearch
                                autoresize = "true"
                                style={{width: '13vw', fontSize:'2vh', height: '4vh'}}
                                optionFilterProp="状态"
                                defaultActiveFirstOption="true"
                                defaultValue={'all'}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                >
                                    <option value="all">全部</option>
                                    <option value="ongoing">进行中</option>
                                    <option value="notyet">未进行</option>
                                    <option value="completed">已完成</option>
                                </Select>
                            </Space>

                            <div style={{marginLeft: '2vw'}}></div>

                            <Space style={{ fontSize:'2vh', fontSize:'2vh', height: '4vh'} }  >
                                <Button icon={<RedoOutlined />}
                                style={{fontSize:'2vh', height: '4vh'} }>
                                    重置
                                </Button>
                            </Space>
                            
                        </Space>
                    }

                    { 
                        <Space 
                        //style={{ width: '100%' }} 
                        className='index-box'
                        >
                            课程编号
                            <span className='space'></span>
                            课程名称
                            <span className='space'></span>
                            课程时间
                            <span className='space'></span>
                            课程状态
                            <span className='space-long'></span>
                            操作
                            <span className='space-long'></span>
                        </Space>//space占位只适用于固定内容，变长不行
                    }

                    { 
                        <Space 
                        //style={{ width: '100%' }} 
                        size={100} 
                        className='content-box'
                        >
                            <div className='box'></div>
                            <div className='box'></div>
                            <div className='box'></div>
                        </Space>
                    }
                </>
            </div>
    )
}