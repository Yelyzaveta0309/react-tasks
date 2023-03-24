import { StoreState } from '..';
import { nanoid } from 'nanoid';


export const selectChats = (state: StoreState) => state.chats;
export const selectChatList = (state: StoreState) => 
    Object.entries(state.chats).map((chat) => ({
        id: nanoid(),
        name: chat[0],
    }));
