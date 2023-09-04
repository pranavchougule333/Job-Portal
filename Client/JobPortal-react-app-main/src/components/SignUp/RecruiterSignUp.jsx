import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

import { validateFormHr } from "../../utils/jobseekerSignUpValidation";

const RecruiterSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    companyName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      let isValid = true;

      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      }
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
        isValid = false;
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
        isValid = false;
      }

      setErrors(newErrors);
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormValid(true); // Show errors after clicking "Sign Up"

    let isValid = true;
    let newErrors = {};
    let errorObject = validateFormHr({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password
    });
    isValid = errorObject.isValid;
    newErrors = errorObject.newErrors;

    setErrors(newErrors);
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/signup/newRegistration",
          {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNo: formData.phoneNumber,
            recruiterBio: formData.bio,
            companyName: formData.companyName,
            password: formData.password,
            role: "ROLE_RECRUITER",
          }
        );

        if (response.status === 200) {
         navigate("/signin");
          toast.success("Register successfully")
        }
      } catch (error) {

        toast.error(error.response.data)
      }
    }else {
     const erroKeys = ["firstName", "lastName", "password","email"]; 
     for (const key of erroKeys) {
        if (errorObject.newErrors.hasOwnProperty(key)) {
          toast.error(` ${errorObject.newErrors[key]}`);
          break; 
        }
  }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="signup_form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} required className="signup_input" onChange={handleInputChange} />
          {isFormValid && errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div className="signup_form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} required className="signup_input" onChange={handleInputChange} />
          {isFormValid && errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        <div className="signup_form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} className="signup_input" onChange={handleInputChange} />
          {isFormValid && errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="signup_form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required className="signup_input" onChange={handleInputChange} />
        </div>
        <div className="signup_form-group signup_bio-group bioBox">
          <label htmlFor="bio">Bio:</label>
          <input type="text" id="bio" name="bio" className="signup_input" onChange={handleInputChange} />
        </div>
        <div className="signup_form-group signup_bio-group bioBox">
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" id="companyName" name="companyName" className="signup_input" onChange={handleInputChange} />
        </div>
        <div className="signup_form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" className="signup_input" onChange={handleInputChange} />
        </div>
        <button type="submit" className="signup_button">
          Sign Up
        </button>
      </form>
      {isFormValid && <div className="error"></div>}
    </div>
  );
};

export default RecruiterSignUp;