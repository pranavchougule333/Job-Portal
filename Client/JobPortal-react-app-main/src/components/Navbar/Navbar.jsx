import React from 'react';
import "./Navbar.css";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <><nav className="navBar">
            <img className="logo" src="../img/Screenshot (70).png" alt="logo" />
            <ul className="navList">
                <li className={`navItems ${location.pathname === '/' ? 'active' : ''}`}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`navItems ${location.pathname === '/jobList' ? 'active' : ''}`}>
                    <Link to="/jobList">Jobs</Link>
                </li>
                <li className={`navItems ${location.pathname === '/signup' ? 'active' : ''}`}>
                    <Link to="/signup">Register</Link>
                </li>
                <li className={`navItems ${location.pathname === '/signin' ? 'active' : ''}`}>
                    <Link className='navItems signout_btn' to="/signin">Login</Link>
                </li>
            </ul>
        </nav></>
    )
}

export default Navbar;
