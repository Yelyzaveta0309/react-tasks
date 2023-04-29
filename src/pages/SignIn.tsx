import React, { FC, useState } from 'react';
import { logIn } from '../services/firebase';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    try{
      await logIn(email, password);
    }catch(err){
      setError((err as Error).message);
    }
   
  };

  return (
    <>
      <h2>Sign In</h2>
      <hr />
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Логин:</label>
        <input
          name="email" id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          name="password" id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button>sign in</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
};