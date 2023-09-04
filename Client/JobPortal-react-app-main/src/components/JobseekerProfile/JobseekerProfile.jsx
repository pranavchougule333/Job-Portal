import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./JobseekerProfile.css"

function JobseekerProfile() {

    const [profile, setProfile] = useState({});
    const [id, setId] = useState(1);
    const navigate = useNavigate();
    const dynamicHref = `http://localhost:8080/jobseeker/get-profile/resume/${id}`

      useEffect(() => {
          fetchProfile();
      }, []);


      const fetchProfile = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            let jobseekerId = 1;  // tesing only
            
            if(user != null ) {
               jobseekerId = user.jobSeekerId;
               setId(jobseekerId);
            }else {
                jobseekerId = null;
                alert("profile not found")
            }

            // http://localhost:8080/jobseeker/get-profile/{jobseekerId}
            if(jobseekerId != null) {
                const response = await axios.get(`http://localhost:8080/jobseeker/get-profile/${jobseekerId}`);
                console.log(response.status);
                setProfile(response.data);
            }
        } catch (error) {
            // if profile not found
            setProfile(null);
        }
    };

    const getResume = async() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            let jobseekerId = 1;  // tesing only
            
            if(user != null ) {
               jobseekerId = user.jobSeekerId;
            }else {
                jobseekerId = null;
                alert("profile not found")
            }

            // http://localhost:8080/jobseeker/get-profile/{jobseekerId}
            if(jobseekerId != null) {
                const response = await axios.get(`http://localhost:8080/jobseeker/get-profile/resume/${jobseekerId}`);
                console.log(response.status);
                setProfile(response.data);
            }
        } catch (error) {
            // if profile not found
            alert("something went wrond");
        }
    }

    const removeProfile = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            let jobseekerId = 1; // tesing only

            if (user != null) {
                jobseekerId = user.jobSeekerId;
            } else {
                jobseekerId = null;
                alert('Profile not found');
            }

            if (jobseekerId != null) {
                // await axios.delete(`http://localhost:8080/jobseeker/remove-profile/${jobseekerId}`);
                alert('Profile removed successfully');
                // Redirect logic here
                navigate('/signup');
            }
        } catch (error) {
            console.error('Error removing profile:', error);
        }
    };


    if(profile == null) {
        return (
            <div>
                <h1>please try reloading</h1>
                <h1>check the id of the job Seeker</h1>
            </div>
        )
    }
    
      return (
        <div className='jobseekerProfile'>
             <button className='edit-button' onClick={() => navigate('/jobseekerUpdateProfile')}>
        Edit
      </button>
            <h1 className='jobseekerProfile-header'>Job Seeker Profile</h1>
            <div className='jobseekerProfile-header-img-holder'>
            <img src="../img/user.png" alt="jobseeker Profile" className="profile-image"/>
            </div>

            <div className='jobseekerProfile-profile-information'>
                <h2 className='jobseekerProfile-profile-section-header'>Personal Information</h2>
                <p><strong>Name:</strong> {profile?.firstName} {profile?.lastName}</p>
                <p><strong>Email:</strong> {profile?.email}</p>
                <p><strong>Years of Experience:</strong> {profile?.yearOfExperience}</p>
            </div>
            <div className='jobseekerProfile-profile-information'>
                <h2 className='jobseekerProfile-profile-section-header'>Education</h2>
                <ul>
                    {profile?.eduInfo?.map((edu, index) => (
                        <li key={index}>
                            <strong>{edu?.qualification}:</strong> {edu?.institute}, {edu?.completionDate}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='jobseekerProfile-profile-information'>
                <h2 className='jobseekerProfile-profile-section-header'>Skills</h2>
                <ul>
                    {profile?.skills?.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                    ))}
                </ul>
            </div>

            <button className='jobseeker-profile-get-resume' onClick={getResume}>
                <a href={dynamicHref} target='_blank' >
                Get Resume
                </a>

            </button>
            <button className="removeProfile-button" onClick={removeProfile}>
                Remove Profile
            </button>
        </div>
    );
    
}

export default JobseekerProfile