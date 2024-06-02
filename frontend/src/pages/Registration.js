
// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', { name, email, password });
      // Handle successful registration, e.g., redirect to login page
      console.log(response.data); // Assuming your backend sends back user data and token
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;