import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { name, password });
      // Handle successful login
      setLoginSuccess(true);
      // Optionally, you can redirect the user or perform any other action here
      console.log(response.data); // Assuming your backend sends back user data and token
    } catch (err) {
      if (err.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {loginSuccess && <div className="success-message">Login successful!</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
// CSS styles
const styles = `
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error-message {
    margin-bottom: 15px;
    color: red;
  }

  .success-message {
    margin-bottom: 15px;
    color: green;
  }

  .register-link {
    margin-top: 20px;
    text-align: center;
  }

  .register-link a {
    color: #007bff;
    text-decoration: none;
  }

  .register-link a:hover {
    text-decoration: underline;
  }
`;

// Inject styles into the document (same as before)
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);