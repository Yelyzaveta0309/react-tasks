import React, {FC} from 'react';

export interface Message {
    id: string;
    author: string;
    value: string;
}

interface MessageProps{
    message: Message;
}

export const MessageItem: FC<MessageProps> = ({message}) =>(
    <li>
        {message.author}: {message.value}
    </li>
);