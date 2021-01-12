import axios from 'axios';
import { setSessionCookie } from './sessions';

const login = async (username, password) => {
  try {
    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    });
    setSessionCookie(data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
