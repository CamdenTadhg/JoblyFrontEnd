import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import Profile from './Profile';
import NavBar from './NavBar';
import Home from './Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes >
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='signup' element={<SignupForm />}/>
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
