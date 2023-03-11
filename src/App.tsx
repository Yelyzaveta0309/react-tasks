import React, { FC, useState, useMemo } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './App.scss';
import { ChatList } from './components/ChatList';
import { Header } from './components/Header';
import { Chats } from './pages/Chats';
import { Home } from './pages/Home';
import { nanoid } from 'nanoid';
import { Profile } from './pages/Profile';

export interface Chat {
  id: string;
  name: string;
}

const initialMessage: Messages = {
  default: [
    {
      id: '1',
      author: 'user',
      value: 'Hello geekbrains',
    },
  ],
};


export interface Message{
  id: string;
  author: string;
  value: string;
}

export interface Messages{
  [key: string]:Message[];
}

export const App: FC = () => {
  
  const [messages, setMessages] = useState<Messages>(initialMessage);

  const chatList = useMemo(
    () =>
      Object.entries(messages).map((chat) => ({
        id: nanoid(),
        name: chat[0],
      })),
    [Object.entries(messages).length]
  );

  const onAddChat = (chat: Chat) => {
    if(!messages[chat.name]){
      setMessages({
        ...messages,
        [chat.name]: [],
      });
    }
  };
  
  const onDeleteChat = (chatName: string) =>{
    const newMessages = {...messages};
    delete newMessages[chatName];

    setMessages(
      {
        ...newMessages,
      }
    )
  }

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />

        <Route path="chats">
          <Route
            index
            element={<ChatList chatList={chatList} onAddChat={onAddChat} onDeleteChat={onDeleteChat}/>}
          />
          <Route
            path=":chatId"
            element={
              <Chats
                messages={messages}
                setMessages={setMessages}
                chatList={chatList}
                onAddChat={onAddChat}
                onDeleteChat={onDeleteChat}
              />
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<h2>404</h2>} />
    </Routes>
  </BrowserRouter>
  );
  
};
