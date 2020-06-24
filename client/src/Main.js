import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Welcome from './views/Welcome';
import EventParticipant from './views/EventParticipant';
import EventAdmin from './views/EventAdmin';

/* import auth from './store/actions/user/auth'; */

function App() {
  /* const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    const isThereToken = localStorage.getItem('login_auth');
    if (isThereToken) {
      dispatch(auth());
    }
  }, [auth]);

  useEffect(() => {
    if (!Array.isArray(user)) setIsUserLoggedIn(true);
  }, [user]); */

  return (
    <Router>
      <Switch>
        {/* <Route path="/" component={isUserLoggedIn ? Home : Welcome} exact /> */}
        <Route path="/" component={Welcome} exact />
        <Route path="/event/*" component={EventParticipant} exact />
        <Route path="/event-admin/*" component={EventAdmin} exact />
      </Switch>
    </Router>
  );
}

export default App;
