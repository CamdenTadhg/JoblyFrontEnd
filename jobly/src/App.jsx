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
  console.log('rerendering app');
  const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  }
  const [token, setToken] = useLocalStorage('token', '');
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '');
  let profileData;
  JoblyApi.token = token;
  console.log('token is ', token);
  console.log('JoblyApi.token is ', JoblyApi.token);
  console.log('token says ', decodeToken(token))


  const signup = async (data) => {
    const response = await JoblyApi.signup(data);
    if (typeof response === 'string'){
      setToken(response);
    } else {
      console.error(response);
      throw response;
    }
  }

  const login = async (data) => {
    const response = await JoblyApi.login(data);
    if (typeof response === 'string'){
      setToken(response);
    } else {
      throw response;
    }
  }

  const logout = () => {
    JoblyApi.token = '';
    setToken('');
  }

  const editProfile = async (username, userData) => {
    const response = await JoblyApi.editUserDetails(username, userData);
    console.log('response is ', response);
    if (response.username){
      return response;
    } else {
      throw response;
    }
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
                <Route path='/profile' element={<Profile editProfile={editProfile}/>}/>
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
