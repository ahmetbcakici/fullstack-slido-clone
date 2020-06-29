import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getQuestions, deleteQuestion, editQuestion} from '../../api/question';

function Questions({eventId, questioner}) {
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
    deleteQuestion({eventId, questionerId: questioner._id, questionId});
  };

  const handleEditQuestion = (e) => {
    const questionId = e.target.parentElement.id;
    editQuestion({questionId, question: 'new question'}); //todo question gonna be dynamic
  };

  const renderQuestions = () => {
    if (questions) {
      return questions.map(
        ({_id, question, generatedAt,isAnon, ownerQuestionerId}) => {
          let isQuestionOwner = false;
          if (ownerQuestionerId._id === questioner._id) isQuestionOwner = true;
          return (
            <div key={_id} id={_id}>
              <b>{isAnon ? 'Anon' : ownerQuestionerId.name}: </b>
              {question} <small>{generatedAt}</small>
              <br />
              {isQuestionOwner && (
                <span onClick={handleEditQuestion}>edit</span>
              )}
              |{' '}
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
