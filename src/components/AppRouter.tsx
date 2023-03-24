import React, {FC, Suspense} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AboutWithConnect } from '../pages/About';
// import { Chats } from '../pages/Chats/Chats';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { ChatList } from './ChatList';
import { Header } from './Header';


const Chats = React.lazy(()=>
  import('../pages/Chats/Chats').then((module)=>({
  default: module.Chats,
}))
);

export const AppRouter: FC = () => (
    <Suspense fallback={<div>loading...</div>}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />

            <Route path="chats">
              <Route index element={<ChatList />}/>
              <Route path=":chatId" element={<Chats />}/>
            </Route>
          </Route>
          <Route path="about" element={<AboutWithConnect />} />

          <Route path="*" element={<h2>404</h2>} />
        </Routes>
    </BrowserRouter>
  </Suspense>
)