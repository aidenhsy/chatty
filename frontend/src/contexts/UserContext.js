import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (Cookies.get('session')) {
      const token = Cookies.get('session');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const fetchUser = async () => {
        const { data } = await axios.get('/api/users/profile', config);
        setUser(data);
      };
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
