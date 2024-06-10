import React from 'react';
import { Sidenav } from './components/sidenav/sidenav.js';
import { Login } from './components/login/login.js';
import { Register } from './components/register/register.js';
import { Home } from './components/home/home.js';
import { Byelection } from './components/byelection/byelection.js';
import { Course } from './components/course/course.js';
import { Setinfo } from './components/setinfo/setinfo.js';
import { Info } from './components/info/info.js';
import { Eval } from './components/eval/eval.js';
import {reactLocalStorage} from 'reactjs-localstorage';
import './App.css';

import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import { message } from 'antd';

function RequireAuth({ children }) {
  let auth = reactLocalStorage.get('token', false);
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    message.info('尚未登录，不能访问')
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

function AuthNavi({ flag }) {
  return !flag && (
    <div className='app-container'>
      <div className="menu">
        <Sidenav userType={reactLocalStorage.getObject('identity')}/>
      </div>
      <div className='content'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/register' || reactLocalStorage.get('identity', false) === false;

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<RequireAuth children={<AuthNavi flag={isLoginPage}/>} />}>
            <Route path="home" element={<Home />} />
            <Route path="course" element={<Course />} />
            <Route path="by-elect" element={<Byelection />} />
            <Route path="eval" element={<Eval />} />
            <Route path="setinfo" element={<Setinfo />} />
            <Route path="info" element={<Info />} />
            <Route path="" element={<Navigate to ="/user/home" />} />
          </Route>
          <Route path="*" element={<Navigate to ="/user/home" />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
