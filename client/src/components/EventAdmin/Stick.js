import React, {useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import NewPoll from './NewPoll';
import PollList from './PollList';

import {setLockState, setHideResultState} from '../../api/poll';
import {setQAState} from '../../api/event';

function Stick({eventId, eventCode, handleSetIsQuestionsSelected}) {
  const handleSetLockState = async (e) => {
    try {
      await setLockState({eventId});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetHideResultState = async (e) => {
    try {
      await setHideResultState({eventId});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetQAState = async (e) => {
    try {
      await setQAState({eventId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NewPoll eventId={eventId} />
      <PollList eventId={eventId} />

      <button onClick={handleSetLockState}>lock voting</button>
      <button onClick={handleSetHideResultState}>hide results</button>
      <br />
      <button onClick={handleSetIsQuestionsSelected}>
        show Q&A (or polls)
      </button>

      <p>
        <b>settings</b>
      </p>
      <ul>
        <li>
          <CopyToClipboard text={`http://localhost:3000/event/${eventCode}`}>
            <a href="#">
              <span>copy event link</span>
            </a>
          </CopyToClipboard>
        </li>
        <li onClick={handleSetQAState}>disable participant Q&A</li>
      </ul>
    </div>
  );
}

export default Stick;
