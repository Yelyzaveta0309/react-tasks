import { Link, NavLink, Outlet } from 'react-router-dom';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeAuth } from '../store/profile/slice';
import { selectAuth } from '../store/profile/selectors';

const navigate = [
  {
    id: 1,
    name: 'Home',
    to: '/',
  },
  {
    id: 2,
    name: 'Profile',
    to: '/profile',
  },
  {
    id: 3,
    name: 'Chats',
    to: '/chats',
  },
  {
    id: 4,
    name: 'About',
    to: '/about',
  },
  {
    id: 5,
    name: 'Articles',
    to: '/articles',
  },
];

export const Header: FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  return (
    <header>
      <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
        {navigate.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.to}
              style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {auth ? (
        <button onClick={() => dispatch(changeAuth(false))}>logout</button>
      ) : (
        <Link to="/signin">SingIn</Link>
      )}

      <main>
        <Outlet />
      </main>
    </header>
  );
};