import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./JobseekerNavbar.css"
function AdminNavbar({ onSignout }) {

  const navigate = useNavigate();

  const location = useLocation();

  const signoutHandler = () => {
    // Clear user data and log out
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");

    // Call the onSignout function passed from App component
    onSignout();

    // Navigate to the sign-in page
    navigate('/signIn');
  }

  return (
    <div>
      <nav className="navBar">
        <img className="logo" src="../img/Screenshot (70).png" alt="logo" />
        <ul className="navList">
          <button className='signout_btn navItems' onClick={signoutHandler}>
            <Link className='signout_btn navItems' to="/">Signout</Link>
          </button>
        </ul>
      </nav>
    </div>
  )
}

export default AdminNavbar