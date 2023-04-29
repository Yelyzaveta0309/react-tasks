import { Link, NavLink, Outlet } from 'react-router-dom';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/profile/selectors';
import { logOut } from '../services/firebase';

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
  const [error, setError] = useState('');

  const auth = useSelector(selectAuth);

  const handleSignOut = async () => {
    setError('');
    try{
      await logOut();
    }catch(err){
      setError((err as Error).message);
    }
  };

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
        <button onClick={handleSignOut}>logout</button>
      ) : (
        <>
          <Link to="/signin">SingIn</Link> | <Link to="/signup">SingUp</Link>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <main>
        <Outlet />
      </main>
    </header>
  );
};