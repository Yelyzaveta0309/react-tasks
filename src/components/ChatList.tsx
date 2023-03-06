import React, { FC, useState } from 'react';
import { List, ListItem } from '@mui/material';
import { nanoid } from 'nanoid';

export interface Chat {
    id: string;
    name: string;
}


export const ChatList = () => {
    return (
        <>
        <List>
            <ListItem>Chat1</ListItem>
            <ListItem>Chat2</ListItem>
            <ListItem>Chat3</ListItem>
            <ListItem>Chat4</ListItem>
            <ListItem>Chat5</ListItem>
        </List>
        </> 
      );
}