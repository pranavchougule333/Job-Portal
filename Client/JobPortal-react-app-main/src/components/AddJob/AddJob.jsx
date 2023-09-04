import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddJob.css";
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
const AddJob = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [deadlineDate, setDeadlineDate] = useState("");
    const [noOfJobPositions, setNoOfJobPositions] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("PART_TIME");
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedSkillsList, setSelectedSkillsList] = useState([]);
    const [recruiterId, setRecruiterId] = useState(""); // To store recruiterId
    const [cookies, setCookies] = useCookies(["userId"]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
     const [jobTitleError, setjobTitleError] = useState( {
        jobTitle: null,
        salary: null,
        noOfJobPositions: null,
        deadlineDate: null,
        jobDescription: null,
     }); 
    useEffect(() => {

        
        if (!cookies.userId)
          navigate("/signin?redirect=/RecruiterProfile")
        }, [cookies.userId, navigate]);
        
    useEffect(() => {
        // Fetch skills from the server
        axios.get("http://localhost:8080/skill/get/all/skills")
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error("Error fetching skills:", error);
            });

        // Retrieve recruiterId from localStorage
        const user =JSON.parse( localStorage.getItem('user'));
        const storedRecruiterId = localStorage.getItem(user.recruiterId);
        setRecruiterId(storedRecruiterId);
    }, []);

    const handleSkillChange = (event) => {
        const selectedOptions = event.target.options;
        const selectedSkillsArray = [];

        for (let option of selectedOptions) {
            if (option.selected) {
                selectedSkillsArray.push(option.value);
            }
        }

        setSelectedSkills(selectedSkillsArray);
    };

    const handleAddSkill = () => {
        setSelectedSkillsList(prevSelectedSkillsList => [
            ...prevSelectedSkillsList,
            ...selectedSkills
        ]);
        setSelectedSkills([]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedSkillIds = selectedSkillsList.map(skillName => {
            const skill = skills.find(skill => skill.name === skillName);
            return skill ? skill.skillId : null;
        }).filter(id => id !== null);
        
        const user =JSON.parse( localStorage.getItem('user'));
        const jobData = {
            recruiterId: user.recruiterId,
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            deadLineDate: deadlineDate,
            noOfJobPositions: parseInt(noOfJobPositions),
            salary: parseInt(salary),
            jobType: jobType,
            skillIds: selectedSkillIds
        };

        // Submit job data to the server
        axios.post("http://localhost:8080/recruiters/postJob", jobData)
            .then(response => {
                
              //  console.log("Job data submitted successfully:", response.data);
                //alert("Job data submitted successfully");
                toast.success("Job data submitted successfully")
                // Clear form fields
                setJobTitle("");
                setJobDescription("");
                setDeadlineDate("");
                setNoOfJobPositions("");
                setSalary("");
                setJobType("PART_TIME");
                setSelectedSkills([]);
                setSelectedSkillsList([]);
            })
            .catch(error => {
                // alert(JSON.stringify(error.response.data));
                console.log("Error submitting job data:", error.response.data);
                // setjobTitleError(error.response.data.jobTitle);
                for (const key in jobTitleError) {
                    if (error.response.data.hasOwnProperty(key)) {
                        jobTitleError[key] = error.response.data[key];
                    }
                }

                let flag = true;
                for (const key in jobTitleError) {
                    if (jobTitleError[key] !== null ) {
                       // alert(jobTitleError[key]);
                        toast.error(jobTitleError[key])
                        flag = false;
                        break;
                    }
                }

                
                if(!flag) {
                    for (const key in jobTitleError) {
                        jobTitleError[key] = null;
                    }
                }
            });
    };
    const handleRemoveSkill = (skillToRemove) => {
        setSelectedSkillsList(prevSelectedSkillsList =>
            prevSelectedSkillsList.filter(skill => skill !== skillToRemove)
        );
    };
    return (
        <div>
            <div className="AddJobcontainer">
                <h1>Add Job</h1>
                <form id="jobForm" onSubmit={handleSubmit}>
                    <label htmlFor="jobTitle">Job Title:</label>
                    <input type="text" id="jobTitle" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />

                    <label htmlFor="jobDescription">Job Description:</label>
                    <textarea className='jobDescription' id="jobDescription" name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />

                    <label htmlFor="deadlineDate">Deadline Date:</label>
                    <input type="date" id="deadlineDate" name="deadlineDate" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} required />

                    <label htmlFor="noOfJobPositions">Number of Job Positions:</label>
                    <input type="number" id="noOfJobPositions" name="noOfJobPositions" value={noOfJobPositions} onChange={(e) => setNoOfJobPositions(e.target.value)} required />

                    <label htmlFor="salary">Salary:</label>
                    <input type="number" id="salary" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />

                    <label htmlFor="jobType">Job Type:</label>
                    <select id="jobType" name="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="PART_TIME">Part Time</option>
                        <option value="FULL_TIME">Full Time</option>
                    </select>
<br /><br />
                    <label className='skillTag' htmlFor="skills">Skills:</label><br />
                    <select className='multiskills' multiple id="skills" name="skills" value={selectedSkills} onChange={handleSkillChange}>
                        {skills.map(skill => (
                            <option key={skill.skillId} value={skill.name}>{skill.name}</option>
                        ))}
                    </select>

                    <button type="button" onClick={handleAddSkill} className="addskillbtn">Add Skill</button>

                    <div className='listedSkills'>
                    <p>Selected Skills:</p>
                    <ul>
                        {selectedSkillsList.map(skill => (
                            <li key={skill}>
                                <span className="selected-skill">
                                    {skill}
                                    <span className="remove-skill" onClick={() => handleRemoveSkill(skill)}>
                                        &#8722;
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                    <button className='addJobSumitBtn' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddJob;
