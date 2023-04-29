import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";

import {getDatabase, ref} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBaGyOi2iKANasXQXLCGNwiA9ZQduk56eE",
  authDomain: "react-lesson-6703f.firebaseapp.com",
  projectId: "react-lesson-6703f",
  storageBucket: "react-lesson-6703f.appspot.com",
  messagingSenderId: "1089496178670",
  appId: "1:1089496178670:web:918b3d04b39fba05a1b8ff"
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export const signUp = async(email: string, password: string) => 
    await createUserWithEmailAndPassword(auth, email, password);

export const logIn = async(email: string, password: string) => 
    await signInWithEmailAndPassword(auth, email, password);

export const logOut = async ()  => await signOut(auth);

const db = getDatabase(firebase);

export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');

export const getChatsById = (chatId: string) => ref(db, `chats/${chatId}`);
export const getMessageListById = (chatId: string) => 
    ref(db, `chats/${chatId}/messageList/`);
