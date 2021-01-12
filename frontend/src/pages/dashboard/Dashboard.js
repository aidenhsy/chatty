import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const Dashboard = ({ history }) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const logoutHandler = () => {
    Cookies.remove('session');
    window.location.reload();
  };
  useEffect(() => {
    if (!Cookies.get('session')) {
      history.push('/');
    }
    const fetchReceivers = async () => {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    };
    fetchReceivers();
  }, [history]);

  return (
    <div>
      {user ? <h1>{user.username}'s Dashboard</h1> : null}
      <h2>Chat with:</h2>
      {users
        .filter((u) => u._id !== user._id)
        .map((user) => (
          <Link to={`/chat/${user._id}`} key={user._id}>
            <h3>{user.username}</h3>
          </Link>
        ))}
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
};

export default Dashboard;
