import React, { useState, useEffect } from 'react';
import './JobSeekersSignUp.css';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../../utils/jobseekerSignUpValidation';
import axios from "axios";
import { toast } from 'react-toastify';

function JobSeekerSignUp() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        yearOfExperience: 0,
        password:''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const validateForm = () => {
            const newErrors = {};
            let isValid = true;

            if (!formData.email) {
                newErrors.email = 'Email is required';
                isValid = false;
            }
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
                isValid = false;
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
                isValid = false;
            }
            if (!formData?.yearOfExperience) {
                newErrors.yearOfExperience = 'yearOfExperience is Required';
                isValid = false;
            }
            if (!formData?.password) {
                newErrors.password = 'password is Required';
                isValid = false;
            }
            
            setErrors(newErrors);
            setIsFormValid(isValid);
        };

        validateForm();
    }, [formData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.trim(),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsFormValid(true); // Show errors after clicking "Sign Up"
    
        let isValid = true;
        let newErrors = {};
        let errorObject = validateForm(formData);
        isValid = errorObject.isValid;
        newErrors = errorObject.newErrors;

        setErrors(newErrors);
    
        if (isValid) {
            
            submitProfile()
            navigate('/signin');
        }
    };

    const submitProfile = async ()=> {

        try {
            const response = await axios.post(
                `http://localhost:8080/signup/jobseeker/newRegistration`,
                formData
                );
                toast.success('Registrated successfully!');
                console.log(response); 
            }catch(error) {
                toast.error(error.response.data)
            }
            
    }
    

    return (
        <div className="jobSeekerSignUp-container">
            <h2>Job Seeker Sign Up</h2>
            <form className="jobSeekerSignUp-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                    />
                    {isFormValid && errors?.email && <span className="error-message">{errors?.email}</span>}
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData?.firstName}
                        onChange={handleInputChange}
                    />
                    {isFormValid && errors?.firstName && <span className="error-message">{errors?.firstName}</span>}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData?.lastName}
                        onChange={handleInputChange}
                    />
                    {isFormValid && errors?.lastName && <span className="error-message">{errors?.lastName}</span>}
                </div>
                <div>
                    <label>Year of Experience:</label>
                    <input
                        type="number"
                        name="yearOfExperience"
                        value={formData?.yearOfExperience}
                        onChange={handleInputChange}
                    />
                    {isFormValid && errors?.yearOfExperience && <span className="error-message">{errors?.yearOfExperience}</span>}
               
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData?.password}
                        onChange={handleInputChange}
                    />
                    {isFormValid && errors?.password && <span className="error-message">{errors?.password}</span>}
               
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default JobSeekerSignUp;
