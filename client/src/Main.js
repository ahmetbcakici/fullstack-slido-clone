import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Welcome from './views/Welcome';
import EventParticipant from './views/EventParticipant';
import EventAdmin from './views/EventAdmin';
import Account from './views/Account';
import Admin from './views/Admin';
import Page404 from './views/404';
import Questioner from './views/Questioner';

import {auth} from './store/actions/user';
import {generateQuestioner, getQuestioner} from './store/actions/questioner';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const questioner = useSelector((state) => state.questionerReducer);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    dispatch(auth(jwt));
  }, [auth, dispatch]);

  useEffect(() => {
    const questionerId = localStorage.getItem('questionerId');

    (async function () {
      if (!questionerId) {
        const {_id} = await dispatch(generateQuestioner());
        localStorage.setItem('questionerId', _id);
        return;
      }

      dispatch(getQuestioner({questionerId}));
    })();
  }, [generateQuestioner, dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/account" component={user ? Admin : Account} exact />
        <Route path="/questioner" component={Questioner} exact />
        <Route path="/event/:code" component={EventParticipant} exact />
        <Route path="/event-admin/:code" component={EventAdmin} exact />
        <Route path="/*" component={Page404} exact />
      </Switch>
    </Router>
  );
}

export default App;
