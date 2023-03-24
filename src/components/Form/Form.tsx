import React, {FC, FormEvent, memo, useState} from 'react';
import { Input } from '@mui/material';
import { Button } from './components/Button';
import { addMessageWithReply } from '../../store/chats/slice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChatsState } from '../../store/chats/reducer';
import { AddMessage } from '../../store/chats/types';
import { ThunkDispatch } from 'redux-thunk';

export const Form: FC = memo(() => {
    const [value, setValue] = useState('');
    const { chatId } = useParams();
    const dispatch =
      useDispatch<ThunkDispatch<ChatsState, void, ReturnType<AddMessage>>>();
  
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (chatId && value) {
        dispatch(
          addMessageWithReply({
            chatId,
            message: { author: 'user', text: value },
          })
        );
      }
      setValue('');
    };
  
    return (
      <form onSubmit={handleSubmitForm}>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button disabled={!value} />
      </form>
    );
  });