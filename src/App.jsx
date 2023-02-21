import React, { useEffect, useState } from 'react';
import './App.css';
import { Input } from './components/Input';
import { Button } from './components/Button';

export const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessageList([...messageList, { text: message, author: 'Liza' }]);
    setMessage('');
  };

  const handleChange = (ev) => {
    setMessage(ev.target.value);
  };

  useEffect(() => {
    if (messageList.length) {
      console.log('not null');
      if (messageList[messageList.length - 1].author != 'bot') {
        setTimeout(() => {
          setMessageList([...messageList, { text: 'Я бот!', author: 'bot' }]);
        }, 2000);
      }
    }
  }, [messageList]);

  return (
    <>
      <ul className="list">
        {messageList.map((message) => (
          <li key={1}>
            {message.author} : {message.text}
          </li>
        ))}
      </ul>

      <label>Input message</label>
      <Input change={handleChange} value={message} />
      <Button click={handleClick} />
    </>
  );
};
