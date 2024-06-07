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
import './App.css';

import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="app-container">
      {!isLoginPage && (
        <div className="menu">
          <Sidenav />
        </div>
      )}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/by-elect" element={<Byelection />} />
          <Route path="/eval" element={<Eval />} />
          <Route path="/setinfo" element={<Setinfo />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
