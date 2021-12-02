import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from '../../Pages/Home/Home';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
import Profile from '../../Pages/Profile/Profile';

export default function index() {
    return (
        <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
        </Routes>
    </Router>
    )
}
