import React, {useEffect, useState, Fragment} from 'react';

import {socket} from '../../config';

import {getActivePoll} from '../../api/poll';

function PollAnswers({eventId}) {
  const [activePoll, setActivePoll] = useState('');

  useEffect(() => {
    if (eventId) {
      handleGetActivePoll();
      socket.emit('joinEvent', eventId);

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

  const optionalForm = () => {
    const {options} = activePoll;
    return(
      <Fragment>
        {options &&options.map(({_id,option,participantsSelected}) => (
          <p key={_id}>{option} {participantsSelected.length}</p>
        ))}
      </Fragment>
    )
  };

  const stringForm = () => {
    const {answers} = activePoll;
    return (
      <ul>
        {answers &&
          answers.map(({_id, answer}) => 
            <li key={_id}>{answer}</li>
         )}
      </ul>
    );
  };

  const renderForm = () => {
    const {type} = activePoll;
    switch (type) {
      case 'Multiple Choice':
        return optionalForm();
      case 'Open Text':
      case 'Word Cloud':
        return stringForm();
      default:
        return optionalForm();
    }
  };

  const {question} = activePoll;
  return (
    <Fragment>
      {question}
      {renderForm()}
    </Fragment>
  );
}

export default PollAnswers;
