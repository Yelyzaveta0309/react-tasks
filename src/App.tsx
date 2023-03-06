import React, { FC, useState, useCallback , useEffect} from 'react';
import { nanoid } from 'nanoid';
import './App.scss';

import { Form } from './components/Form/Form';
import { MessageList } from './components/MessageList/MessageList';
import { ChatList } from './components/ChatList';


interface Message{
  id: string;
  author: string;
  value: string;
}

export const App: FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    if (messages.length) {
      if (messages[messages.length - 1].author != 'bot') {
        setTimeout(() => {
          setMessages([...messages, { id: nanoid(), value: 'Я бот!', author: 'bot' }]);
        }, 2000);
      }
    }
  }, [messages]);

  const addMessage = useCallback((value: string) => {
    setMessages((prevMessage) => [
      ...prevMessage,
      {
        id: nanoid(),
        author: 'user',
        value,
      },
    ]);
  }, []);

  return (
    <>
      <div className='view'>
        <ChatList />
        <MessageList messages={messages} />
        <Form addMessage={addMessage}/>
      </div>
    </>
  );
};
