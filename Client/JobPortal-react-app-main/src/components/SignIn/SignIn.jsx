import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie"
import axios from 'axios';
import "./SignIn.css";

import { toast } from 'react-toastify';
const SignIn = () => {
    const [userId, setCookie] = useCookies(["userId"]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/signin/User', formData);

      if (response.status === 200) {
         // Save the response data in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        const user =JSON.parse( localStorage.getItem('user'));

        setCookie("userId", user.userId);

        // alert('Sign in successful ');
         toast.success("Sign in successful!!!")

         
        // Redirect to the /home page
        navigate(redirect || "/")
      } else {
        alert('Signin unsuccessful');
      }
    } catch (error) {
      toast.error("Wrong credentials!!!")
     // alert(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="SignIn_logo">
          <img src="../img/Screenshot (70).png" alt=" Logo" />
        </div>
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2 className="signin_title">Sign in</h2>
          <input
            type="email"
            name="userName"
            placeholder="Email"
            required
            onChange={handleInputChange}
            value={formData.userName}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInputChange}
            value={formData.password}
          />
          <button type="submit">Sign in</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Join now</a></p>
        </div>
      </div>
    </>
  );
};

export default SignIn;