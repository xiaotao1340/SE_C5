import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function Sidenav({ userType }) {
  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          <Menu.Item key="home">
            <Link to="/user/home">首页</Link>
          </Menu.Item>,
          <Menu.SubMenu key="course" title="课程管理">
            <Menu.Item key="2.1">
                <Link to="/user/course">查看课程列表</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
                <Link to="/user/course">查看考试信息</Link>
            </Menu.Item>
            <Menu.Item key="2.3">
                <Link to="/user/course">查看考试成绩</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.SubMenu key="by-elect" title="选课管理">
            <Menu.Item key="3.1">
                <Link to="/user/by-elect">自主选课</Link>
            </Menu.Item>
            <Menu.Item key="3.2">
                <Link to="/user/by-elect">退课申请</Link>
            </Menu.Item>
            <Menu.Item key="3.3">
                <Link to="/user/by-elect">补选申请</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.SubMenu key="eval" title="学生评价">
            <Menu.Item key="4.1">
                <Link to="/user/eval">课程评价</Link>
            </Menu.Item>
            <Menu.Item key="4.2">
                <Link to="/user/eval">教师评价</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.Item key="setinfo">
            <Link to="/user/setinfo">信息设置</Link>
          </Menu.Item>,
          <Menu.Item key="info">
            <Link to="/user/info">信息通知</Link>
          </Menu.Item>
        ];
      case 'teacher':
        return [
          <Menu.Item key="home">
            <Link to="/user/home">首页</Link>
          </Menu.Item>,
          <Menu.SubMenu key="course" title="课程管理">
            <Menu.Item key="2.1">
                <Link to="/user/course">查看课程列表</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
                <Link to="/user/course">管理考试成绩</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.SubMenu key="by-elect" title="选课管理">
            <Menu.Item key="3.1">
                <Link to="/user/by-elect">处理退课申请</Link>
            </Menu.Item>
            <Menu.Item key="3.2">
                <Link to="/user/by-elect">处理补选申请</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.Item key="setinfo">
            <Link to="/user/setinfo">信息设置</Link>
          </Menu.Item>,
          <Menu.Item key="info">
            <Link to="/user/info">信息通知</Link>
          </Menu.Item>
        ];
      case 'administrator':
        return [
          <Menu.Item key="home">
            <Link to="/user/home">首页</Link>
          </Menu.Item>,
          <Menu.SubMenu key="course" title="课程管理">
            <Menu.Item key="2.1">
                <Link to="/user/course">编辑课程列表</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
                <Link to="/user/course">发布课程列表</Link>
            </Menu.Item>
          </Menu.SubMenu>,
          <Menu.Item key="eval">
            <Link to="/user/eval">学生评价</Link>
          </Menu.Item>,
          <Menu.Item key="setinfo">
            <Link to="/user/setinfo">信息设置</Link>
          </Menu.Item>,
          <Menu.Item key="info">
            <Link to="/user/info">信息通知</Link>
          </Menu.Item>
        ];
      default:
        return [];
    }
  };
  const location = useLocation();
  const pathItems = location.pathname.split('/');
  // 获取当前路由层级的 path 片段
  const pathItem = pathItems[2] ?? '';

  return (
    <div className="sidenav">
      <Menu
        className="menu"
        selectedKeys={[pathItem]}
        mode="horizontal"
      >
        {getMenuItems()}
      </Menu>
    </div>
  );
}