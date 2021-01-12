import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Messages from '../../components/Messages/Messages';
import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';

import './Chat.css';

const Chat = ({ match }) => {
  const [name, setName] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users/${match.params.id}`);
      setReceiver(data);
    };
    fetchUser();
  }, [match]);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar username={receiver.username} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
