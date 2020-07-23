import React, {useEffect, useState, Fragment} from 'react';

import {socket} from '../../config';

import {getActivePoll} from '../../api/poll';

function PollResults({eventId}) {
  const [activePoll, setActivePoll] = useState('');
  const {answers, options, type, question} = activePoll;

  useEffect(() => {
    if (eventId) {
      handleGetActivePoll();

      socket.on('get-active-poll', () => {
        console.log('socket on');
        handleGetActivePoll();
      });
    }
  }, [eventId]);

  const handleGetActivePoll = async () => {
    try {
      const {data} = await getActivePoll({eventId});
      console.log(data);
      setActivePoll(data);
    } catch (error) {
      console.log(error);
    }
  };

  const multipleChoiceForm = () => {
    return (
      <Fragment>
        {options &&
          options.map(({_id, option, participantsSelected}) => (
            <p key={_id}>
              {option} {participantsSelected.length}
            </p>
          ))}
      </Fragment>
    );
  };

  const ratingForm = () => {
    let total = 0;
    let count = answers.length;
    answers.map(({answer}) => (total += parseInt(answer)));
    return (
      <Fragment>
        <p>Score: {total / count}</p>
      </Fragment>
    );
  };

  const stringForm = () => {
    return (
      <ul>
        {answers && answers.map(({_id, answer}) => <li key={_id}>{answer}</li>)}
      </ul>
    );
  };

  const renderForm = () => {
    switch (type) {
      case 'Multiple Choice':
        return multipleChoiceForm();
      case 'Rating':
        return ratingForm();
      case 'Open Text':
      case 'Word Cloud':
        return stringForm();
      default:
        console.log('eventadmin > pollresults.js > s-c default');
    }
  };

  return (
    <Fragment>
      {question}
      {renderForm()}
    </Fragment>
  );
}

export default PollResults;
