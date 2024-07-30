import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

function NavBar() {
    return (
        <nav>
            <Navbar className="fixed-top NavBar">
                <NavLink to='/' className='navbar-brand'>Jobly</NavLink>
                <Nav horizontal='center' className='navbar-center'>
                    <NavLink to='/companies' className='nav-item'>Companies</NavLink>
                    <NavLink to='/jobs' className='nav-item'>Jobs</NavLink>
                </Nav>
                <Nav>
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </Nav>
            </Navbar>

        </nav>
    )
}

export default NavBar;