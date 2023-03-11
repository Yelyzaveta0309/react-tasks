import React, {FC, FormEvent, useState} from 'react';
import { Input } from '@mui/material';
import { Button } from './components/Button';

interface FormProps {
    addMessage: (a: string) => void;
}

export const Form: FC<FormProps> = ({addMessage}) => {

    const [value, setValue] = useState('');

    
    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addMessage(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <Input type='text' value={value} onChange={(e) => setValue(e.target.value)}  />
            <Button disabled={!value}/>
        </form>
    );
};