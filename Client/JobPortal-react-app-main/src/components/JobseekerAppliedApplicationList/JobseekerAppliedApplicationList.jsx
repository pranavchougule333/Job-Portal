import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobseekerAppliedApplicationList.css"; // Import your CSS file for styling
import { toast } from "react-toastify";

const JobseekerAppliedApplicationList = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  

  useEffect(() => {
    fetchAppliedJobs(selectedStatus);
  }, []);

  const fetchAppliedJobs = async () => {
    let jobSeekerId = null; // Get it from local storage or user context
    const user = JSON.parse(localStorage.getItem('user'));
    if(user != null ) {
      jobSeekerId = user.jobSeekerId;
    }
    try {
      let url = `http://localhost:8080/jobseeker/get/applied/${jobSeekerId}`;
      const response = await axios.get(url);
      setAppliedJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error fetching applied-jobs:", error);
    }
  };

  const fetchFilteredJobs = async (status) => {
    let jobSeekerId = null; 
    const user = JSON.parse(localStorage.getItem('user'));
    if(user != null ) {
      jobSeekerId = user.jobSeekerId;
    } 
    try {
      let url = `http://localhost:8080/jobseeker/get/${status}/${jobSeekerId}`;
      const response = await axios.get(url);
      setAppliedJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error fetching applied-jobs:", error);
    }
  };

  const withdrawApplication =  (jobId,status) => {
        if(status==="ACCEPTED" || status==="REJECTED")
        {
          toast.warning("Already Accepted or Rejected Applications can't be Withdrawn");
          return
        }
    let jobSeekerId = null; // Get it from local storage or user context
    const user = JSON.parse(localStorage.getItem('user'));
    if(user != null ) {
      jobSeekerId = user.jobSeekerId;
    }
    try {
     axios.delete(
        `http://localhost:8080/jobseeker/withdraw-application/${jobId}/${jobSeekerId}`
      ).then((response)=>{
        toast.warning(response.data);
        fetchAppliedJobs(selectedStatus); 
      })
 
     
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  return (
    <div className="jobseekerAppliedApplicationList applied-jobs-container ">
      <h2 className="applied-jobs-header">Your Applied Jobs</h2>
      <div className="status-buttons">
        <button onClick={() => { 
            setSelectedStatus("accepted")
            fetchFilteredJobs("accepted");
        }    
            }>Accepted</button>
        <button onClick={() => {
            setSelectedStatus("rejected")
            fetchFilteredJobs("rejected");
            }}>Rejected</button>
        <button onClick={() => {
            setSelectedStatus("pending")
            fetchFilteredJobs("pending");
            }}>Pending</button>
        <button onClick={() => {
            fetchAppliedJobs()
            }}>All jobs</button>    
      </div>
      {filteredJobs.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        filteredJobs.map((job) => (
         
          <div className="applied-job" key={job?.jobId}>
            <h3>{job?.jobTitle}</h3>
            <div className="jobseekerAppliedApplicationList-container">
            <div className="jobseekerAppliedApplicationList-row">
            <p>Company: {job?.companyName}</p>
            <p>Salary: {job?.salary}/year</p>
            <p>Position: {job?.jobType}</p>
            </div>
            <div className="jobseekerAppliedApplicationList-row">
            <p>Posted: {job.postedDate}</p>
            <p>Status: {job?.status}</p>
            </div>
            </div>
            
             { (job.status === "ACCEPTED" || job.status === "REJECTED" ) ?  null :   <button
                className="withdraw-button"
                onClick={() => withdrawApplication(job?.jobId,job.status)}
                // disabled={job?.status === "ACCEPTED" || job?.status === "REJECTED"} 
              >
                Withdrawn Application
              </button>}
            
          </div>
        ))
      )}
    </div>
  );
};

export default JobseekerAppliedApplicationList;
