import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from 'react-redux';

import {socket} from '../../config';

import {getActivePoll, sendAnswer} from '../../api/poll';

function Polls({eventId}) {
  const participant = useSelector((state) => state.participantReducer);
  const [activePoll, setActivePoll] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAnswerEditing, setIsAnswerEditing] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(undefined);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {question, answers, type, options} = activePoll;

  useEffect(() => {
    if (eventId && participant) {
      handleGetActivePoll();
      socket.emit('joinEvent', eventId);

      socket.on('get-active-poll', () => {
        console.log('socket on');
        handleGetActivePoll();
      });
    }
  }, [eventId, participant]);

  const onOptionsSelected = (e) => {
    let tempSelectedOptions = [...selectedOptions];
    const existCheck = tempSelectedOptions.find((item) => item == e.target.id);
    if (existCheck) {
      tempSelectedOptions = tempSelectedOptions.filter(item => item != existCheck);
      setSelectedOptions(tempSelectedOptions);
      return;
    }
    tempSelectedOptions.push(e.target.id);
    setSelectedOptions(tempSelectedOptions);
  };

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

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    await sendAnswer({
      eventId,
      pollId: activePoll._id,
      type: activePoll.type,
      answer,
      options:selectedOptions,
      ownerParticipantId: participant._id,
    });
    setIsAnswerEditing(false);
    handleGetActivePoll();
  };

  const stringForm = () => (
    <form onSubmit={handleSubmitAnswer}>
      <input
        type="text"
        placeholder={currentAnswer && currentAnswer.answer}
        value={answer}
        onChange={({target: {value}}) => setAnswer(value)}
      />
      <input type="submit" value="SEND" />
    </form>
  );

  const multipleChoiceForm = () => (
    <form onSubmit={handleSubmitAnswer}>
      {options &&
        options.map(({_id, option}) => (
          <Fragment key={_id}>
            <input
              type="checkbox"
              id={_id}
              key={_id}
              onClick={onOptionsSelected}
            />
            <label htmlFor={_id}>{option}</label>
            <br />
          </Fragment>
        ))}
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

  return (
    <Fragment>
      {question}

      {currentAnswer && !isAnswerEditing ? (
        <ul>
          {answers &&
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
        </ul>
      ) : (
        renderForm()
      )}
    </Fragment>
  );
}

export default Polls;
