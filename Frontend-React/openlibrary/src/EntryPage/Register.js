import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [register, setregister] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const { firstname, lastname, email, mobile, dob, password } = register;

  const onInputChange = (e) => {
    setregister({ ...register, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
  
    setEmailError('');
    return true;
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
  
    if (!phoneRegex.test(phoneNumber)) {
      setMobileError('Please enter a valid 10-digit phone number');
      return false;
    }
  
    setMobileError('');
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
  
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least one letter, one number, one symbol, and have a length of 8 to 15 characters'
      );
      return false;
    }
  
    setPasswordError('');
    return true;
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePhoneNumber(mobile) || !validatePassword(password)) {
      return;
    }

    fetch('http://localhost:8080/register/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(register),
    })
      .then(() => {
        alert('Account is created successfully. Now Login to your Account');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating account:', error);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={(e) => onSubmit(e)}>
        <h2>Create Account for Bookopia</h2>
        <div className="icon" />

        <div className="form-group">
          <label htmlFor="firstname">
            <strong>First Name:</strong>
          </label>
          <input
            type="text"
            placeholder="Enter your FirstName"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">
            <strong>Last Name:</strong>
          </label>
          <input
            type="text"
            placeholder="Enter your LastName"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <strong>Email Address:</strong>
          </label>
          <input
            type="email"
            placeholder="Enter your Email Address (UserName)"
            id="email"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            required
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneno">
            <strong>Phone Number:</strong>
          </label>
          <input
            type="tel"
            placeholder="Enter your Mobile Number"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => onInputChange(e)}
            required
          />
          {mobileError && <div className="error">{mobileError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">
            <strong>Date of Birth:</strong>
          </label>
          <input
            type="date"
            placeholder="Enter your Date Of Birth"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>Password:</strong>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create New Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
            required
          />
          <div id="password-btn" onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'} Password
          </div>
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div>
          <label htmlFor="checkbox" id="agree">
            <input id="checkbox" type="checkbox" />
            Agree to our terms and conditions
          </label>
        </div>
        <button type="submit" id="create-account-btn">
          <strong>Create Account</strong>
        </button>
        <Link to="/">
          <button id="login-btn">Login</button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
