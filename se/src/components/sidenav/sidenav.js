import React from 'react';
import {Menu} from 'antd'
import { Link, Router, Routes, Route } from 'react-router-dom';


  //自写组件名开头一定要大写
export function Sidenav() {
    return (


        <Menu
        style={{ width: '15vw', height: '97vh' }}
        defaultSelectedKeys={['1']}
        mode="inline">
            <Menu.Item key={'1'}>
                <Link to="/home">首页</Link>
            </Menu.Item>
            <Menu.Item key={'2'}>
                <Link to="/course">课程管理</Link>
            </Menu.Item>
            <Menu.Item key={'3'}>
                <Link to="/by-elect">选课管理</Link>
            </Menu.Item>
            <Menu.Item key={'4'}>
                <Link to="/eval">学生评价</Link>
            </Menu.Item>
            <Menu.Item key={'5'}>
                <Link to="/setinfo">信息设置</Link>
            </Menu.Item>
            <Menu.Item key={'6'}>
                <Link to="/info">信息通知</Link>
            </Menu.Item>
            
        </Menu>
    )
}
