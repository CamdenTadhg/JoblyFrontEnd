import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

function Home({currentUser}){
    return(
        <div className='Home'>
            <div className='Home-text'>
                <h1>Jobly</h1>
                <p>All the jobs in one convenient place</p>
                <Link to='/login'><button>Log in</button></Link>
                <Link to='/signup'><button>Sign up</button></Link>
                <h3>Welcome back, {currentUser}</h3>
            </div>

        </div>
    )
}

export default Home;