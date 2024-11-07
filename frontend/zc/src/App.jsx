import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import MyEventsPage from './pages/MyEventsPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/Aboutus';
import EditProfilePage from './pages/EditProfilePage';
import './App.css';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState( localStorage.getItem('isLoggedIn') || false);

  useEffect(() => {
    // Check if user is signed up or logged in
    // You might use local storage or context for managing authentication state
    const signedUp = localStorage.getItem('isSignedUp') === 'true';
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsSignedUp(signedUp);
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={ <Home/>}/>
        <Route path='/myevents' element={<MyEventsPage/>}/>
        <Route path='/myprofile' element={<ProfilePage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path="/edit-profile" element={<EditProfilePage/>}/>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
