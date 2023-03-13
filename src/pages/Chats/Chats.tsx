import React, { FC } from 'react';
import { MessageList } from '../../components/MessageList/MessageList';
import { Form } from '../../components/Form/Form';
import { ChatList } from '../../components/ChatList';
import { Navigate, useParams } from 'react-router-dom';
import { WithClasses } from '../../HOC/WithClasses';
import { useSelector, shallowEqual } from 'react-redux';
import { selectChatList, selectChats } from '../../store/chats/selectors';

export const Chats: FC = () => {

  const { chatId } = useParams();
  const MessageListWithClass = WithClasses(MessageList);

  const chats = useSelector(selectChats, shallowEqual);
  const chatList = useSelector(selectChatList, shallowEqual);


  // useEffect(() => {
  //   if (
  //     chatId &&
  //     chats[chatId]?.length > 0 &&
  //     chats[chatId][chats[chatId].length - 1].author !== 'bot'
  //   ) {
  //     const timeout = setTimeout(() => {
  //       setMessages({
  //         ...messages,
  //         [chatId]: [
  //           ...messages[chatId],
  //           {
  //             id: nanoid(),
  //             author: 'bot',
  //             value: 'Im BOT',
  //           },
  //         ],
  //       });
  //     }, 1000);

  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [chatId, messages, setMessages]);


  if (!chatList.find((chat) => chat.name === chatId)) {
    return <Navigate replace to="/chats" />;
  }

  return (
    <>
      <ChatList />
      {/* <MessageList messages={chatId ? messages[chatId] : []} /> */}
      <MessageListWithClass messages={chatId ? chats[chatId] : []}  classes={'classes'}/>
      <Form />
    </>
  );
};
