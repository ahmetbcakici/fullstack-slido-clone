import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Welcome from './views/Welcome';
import EventParticipant from './views/EventParticipant';
import EventAdmin from './views/EventAdmin';
import Account from './views/Account';
import Admin from './views/Admin';

import auth from './store/actions/user/auth';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log('object')
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    dispatch(auth(jwt));
  }, [auth,dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/account" component={user ? Admin : Account} exact />
        <Route path="/event/:code" component={EventParticipant} exact />
        <Route path="/event-admin/:code" component={EventAdmin} exact />
      </Switch>
    </Router>
  );
}

export default App;
