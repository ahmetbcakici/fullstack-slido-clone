import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  getQuestions,
  deleteQuestion,
  editQuestion,
  likeQuestion,
} from '../../api/question';

function Questions({eventId}) {
  const [questions, setQuestions] = useState('');
  const questioner = useSelector((state) => state.questionerReducer);

  useEffect(() => {
    if (eventId) handleGetQuestions();
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
    const questionId = e.target.parentElement.id;
    editQuestion({questionId, question: 'new question'}); //todo question gonna be dynamic
  };

  const handleLikeQuestion = (e) => {
    const questionId = e.target.parentElement.id;
    likeQuestion({questionId,questionerId:questioner._id});
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
                <span style={{color: 'red'}} onClick={handleEditQuestion}>
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
