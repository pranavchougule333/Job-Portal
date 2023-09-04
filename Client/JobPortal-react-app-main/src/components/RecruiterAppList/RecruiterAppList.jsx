import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./RecruiterApplication.css";
import { useParams } from 'react-router-dom'; 

import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie"

import { toast } from 'react-toastify';
const RecruiterAppList = () => {
    const [applications, setApplications] = useState([]);
    const { jobId } = useParams(); // Get the jobId from the URL parameters
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["userId"]);
    const user =JSON.parse( localStorage.getItem('user'));
    
  useEffect(() => {
  if (!cookies.userId)
    navigate(`/signin?redirect=/RecruiterappList/${user.recruiterId}`)
}, [cookies.userId, navigate])

    useEffect(() => {
        // Fetch job applications data from the server
     
        axios.get(`http://localhost:8080/recruiters/JobApplications/${jobId}/${user.recruiterId}`) // Replace with the actua lURL
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error("Error fetching job applications data:", error);
            });
    }, []);

    const handleDownloadResume = (jobSeekerId) => {
        // Fetch the resume file
        axios.get(`http://localhost:8080/jobseeker/get-profile/resume/${jobSeekerId}`, {
            responseType: 'arraybuffer'
        })
        .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url);
        })
        .catch(error => {
            console.error("Error fetching resume file:", error);
            //alert("Resume Not Found!!!");
            toast.error("Resume Not Found!!!")
        });
    };

    const handleAction = (jobSeekerId, jobId, action) => {
        const newStatus = action.toUpperCase();
        
        // Send Axios request to update the status
        axios.put(`http://localhost:8080/recruiters/${user.recruiterId}/jobs/${jobId}/jobSeekers/${jobSeekerId}`, {
            jobStatus: newStatus
        },{
            headers: {
              'Content-Type': 'application/json'
            }})
        .then(response => {
            // Update the applications state
            setApplications(prevApplications => {
                const updatedApplications = prevApplications.map(app =>
                    app.jobSeekerId === jobSeekerId ? { ...app, status: newStatus } : app
                );
                return updatedApplications;
            });
        })
        .catch(error => {
            console.error("Error updating application status:", error);
           // alert("Error updating application status");
            toast.error("Error updating application status")
        });
    };

    return (
        <div>
            <div className="Rapplicationcontainer">
                <h2>Applications List</h2>
                <hr />
                {applications.map((application, index) => (
                    <div className="Rapplication" key={index}>
                        <div className="Rapplication-info">
                            <h3>{application.firstName} {application.lastName}</h3>
                            <p>Applied on: {application.appliedDate}</p>
                            <p>Skills: {application.skills.map(skill => skill.name).join(", ")}</p>
                            <span className={`status-${application.status.toLowerCase()}`}>
                                Status: {application.status}
                            </span>
                        </div>
                        <div className="R_button-box">
                            <button className="Rbutton download" onClick={() => handleDownloadResume(application.jobSeekerId)}>View Resume</button>
                            <button className="Rbutton shortlist" onClick={() => handleAction(application.jobSeekerId, jobId, "ACCEPTED")}>Shortlist</button>
                            <button className="Rbutton reject" onClick={() => handleAction(application.jobSeekerId, jobId, "REJECTED")}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecruiterAppList;
