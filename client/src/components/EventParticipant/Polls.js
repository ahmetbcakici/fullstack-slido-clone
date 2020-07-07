import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from 'react-redux';

import {socket} from '../../config';

import {getActivePoll, sendAnswer} from '../../api/poll';

function Polls({eventId}) {
  const questioner = useSelector((state) => state.questionerReducer);
  const [activePoll, setActivePoll] = useState('');
  const [answer, setAnswer] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState(undefined);

  useEffect(() => {
    if (eventId && questioner) {
      handleGetActivePoll();
      socket.emit('joinEvent', eventId);

      socket.on('get-active-poll', () => {
        console.log('socket on');
        handleGetActivePoll();
      });
    }
  }, [eventId,questioner]);

  const handleGetActivePoll = async () => {
    try {
      const {data} = await getActivePoll({eventId});

      const currentAnswer = data.answer.find(
        (answer) => answer.ownerQuestionerId === questioner._id
      );
      if (currentAnswer) setCurrentAnswer(currentAnswer);

      setActivePoll(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    await sendAnswer({
      pollId: activePoll._id,
      answer,
      ownerQuestionerId: questioner._id,
    });
    handleGetActivePoll();
  };

  const stringForm = () => (
    <form onSubmit={handleSubmitAnswer}>
      <input
        type="text"
        value={answer}
        onChange={({target: {value}}) => setAnswer(value)}
      />
      <input type="submit" value="SEND" />
    </form>
  );

  const optionalForm = () => <input type="text" />;

  const renderForm = () => {
    switch (activePoll.type) {
      case 'Multiple Choice':
        return optionalForm();
      case 'Open Text':
      case 'Word Cloud':
        return stringForm();
      default:
        return optionalForm();
    }
  };

  /* 
  const handleDeleteQuestion = async (e) => {
    const questionId = e.target.parentElement.id;
    deleteQuestion({eventId, questionerId: questioner._id, questionId});
  };

  const handleEditQuestion = (e) => {
    const questionId = e.target.parentElement.parentElement.id;
    editQuestion({eventId, questionId, question: questionEdit});
    setQuestionEditing(false);
  };

  const handleLikeQuestion = (e) => {
    const questionId = e.target.parentElement.id;
    likeQuestion({eventId, questionId, questionerId: questioner._id});
  }; */

  const {question} = activePoll;
  return (
    <Fragment>
      {question}
      {renderForm()}
      {currentAnswer && (<p>{currentAnswer.answer}</p>)}
    </Fragment>
  );
}

export default Polls;
