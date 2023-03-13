import { Reducer } from "redux";
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT } from "./actions";
import { ChatsActions } from "./types";
import { nanoid } from "nanoid";

export interface Message {
    id: string;
    author: string;
    value: string;
}

export interface ChatsState{
    [key: string]: Message[];

}
const initalState: ChatsState = {
    gb: [
        {
            id: '1',
            author: 'user',
            value: 'Hello geekbrains',
        },
    ],
}
export const chatReducer:Reducer<ChatsState, ChatsActions> = (
    state = initalState,
    action
) => {
    switch(action.type){
        case ADD_CHAT: {
            return {
                ...state,
                [action.chatName]: [],
            }
        }
        case DELETE_CHAT: {
            const chats = {...state};
            delete chats[action.chatId];
            return chats;
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                [action.chatId] : [
                    ...state[action.chatId],
                    {
                        id: nanoid(),
                        author: 'user',
                        value: action.message,
                    },
                ],
            };
        }
        default: {
            return state;
        }
    }
};