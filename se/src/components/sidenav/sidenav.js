import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export function Sidenav({ userType = 'student' }) {
  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          <Menu.Item key="1">
            <Link to="/home">首页</Link>
          </Menu.Item>,
          <Menu.SubMenu key="2" title="课程管理">
            <Menu.Item key="2.1">
                <Link to="/course">查看课程列表</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
                <Link to="/course">查看考试信息</Link>
            </Menu.Item>
            <Menu.Item key="2.3">
                <Link to="/course">查看考试成绩</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.SubMenu key="3" title="选课管理">
            <Menu.Item key="3.1">
                <Link to="/by-elect">自主选课</Link>
            </Menu.Item>
            <Menu.Item key="3.2">
                <Link to="/by-elect">退课申请</Link>
            </Menu.Item>
            <Menu.Item key="3.3">
                <Link to="/by-elect">补选申请</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.SubMenu key="4" title="学生评价">
            <Menu.Item key="4.1">
                <Link to="/eval">课程评价</Link>
            </Menu.Item>
            <Menu.Item key="4.2">
                <Link to="/eval">教师评价</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.Item key="5">
            <Link to="/setinfo">信息设置</Link>
          </Menu.Item>,
          <Menu.Item key="6">
            <Link to="/info">信息通知</Link>
          </Menu.Item>
        ];
      case 'teacher':
        return [
          <Menu.Item key="1">
            <Link to="/home">首页</Link>
          </Menu.Item>,
          <Menu.SubMenu key="2" title="课程管理">
            <Menu.Item key="2.1">
                <Link to="/course">查看课程列表</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
                <Link to="/course">管理考试成绩</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.SubMenu key="3" title="选课管理">
            <Menu.Item key="3.1">
                <Link to="/by-elect">处理退课申请</Link>
            </Menu.Item>
            <Menu.Item key="3.2">
                <Link to="/by-elect">处理补选申请</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.Item key="4">
            <Link to="/setinfo">信息设置</Link>
          </Menu.Item>,
          <Menu.Item key="5">
            <Link to="/info">信息通知</Link>
          </Menu.Item>
        ];
      case 'admin':
        return [
          <Menu.Item key="1">
            <Link to="/home">首页</Link>
          </Menu.Item>,
          <Menu.SubMenu key="2" title="课程管理">
            <Menu.Item key="2.1">
                <Link to="/course">编辑课程列表</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
                <Link to="/course">发布课程列表</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.Item key="3">
            <Link to="/setinfo">学生评价</Link>
          </Menu.Item>,
          <Menu.Item key="4">
            <Link to="/setinfo">信息设置</Link>
          </Menu.Item>,
          <Menu.Item key="5">
            <Link to="/info">信息通知</Link>
          </Menu.Item>
        ];
      default:
        return [];
    }
  };

  return (
    <div className="sidenav">
      <Menu
        className="menu"
        defaultSelectedKeys={['1']}
        mode="horizontal"
      >
        {getMenuItems()}
      </Menu>
    </div>
  );
}