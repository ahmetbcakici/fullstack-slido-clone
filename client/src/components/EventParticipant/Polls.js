import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from 'react-redux';

import {socket} from '../../config';

import {getActivePoll, sendAnswer, setActiveState} from '../../api/poll';
import PollResults from '../EventParticipant/PollResults';

function Polls({eventId}) {
  const participant = useSelector((state) => state.participantReducer);
  const [activePoll, setActivePoll] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAnswerEditing, setIsAnswerEditing] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(undefined);
  const [hasUserAnswer, setHasUserAnswer] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {question, answers, type, options} = activePoll;

  useEffect(() => {
    if (eventId && participant) {
      handleGetActivePoll();
      /* socket.emit('joinEvent', eventId); */

      socket.on('get-active-poll', () => {
        console.log('socket on - participant polls.js');
        handleGetActivePoll();
      });
    }
  }, [eventId, participant]);

  const onOptionsSelected = (e) => {
    let tempSelectedOptions = [...selectedOptions];
    const existCheck = tempSelectedOptions.find((item) => item == e.target.id);
    if (existCheck) {
      tempSelectedOptions = tempSelectedOptions.filter(
        (item) => item != existCheck
      );
      setSelectedOptions(tempSelectedOptions);
      return;
    }
    tempSelectedOptions.push(e.target.id);
    setSelectedOptions(tempSelectedOptions);
  };

  const handleGetActivePoll = async () => {
    try {
      const {data} = await getActivePoll({eventId});
      console.log('data cekildi');
      const currentAnswer = data.answers.find(
        (answer) => answer.ownerParticipantId === participant._id
      );
      setAnswer('');
      setActivePoll(data);

      if (currentAnswer) {
        setHasUserAnswer(true);
        setCurrentAnswer(currentAnswer);
        return;
      }
      setHasUserAnswer(false);
      setCurrentAnswer(undefined);
    } catch (error) {
      console.log('ola');
      setActivePoll('');
      console.log(error);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    await sendAnswer({
      eventId,
      pollId: activePoll._id,
      type: activePoll.type,
      answer,
      options: selectedOptions,
      ownerParticipantId: participant._id,
    });
    setIsAnswerEditing(false);
    handleGetActivePoll();
  };

  const stringForm = () => (
    <form onSubmit={handleSubmitAnswer}>
      <input
        type="text" /* todo deprecated */
        /* placeholder={currentAnswer && currentAnswer.answer} */ value={answer}
        onChange={({target: {value}}) => setAnswer(value)}
      />
      <input type="submit" value="SEND" />
    </form>
  );

  const multipleChoiceForm = () => (
    <form onSubmit={handleSubmitAnswer}>
      {options &&
        options.map(({_id, option, participantsSelected}) => {
          const checkedControl = participantsSelected.includes(
            participant._id.toString()
          );
          if (checkedControl) setHasUserAnswer(true);
          return (
            <Fragment key={_id}>
              <input
                type="checkbox"
                id={_id}
                key={_id}
                onClick={onOptionsSelected}
              />
              <label style={{color: checkedControl && 'blue'}} htmlFor={_id}>
                {option}
              </label>
              <br />
            </Fragment>
          );
        })}
      <input type="submit" value="SUBMIT" />
    </form>
  );

  const renderForm = () => {
    switch (type) {
      case 'Multiple Choice':
        return multipleChoiceForm();
      case 'Open Text':
      case 'Word Cloud':
        return stringForm();
      default:
        return <p>boş</p>;
    }
  };

  if (!activePoll) return <p>There is no active poll!</p>;

  if (isAnswerEditing || !hasUserAnswer) {
    console.log('yWWWWW');
    return renderForm();
  }
  console.log('xQQQQqqqq');
  return (
    <PollResults
      eventId={eventId}
      setIsAnswerEditing={setIsAnswerEditing}
      setHasUserAnswer={setHasUserAnswer}
    />
  );

  return (
    <Fragment>
      {question}

      {isAnswerEditing ? (
        renderForm()
      ) : (
        <PollResults
          eventId={eventId}
          setIsAnswerEditing={setIsAnswerEditing}
          setHasUserAnswer={setHasUserAnswer}
        />
      )}
    </Fragment>
  );
}

export default Polls;
