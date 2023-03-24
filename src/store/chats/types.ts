import { Dispatch } from "redux";
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT } from "./actions";

export type ChatsActions = ReturnType<AddChat> | ReturnType<DeleteChat> | ReturnType<AddMessage>;

// export interface Chat {
//     id: string;
//     name: string;
// }


export type Message = {
    text: string,
    author: string
}

export type MessageState = Message & {
    id:string;
}

export type AddChat = (chatName: string) => {
    type: typeof ADD_CHAT;
    chatName: string
}


export type DeleteChat = (chatId: string) => {
    type: typeof DELETE_CHAT;
    chatId: string;
}

export type AddMessage = (chatId: string, message: Message) => {
    type: typeof ADD_MESSAGE;
    chatId: string;
    message: Message;
}

// export type addMessageWithReply = 
// (chatId: string, message: Message) => 
// (dispatch: Dispatch): void;
