import React, { useContext } from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';
import { UserContext } from '../../../contexts/UserContext';

const Message = ({ message: { message, sender } }) => {
  const { user } = useContext(UserContext);
  let isSentByCurrentUser = false;

  if (sender._id === user._id) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
      </div>
    </div>
  );
};

export default Message;
