import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Cookies from 'js-cookie';

import './Landing.css';

const Landing = ({ history }) => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (Cookies.get('session') && user) {
      history.push('/dashboard');
    }
  }, [history, user]);
  return (
    <div className="landingContainer mt-5">
      <h1>Welcome to Chatty</h1>
      {user ? <h1>{user.username}</h1> : null}
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
};

export default Landing;
