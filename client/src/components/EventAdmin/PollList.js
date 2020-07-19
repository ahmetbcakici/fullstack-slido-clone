import React, {useState, useEffect, Fragment} from 'react';
import {
  getPollsByEvent,
  setActiveState,
  deletePoll,
  resetPollResults,
  duplicatePoll,
} from '../../api/poll';

import {socket} from '../../config';

function PollList({eventId}) {
  const [polls, setPolls] = useState('');

  useEffect(() => {
    if (eventId) {
      handleGetPolls();

      socket.on('get-active-poll', () => {
        console.log('socket on');
        handleGetPolls();
      });
    }
  }, [eventId]);

  const handleGetPolls = async () => {
    try {
      const {data} = await getPollsByEvent({eventId});
      console.log('data.data');
      console.log(data);
      setPolls(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetActiveState = async (e) => {
    try {
      const pollId = e.target.parentElement.id;
      const {data} = await setActiveState({eventId, pollId});
      setPolls(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePoll = async (e) => {
    try {
      const pollId = e.target.parentElement.id;
      await deletePoll({eventId, pollId});
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetResults = async (e) => {
    try {
      const pollId = e.target.parentElement.id;
      await resetPollResults({eventId, pollId});
    } catch (error) {
      console.log(error);
    }
  };

  const handleDuplicatePoll = async (e) => {
    try {
      const pollId = e.target.parentElement.id;
      await duplicatePoll({eventId, pollId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <p>
        <b>poll list</b>
      </p>
      <ul>
        {polls &&
          polls.map((poll) => {
            const {_id, question, isActive} = poll;
            return (
              <li key={_id} id={_id}>
                <span style={{color: 'gray'}} onClick={handleSetActiveState}>
                  {isActive ? 'stop' : 'play'}
                </span>{' '}
                <span>{question}</span>{' '}
                <span style={{color: 'blue'}}>edit</span>{' '}
                <span style={{color: 'green'}} onClick={handleDuplicatePoll}>
                  duplicate
                </span>{' '}
                <span style={{color: 'gold'}} onClick={handleResetResults}>
                  reset results
                </span>{' '}
                <span style={{color: 'tomato'}} onClick={handleDeletePoll}>
                  delete
                </span>
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
}

export default PollList;
