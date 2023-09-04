import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./RecruiterNavbar.css"
function RecruiterNavbar({ onSignout }) {

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
    <><nav className="navBar">
      <img className="logo" src="../img/Screenshot (70).png" alt="logo" srcset="" />
      <ul className="navList">
        <li className={`navItems ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/">Home</Link></li>
        <li className={`navItems ${location.pathname === '/jobList' ? 'active' : ''}`}>
          <Link to="/jobList">Jobs</Link>
        </li>
        <li className={`navItems ${location.pathname === '/postJob' ? 'active' : ''}`}>
          <Link to="/postJob">Add New Job</Link></li>
        <li className={`navItems ${location.pathname === '/RecruiterJobList' ? 'active' : ''}`}>
          <Link to="/RecruiterJobList">Posted Jobs</Link></li>
        <button className='navItems signout_btn' onClick={signoutHandler}>
          <Link className='navItems signout_btn' to="/">Signout</Link>
        </button>
        <li className={`navItems ${location.pathname === '/RecruiterProfile' ? 'active' : ''}`}>
          <Link to="/RecruiterProfile">RecruiterProfile</Link></li>  {/* profile name*/}
      </ul>
    </nav></>
  )
}
// RecruiterAppList
export default RecruiterNavbar