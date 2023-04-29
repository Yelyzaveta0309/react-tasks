import React, { FC, useEffect  } from 'react';
import { MessageList } from '../../components/MessageList/MessageList';
import { Form } from '../../components/Form/Form';
import { ChatList } from '../../components/ChatList';
import { Navigate, useParams } from 'react-router-dom';
import { WithClasses } from '../../HOC/WithClasses';
import { useSelector } from 'react-redux';
import { selectChat, selectChats } from '../../store/chats/selectors';
import { StoreState } from '../../store';
import { onValue, push } from 'firebase/database';
import { getChatsById, getMessageListById } from '../../services/firebase';
import { nanoid } from '@reduxjs/toolkit';

export const Chats: FC = () => {

  const { chatId } = useParams();
  const MessageListWithClass = WithClasses(MessageList);

  const messages = useSelector((state:StoreState)=>
    selectChat(state, chatId || '')
  );

  const chats = useSelector(selectChats);

  if (chatId && !chats[chatId]) {
    return <Navigate replace to="/chats" />;
  }

  useEffect(()=>{
    if(chatId){
      onValue(getChatsById(chatId), (snapshot) => {
        const chat = snapshot.val();
        const lastMessage: any = Object.entries(chat.messageList)[
          Object.entries(chat.messageList).length - 2
        ][1];

        if(lastMessage.author !== 'bot'){
          push(getMessageListById(chatId), {
            author: 'bot',
            id: nanoid(),
            text: 'Im bot'
          });
        }
      });
    }
  }, []);

  return (
    <>
      <ChatList />
      <MessageListWithClass messages={chatId ? messages : []}  classes={'classes'}/>
      <Form />
    </>
  );
};
