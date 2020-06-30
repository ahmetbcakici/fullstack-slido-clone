import React, {Fragment, useState} from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Account() {
  const [isLoginForm, setIsLoginForm] = useState(false);
  
  const returnForm = () => {
    if (isLoginForm) return <LoginForm />;

    return <RegisterForm />;
  };

  return <Fragment>{returnForm()}</Fragment>;
}

export default Account;
