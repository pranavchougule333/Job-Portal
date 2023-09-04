import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import { useCookies } from "react-cookie"
//import "./EditRecruiterProfile.css";

const EditRecruiterProfile = () => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    recruiterBio: "",
    companyName: ""
  });
  const [cookies, setCookies] = useCookies(["userId"]);
  const user =JSON.parse( localStorage.getItem('user'));
  useEffect(() => {
  if (!cookies.userId)
    navigate("/signin?redirect=/EditRecruiterProfile")
}, [cookies.userId, navigate])
  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get(`http://localhost:8080/recruiters/single/recruiter/id/${user.recruiterId}`) // Fetch data for recruiter ID 2
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Make PUT request to update the recruiter's profile
    axios.put(`http://localhost:8080/recruiters/update-profile/${user.recruiterId}`, profileData)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        navigate('/RecruiterProfile'); // Navigate back to the profile page
      })
      .catch(error => {
        alert(JSON.stringify(error.response.data) );
        console.error('Error updating profile:', error);
      });
  };

  const handleBackClick = () => {
    navigate('/RecruiterProfile'); // Navigate back to the profile page
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={handleBackClick}>Back</button>
        <img src="../img/user.png" alt="Recruiter Profile" className="profile-image"/>
        <h1 className="profile-name">{`${profileData.firstName} ${profileData.lastName}`}</h1>
        <p className="profile-company">{profileData.companyName}</p>
      </div>
      <div className="profile-details">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="field-label">First Name:</span>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="field">
            <span className="field-label">Last Name:</span>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="field">
            <span className="field-label">Phone Number:</span>
            <input
              type="text"
              name="phoneNo"
              value={profileData.phoneNo}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="field">
            <span className="field-label">Recruiter Bio:</span>
            <textarea
              name="recruiterBio"
              value={profileData.recruiterBio}
              onChange={handleInputChange}
              className="textarea-field"
            />
          </div>
          <div className="field">
            <span className="field-label">Company Name:</span>
            <input
              type="text"
              name="companyName"
              value={profileData.companyName}
              onChange={handleInputChange}
              className="input-field" readOnly
            />
          </div>
          <div className="submit-button-container">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecruiterProfile;
