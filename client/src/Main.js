import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Welcome from './views/Welcome';
import EventParticipant from './views/EventParticipant';
import EventAdmin from './views/EventAdmin';
import Account from './views/Account';
import Admin from './views/Admin';
import Page404 from './views/404';
import Participant from './views/Participant';

import {auth} from './store/actions/user';
import {generateParticipant, getParticipant} from './store/actions/participant';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const participant = useSelector((state) => state.participantReducer);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    dispatch(auth(jwt));
  }, [auth, dispatch]);

  useEffect(() => {
    const participantId = localStorage.getItem('participantId');

    (async function () {
      if (!participantId) {
        const {_id} = await dispatch(generateParticipant());
        localStorage.setItem('participantId', _id);
        return;
      }

      dispatch(getParticipant({participantId}));
    })();
  }, [generateParticipant, dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/account" component={user ? Admin : Account} exact />
        <Route path="/participant" component={Participant} exact />
        <Route path="/event/:code" component={EventParticipant} exact />
        <Route path="/event-admin/:code" component={EventAdmin} exact />
        <Route path="/*" component={Page404} exact />
      </Switch>
    </Router>
  );
}

export default App;
