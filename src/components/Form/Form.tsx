import React, {FC, FormEvent, memo, useState} from 'react';
import { Input } from '@mui/material';
import { Button } from './components/Button';
import { addMessage } from '../../store/chats/actions';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const Form: FC = memo(() => {

    const [value, setValue] = useState('');
    const { chatId } = useParams();

    const dispatch = useDispatch();
    
    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(chatId){
            dispatch(addMessage(chatId, value));
        }
        setValue('');
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <Input type='text' value={value} onChange={(e) => setValue(e.target.value)}  />
            <Button disabled={!value}/>
        </form>
    );
});