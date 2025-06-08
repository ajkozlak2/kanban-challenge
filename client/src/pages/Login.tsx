import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate('/'); // Redirect to the home page or dashboard after login
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password.'); // Set error message
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
          required // Mark as required
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
          required // Mark as required
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default Login;