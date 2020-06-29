import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getQuestions, deleteQuestion, editQuestion} from '../../api/question';

function Questions({eventId, questionerId}) {
  const [questions, setQuestions] = useState('');

  useEffect(() => {
    (async function () {
      if (eventId) {
        try {
          const {data} = await getQuestions({eventId});
          setQuestions(data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [eventId]);

  const handleDeleteQuestion = async (e) => {
    const questionId = e.target.parentElement.id;
    deleteQuestion({eventId, questionerId, questionId});
  };

  const handleEditQuestion = (e) => {
    editQuestion();
  };

  const renderQuestions = () => {
    if (questions) {
      return questions.map(
        ({_id, question, generatedAt, ownerQuestionerId}) => {
          let isQuestionOwner = false;
          if (ownerQuestionerId._id === questionerId) isQuestionOwner = true;
          return (
            <div key={_id} id={_id}>
              <b>{ownerQuestionerId.name}: </b>
              {question} <small>{generatedAt}</small>
              <br />
              {isQuestionOwner && (
                <span onClick={handleEditQuestion}>edit</span>
              )}
              {isQuestionOwner && (
                <span onClick={handleDeleteQuestion}>delete</span>
              )}
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
      {/* todo 2x data fetching */}
      {/* {questions &&
        questions.map(({_id, question, generatedAt, ownerQuestionerId}) => (
          <p key={_id}>
            <b>{ownerQuestionerId.name}: </b>
            {question} <small>{generatedAt}</small>
          </p>
        ))} */}
    </Fragment>
  );
}

export default Questions;
