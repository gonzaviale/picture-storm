import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePicture from './pages/CreatePicture';
import './axiosConfig';
import MyPictures from './pages/MyPictures';

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/create-picture' element={<CreatePicture />}/>
        <Route path='/my-pictures' element={<MyPictures />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
