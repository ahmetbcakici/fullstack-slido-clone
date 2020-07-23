import React, {useState, useEffect, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {socket} from '../../config';

import {getActivePoll} from '../../api/poll';

function PollResults({eventId, setIsAnswerEditing}) {
  const participant = useSelector((state) => state.participantReducer);
  const [activePoll, setActivePoll] = useState('');

  /*   const [answer, setAnswer] = useState('');
  const [isAnswerEditing, setIsAnswerEditing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); */
  const [currentAnswer, setCurrentAnswer] = useState(undefined);
  const {question, answers, type, options} = activePoll;

  useEffect(() => {
    if (eventId && participant) {
      handleGetActivePoll();

      socket.on('get-active-poll', () => {
        console.log('socket on participant pollresults.js');
        handleGetActivePoll();
      });
    }
  }, [eventId, participant]);

  const handleGetActivePoll = async () => {
    try {
      const {data} = await getActivePoll({eventId});

      const currentAnswer = data.answers.find(
        (answer) => answer.ownerParticipantId === participant._id
      );
      setActivePoll(data);

      if (currentAnswer) {
        setCurrentAnswer(currentAnswer);
        return;
      }
      setCurrentAnswer(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const renderResults = () => {
    switch (type) {
      case 'Multiple Choice': {
        return (
          <Fragment>
            {options &&
              options.map(({_id, option, participantsSelected}) => {
                const checkedControl = participantsSelected.includes(
                  participant._id.toString()
                );
                return (
                  <Fragment>
                    <p key={_id} style={{color: checkedControl && 'blue'}}>
                      {option} {participantsSelected.length}
                    </p>
                  </Fragment>
                );
              })}
            <button onClick={() => setIsAnswerEditing(true)}>
              edit response
            </button>
          </Fragment>
        );
      }
      case 'Rating': {
        let total = 0;
        let count = answers.length;
        answers.map(({answer}) => (total += parseInt(answer)));
        return (
          <Fragment>
            <p>Score: {total / count}</p>
          </Fragment>
        );
      }
      case 'Open Text':
      case 'Word Cloud': {
        return (
          <Fragment>
            {answers &&
            currentAnswer /* todo bad practice */ &&
              answers.map(({_id, answer}) => {
                if (currentAnswer._id == _id) {
                  return (
                    <li key={_id} style={{color: 'blue'}}>
                      {answer}{' '}
                      <b
                        style={{color: 'black'}}
                        onClick={() => setIsAnswerEditing(true)}
                      >
                        edit
                      </b>
                    </li>
                  );
                }

                return <li>{answer}</li>;
              })}
          </Fragment>
        );
      }
      default:
        console.log('default s-c ');
    }
  };

  return <Fragment>{renderResults()}</Fragment>;
}

export default PollResults;
