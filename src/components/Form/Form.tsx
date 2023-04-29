import React, {FC, memo, useState} from 'react';
import { Input } from '@mui/material';
import { Button } from './components/Button';
import { useParams } from 'react-router-dom';
import { getMessageListById } from '../../services/firebase';
import { nanoid } from '@reduxjs/toolkit';
import { push } from 'firebase/database';

export const Form: FC = memo(() => {
    const [value, setValue] = useState('');
    const { chatId } = useParams();
  
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (chatId && value) {
        const id = nanoid();
        push(getMessageListById(chatId), {
          author: 'user',
          id, 
          text: value
        });
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