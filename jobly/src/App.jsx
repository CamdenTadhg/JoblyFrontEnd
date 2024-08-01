import React, {useState, useEffect} from 'react'
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
import {decodeToken} from 'react-jwt';
import UserContext from './userContext';

function App() {
  console.log('rerendering App')
  const [token, setToken] = useLocalStorage('token', '');
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '');
  console.log('token = ', token);
  console.log('currentUser = ', currentUser);


  const signup = async (data) => {
    await setToken(await JoblyApi.signup(data));
  }

  const login = async (data = {username: 'camden', password: 'password'}) => {
    await setToken(await JoblyApi.login(data));
  }

  const logout = () => {
    console.log('starting logout function');
    JoblyApi.token = '';
    setToken('');
  }

  useEffect(() => {
    const decoded = decodeToken(token);
    if (decoded){
      setCurrentUser(decoded.username);
    }
    else {
      setCurrentUser('');
    }
  }, [token]);

  return (
    <div className='App'>
      <BrowserRouter>
        <UserContext.Provider value={currentUser}>
          <NavBar logout={logout}/>
            <Routes >
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<LoginForm login={login}/>}/>
                <Route path='signup' element={<SignupForm signup={signup} />}/>
                <Route path='/companies' element={<CompanyList />}/>
                <Route path='/companies/:handle' element={<CompanyDetail />}/>
                <Route path='/jobs' element={<JobList/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
