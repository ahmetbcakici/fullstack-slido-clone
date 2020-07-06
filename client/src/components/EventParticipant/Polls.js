import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from 'react-redux';

import {socket} from '../../config';

import {getActivePoll} from '../../api/poll';

function Polls({eventId}) {
  const questioner = useSelector((state) => state.questionerReducer);
  const [activePoll, setActivePoll] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (eventId) {
      handleGetActivePoll();
      socket.emit('joinEvent', eventId);
        console.log('qola')
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

  const stringForm = () => (
    <input
      type="text"
      value={answer}
      onChange={({target: {value}}) => setAnswer(value)}
    />
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
    </Fragment>
  );
}

export default Polls;
