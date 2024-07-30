import React from 'react';
import './Home.css';

function Home({currentUser}){
    return(
        <div className='Home'>
            <div className='Home-text'>
                <h1>Jobly</h1>
                <p>All the jobs in one convenient place</p>
                <button>Log in</button>
                <button>Sign up</button>
                <h3>Welcome back, {currentUser}</h3>
            </div>

        </div>
    )
}

export default Home;