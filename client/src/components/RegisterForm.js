import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {register} from '../store/actions/user';

function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const registerFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !surname ||  !email || !password) return; // null fields validation

    dispatch(register({name, surname, email, password}));
  };

  return (
    <div>
      <form onSubmit={registerFormSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={({target: {value}}) => setName(value)}
        />
        <br />
        <input
          type="text"
          placeholder="surname"
          value={surname}
          onChange={({target: {value}}) => setSurname(value)}
        />
        <br />
        <input
          type="text"
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
        <input type="submit" value="REGISTER" />
      </form>
    </div>
  );
}

export default RegisterForm;
