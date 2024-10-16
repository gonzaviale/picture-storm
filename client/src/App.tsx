import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePicture from './pages/CreatePicture';
import './axiosConfig';
import MyPictures from './pages/MyPictures';
import ProtectedRoute from './components/ProtectedRoute';
import MySavedPictures from './pages/MySavedPictures';
import ExternalPictures from './pages/ExternalPictures';

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
        <Route path='/create-picture' element={<CreatePicture />}/>
        <Route path='/my-pictures' element={<MyPictures />}/>
        <Route path='/saved-pictures' element={<MySavedPictures />}/>
        <Route path="/external-pictures" element={<ExternalPictures />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
