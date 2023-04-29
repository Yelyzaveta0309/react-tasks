import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { FC, Suspense, useEffect } from 'react';

import { AboutWithConnect } from '../pages/About';
import { Articles } from '../pages/Articles';
import { Chats } from '../pages/Chats/Chats';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

import { ChatList } from './ChatList';
import { Header } from './Header';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { auth } from '../services/firebase';
import { useDispatch } from 'react-redux';
import { changeAuth } from '../store/profile/slice';
import { ChatState, initialMessagesFB } from '../store/chats/slice';
import { ThunkDispatch } from 'redux-thunk';

const Profile = React.lazy(() =>
  Promise.all([
    import('../pages/Profile').then(({ Profile }) => ({
      default: Profile,
    })),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports)
);

export const AppRouter: FC = () => {

  const dispatch = useDispatch<ThunkDispatch<ChatState, void, any>>();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user', user);
      if(user){
        dispatch(changeAuth(true));
      } else{
        dispatch(changeAuth(false));
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(initialMessagesFB());
  }, []);

  return(<Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route
            path="profile"
            element={<PrivateRoute component={<Profile />} />}
          />

          <Route path="chats" element={<PrivateRoute />}>
            <Route index element={<ChatList />} />
            <Route path=":chatId" element={<Chats/>} />
          </Route>

          <Route path="about" element={<AboutWithConnect />} />
          <Route path="articles" element={<Articles />} />

          <Route
            path="signin"
            element={<PublicRoute component={<SignIn />} />}
          />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </BrowserRouter>
  </Suspense>
)};