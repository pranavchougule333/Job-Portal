import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import "./RecruiterProfile.css";

import { useCookies } from "react-cookie"
const RecruiterProfile = () => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userId"]);

useEffect(() => {
if (!cookies.userId)
  navigate("/signin?redirect=/RecruiterProfile")
}, [cookies.userId, navigate])

  const [profileData, setProfileData] = useState({
    recruiterId: 0,
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    recruiterBio: "",
    companyName: ""
  });
  const user =JSON.parse( localStorage.getItem('user'));
  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get(`http://localhost:8080/recruiters/single/recruiter/id/${user.recruiterId}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEditClick = () => {
    navigate('/editRecruiterProfile'); // Navigate to the 'editRecruiterProfile' route
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
        <img src="../img/user.png" alt="Recruiter Profile" className="profile-image"/>
        <h1 className="profile-name">{`${profileData.firstName} ${profileData.lastName}`}</h1>
        <p className="profile-company">{profileData.companyName}</p>
      </div>
      <div className="profile-details">
        <div className="field">
          <span className="field-label">Email:</span>
          <p className="field-value">{profileData.email}</p>
        </div>
        <div className="field">
          <span className="field-label">Phone Number:</span>
          <p className="field-value">{profileData.phoneNo}</p>
        </div>
        <div className="field">
          <span className="field-label">Recruiter Bio:</span>
          <p className="field-value">{profileData.recruiterBio}</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
