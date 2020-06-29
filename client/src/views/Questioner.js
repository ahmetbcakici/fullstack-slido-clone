import React, {Fragment, useState, useEffect} from 'react';

import {getQuestioner} from '../api/questioner';

function Questioner() {
  useEffect(() => {
    getQuestioner({questionerId:1}).then((res) => console.log(res.data));
  }, []);

  return (
    <Fragment>
      <h1>slido</h1>
      <input type="text" placeholder="# enter event code here" />
      <button>GO</button>
      <p>last events:</p>
      <ul>
        <li>lorem</li>
        <li>ipsum</li>
      </ul>
    </Fragment>
  );
}

export default Questioner;
