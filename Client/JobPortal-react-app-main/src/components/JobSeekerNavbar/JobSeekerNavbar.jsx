import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import "./JobseekerNavbar.css"
function JobSeekerNavbar({ onSignout }) {

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

             <li className={`navItems ${location.pathname === '/' ? 'active' : ''}`}>
                    <Link to="/">Home</Link></li>

               {/* <li className="navItems"><a href="/jobList">Jobs</a></li> */}
               <li className={`navItems ${location.pathname === '/jobList' ? 'active' : ''}`}>
                    <Link to="/jobList">Jobs</Link>
                </li>

                 <li className={`navItems ${location.pathname === '/myJobs' ? 'active' : ''}`}>
                  <Link to="/myJobs">MyJobs</Link>
                  </li>  {/* profile name*/} 

                 <button className='signout_btn navItems' onClick={signoutHandler}>
            <Link className='signout_btn navItems' to="/">Signout</Link>
          </button>
                <li className={`navItems ${location.pathname === '/jobseekerProfile' ? 'active' : ''}`}>
                  <Link to="/jobseekerProfile"><img className='profileImg' src="../img/profile.png" alt="" /></Link></li>
        </ul>
        </nav>
    </div>
  )
}

export default JobSeekerNavbar