import React, { useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post('/api/messages', {
        sender: '5ffadc2710d93b21a812c33b',
        receiver: '5ffadc1510d93b21a812c339',
      });
      console.log(data);
    };
    fetchData();
  }, []);
  return <div>Test</div>;
};

export default Test;
