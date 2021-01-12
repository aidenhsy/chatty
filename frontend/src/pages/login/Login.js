import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import login from '../../utils/login';

import './Login.css';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    setUser(user);
    history.push('/dashboard');
  };
  return (
    <div className="loginContainer mt-5">
      <Link to="/">
        <button>Back to landing page</button>
      </Link>
      <h2>Login page</h2>
      <form onSubmit={submitHandler}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">Click here if you don't have an account</Link>
    </div>
  );
};

export default Login;
