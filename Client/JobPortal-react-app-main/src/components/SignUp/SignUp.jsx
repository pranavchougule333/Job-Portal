import React, { useState } from 'react';
import "./SignUp.css";
import JobSeekerSignUp from "../JobSeekerSignUp/JobSeekerSignUp"
import RecruiterSignUp from './RecruiterSignUp';

const SignUp = () => {
    const [selectedCategory, setSelectedCategory] = useState("jobseeker");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
     
    };

    return (
        <div className="signup_container">
            <div className="signup_form">
                <h2 className="signup_heading">Sign Up</h2>
                
                    <div className="signup_form-group">
                        <label htmlFor="signup_category">Select Category:</label>
                        <select
                            id="signup_category"
                            name="signup_category"
                            className="signup_select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="jobseeker">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>
                    {selectedCategory === "jobseeker" ? (
                        <JobSeekerSignUp />
                    ) : (
                        <RecruiterSignUp />
                    )}
                
            </div>
        </div>
    );
};

export default SignUp;
