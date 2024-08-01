import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import Profile from './Profile';
import NavBar from './NavBar';
import Home from './Home';
import './App.css'
import JoblyApi from './JoblyApi';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [token, setToken] = useLocalStorage('token', '');

  const signUp = async (data) => {
    token = await JoblyApi.signup(data);
    setToken(token);
  }

  const logIn = async (data) => {
    token = await JoblyApi.login(data);
    setToken(token);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
          <Routes >
              <Route path='/' element={<Home />}/>
              <Route path='/login' element={<LoginForm logIn={logIn}/>}/>
              <Route path='signup' element={<SignupForm signUp={signUp}/>}/>
              <Route path='/companies' element={<CompanyList />}/>
              <Route path='/companies/:handle' element={<CompanyDetail />}/>
              <Route path='/jobs' element={<JobList/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
