import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import Home from '../../Pages/Home/Home';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
import Profile from '../../Pages/Profile/Profile';
import PageNotFound from '../../Pages/PageNotFound/PageNotFound';

export default function Index() {
  const isAuthenticated = !!localStorage.getItem("userId");
    return (
        <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route path="/" element={isAuthenticated ? (<Home/>) : (<Navigate to="/login" />)}/>
          <Route path="/profile" element={isAuthenticated ? (<Profile/>) : (<Navigate to="/login" />)}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
    )
}
