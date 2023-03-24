import { AddChat, AddMessage, DeleteChat, Message } from "./types";

export const ADD_CHAT = 'CHATS::ADD_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';
export const ADD_MESSAGE = 'CHATS::ADD_MESSAGE';

export const addChat: AddChat = (chatName) => ({
    type: ADD_CHAT,
    chatName,
});

export const deleteChat: DeleteChat = (chatId) => ({
    type: DELETE_CHAT,
    chatId,
});

export const addMessage: AddMessage = (chatId, message) => ({
    type: ADD_MESSAGE,
    chatId,
    message
});
let timeout: NodeJS.Timeout;

export const addMessageWithReply = 
    (chatId: any, message: Message): any => (dispatch: any)=>{
        dispatch(addMessage(chatId, message));

        if(message.author !== 'bot'){
            if(timeout){
                clearTimeout(timeout);
            }

            timeout = setTimeout(()=>{
                dispatch(addMessage(chatId,{
                    text: 'I`m bot',
                    author: 'bot'
                }))
            }, 1000)
        }
}