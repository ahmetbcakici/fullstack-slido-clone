import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {login} from '../store/actions/user';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loginFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return; // null fields validation

    try {
      await dispatch(login({email, password}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={loginFormSubmit}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={({target: {value}}) => setEmail(value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={({target: {value}}) => setPassword(value)}
      />
      <br />
      <input type="submit" value="LOGIN" />
    </form>
  );
}

export default LoginForm;
