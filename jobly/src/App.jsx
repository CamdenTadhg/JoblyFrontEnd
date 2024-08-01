import React from 'react'
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
  console.log('token = ', token);


  const signup = async (data) => {
    let response = await JoblyApi.signup(data)
    setToken(response)
  }

  const login = async (data = {username: 'camden', password: 'password'}) => {
    setToken(await JoblyApi.login(data));
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
          <Routes >
              <Route path='/' element={<Home />}/>
              <Route path='/login' element={<LoginForm login={login}/>}/>
              <Route path='signup' element={<SignupForm signup={signup} />}/>
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
