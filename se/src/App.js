import React, { Component, PureComponent } from 'react';
import { Sidenav, pep } from './components/sidenav/sidenav.js'
import { Menu, Space} from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Login, account, psword} from './components/login/login.js'
import { Home } from './components/home/home.js';
import { Byelection } from './components/byelection/byelection.js';
import { Course } from './components/course/course.js';
import { Setinfo } from './components/setinfo/setinfo.js';
import { Info } from './components/info/info.js';
import { Eval } from './components/eval/eval.js';
import './App.css'
//指向后端

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';

export class App extends PureComponent {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Space className='content'><Sidenav></Sidenav><Home/></Space>}></Route>
          <Route path="/course" element={<Space className='content'><Sidenav></Sidenav><Course/></Space>}></Route>
          <Route path="/by-elect" element={<Space className='content'><Sidenav></Sidenav><Byelection/></Space>}></Route>
          <Route path="/eval" element={<Space className='content'><Sidenav></Sidenav><Eval/></Space>}></Route>
          <Route path="/setinfo" element={<Space className='content'><Sidenav></Sidenav><Setinfo/></Space>}></Route>
          <Route path="/info" element={<Space className='content'><Sidenav></Sidenav><Info/></Space>}></Route>
        </Routes>
      </div>
    );
  }
}

 
export default App;