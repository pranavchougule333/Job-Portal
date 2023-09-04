import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobList.css";
import SearchBar from "../SearchBar/SearchBar";
import searchFunction from "../../utils/searchFunction";
import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

const JobList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchText = queryParams.get('search') || '';

  const [listOfJobs, setListOfJobs] = useState([
    {
      jobId: 5,
      companyName: "",
      jobTitle: "Network Engineer",
      jobDescription:
        "Responsible for designing and managing network infrastructure.",
      postedDate: "2023-06-25",
      deadLineDate: "2023-07-25",
      noOfJobPositions: 3,
      salary: 95000,
      jobType: "FULL_TIME",
      recruiterName: "Jane",
      skillsForJob: [
        {
          skillId: 1,
          name: "Java",
          description: "Programming in Java",
        },
        {
          skillId: 2,
          name: "HTML/CSS",
          description: "Web Development",
        },
        {
          skillId: 5,
          name: "Android",
          description: "Mobile App Development",
        },
      ],
      skillsForJob_strings: [],
    },
  ]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    console.log(searchText);
    if (searchText?.length > 0) {
      handleSearch({ filterType: "text", filterValue: searchText });
    } else {
      fetchJobs();
    }
  }, []);


  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/jobseeker/get/all"
      );
      setListOfJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobseeker/get/all:", error);
    }
  };

  const applyForJob =  (jobId) => {
    let jobSeekerId = null; // Get it from local storage or user context
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      jobSeekerId = user.jobSeekerId;
    }
    // alert(jobSeekerId + " " + jobId)
    try {
       axios.get(
        `http://localhost:8080/jobseeker/apply/${jobId}/${jobSeekerId}`
      )
      .then((response)=> {
        toast.success(response.data);
      })
    } catch (error) {
      console.error("Error fetching jobseeker/apply/jobId/jobSeekerId", error);
    }

  };

  const handleSearch = async (filters) => {
    console.log("inside func");
    if (filters === null || filters === undefined) {
      await fetchJobs();
      return;
    }
    let filteredData = await searchFunction(
      filters.filterType,
      filters.filterValue
    );

    if (filteredData === undefined || filteredData === null) {
      setFilteredJobs([]);
    } else {
      setFilteredJobs(filteredData);
    }
  };
  let userRole = null; // or 'recruiter' ROLE_JOBSEEKER , ROLE_RECRUITER
  const user = JSON.parse(localStorage.getItem("user"));
  if (user != null) {
    userRole = user.role;
  }

  return (
    <div>
      <div className="jobList-container">
        <SearchBar onSearch={handleSearch} />
        <h2 className="jobList-container header">All Jobs</h2>

        {filteredJobs?.length === 0 && (
          <div className="no-jobs-container">
            <h1>There are no jobs for searched type</h1>
            <button
              className="show-all-button"
              onClick={() => handleSearch(null)}
            >
              Show All Jobs
            </button>
          </div>
        )}
        {filteredJobs?.map((job) => (
          <div className="jobList-job" key={job?.jobId}>
            <h3>{job?.jobTitle}</h3>
            <div className="jobList-job-info">
              <p>Company: {job?.companyName}</p>
              <p className="jobList-salary">Salary: {job?.salary}/year</p>
            </div>
            <div className="jobList-job-info">
              <p>Position: {job?.jobType}</p>

              <p className="jobList-date">Posted: {job.postedDate}</p>
            </div>
            <p>{job?.skillsForJob.map((skill) => skill?.name).join(", ")}</p>

            {userRole !== null &&
              (userRole === "ROLE_JOBSEEKER" ? (
                <button
                  className="jobList-apply-btn"
                  onClick={() => applyForJob(job?.jobId)}
                >
                  Apply
                </button>
              ) : null)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
