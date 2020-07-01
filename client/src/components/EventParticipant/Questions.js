import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';

import {
  getQuestions,
  deleteQuestion,
  editQuestion,
  likeQuestion,
} from '../../api/question';

const socket = io('http://localhost:2244');

function Questions({eventId}) {
  const [questionEdit, setQuestionEdit] = useState('');
  const [questions, setQuestions] = useState('');
  const [questionEditing, setQuestionEditing] = useState(false);
  const questioner = useSelector((state) => state.questionerReducer);

  useEffect(() => {
    if (eventId) {
      handleGetQuestions();

      socket.on('set-questions', async () => {
        console.log('socket on');
        handleGetQuestions();
      });
    }
  }, [eventId]);

  const handleGetQuestions = async () => {
    try {
      const {data} = await getQuestions({eventId});
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteQuestion = async (e) => {
    const questionId = e.target.parentElement.id;
    deleteQuestion({eventId, questionerId: questioner._id, questionId});
  };

  const handleEditQuestion = (e) => {
    const questionId = e.target.parentElement.parentElement.id;
    editQuestion({questionId, question: questionEdit});
    setQuestionEditing(false);
  };

  const handleLikeQuestion = (e) => {
    const questionId = e.target.parentElement.id;
    likeQuestion({questionId, questionerId: questioner._id});
  };

  const renderQuestions = () => {
    if (questions) {
      return questions.map(
        ({
          _id,
          question,
          generatedAt,
          isAnon,
          ownerQuestionerId,
          likeCount,
        }) => {
          let isQuestionOwner = false;
          if (ownerQuestionerId._id === questioner._id) isQuestionOwner = true;
          return (
            <div key={_id} id={_id}>
              <b>{isAnon ? 'Anon' : ownerQuestionerId.name}: </b>
              {question} <small>{generatedAt}</small>
              <br />
              {isQuestionOwner && (
                <span
                  style={{color: 'red'}}
                  onClick={() => setQuestionEditing(true)}
                >
                  edit
                </span>
              )}
              |{' '}
              {isQuestionOwner && (
                <span style={{color: 'blue'}} onClick={handleDeleteQuestion}>
                  delete
                </span>
              )}
              |{' '}
              <span style={{color: 'green'}} onClick={handleLikeQuestion}>
                like {likeCount}
              </span>
              <div id="bomba" style={{display: !questionEditing && 'none'}}>
                <input
                  type="text"
                  value={questionEdit}
                  onChange={({target: {value}}) => setQuestionEdit(value)}
                />
                <button onClick={handleEditQuestion}>OK</button>
              </div>
            </div>
          );
        }
      );
    }
  };

  return (
    <Fragment>
      <p>popular</p>
      <p>recent</p>
      {renderQuestions()}
    </Fragment>
  );
}

export default Questions;
